import { useState, useEffect, useCallback, useRef } from 'react';

export type MetricRating = 'good' | 'needs-improvement' | 'poor';

export interface VitalMetric {
  name: string;
  value: number;
  rating: MetricRating;
  delta: number;
  id: string;
  navigationType: string;
}

export interface WebVitalsState {
  LCP: VitalMetric | null;
  CLS: VitalMetric | null;
  FID: VitalMetric | null;
  INP: VitalMetric | null;
  TTFB: VitalMetric | null;
  FCP: VitalMetric | null;
  isSupported: boolean;
}

export type VitalName = keyof Omit<WebVitalsState, 'isSupported'>;

// Thresholds per Google's Core Web Vitals spec
export const THRESHOLDS: Record<VitalName, { good: number; poor: number; unit: string }> = {
  LCP:  { good: 2500,  poor: 4000,  unit: 'ms' },
  CLS:  { good: 0.1,   poor: 0.25,  unit: '' },
  FID:  { good: 100,   poor: 300,   unit: 'ms' },
  INP:  { good: 200,   poor: 500,   unit: 'ms' },
  TTFB: { good: 800,   poor: 1800,  unit: 'ms' },
  FCP:  { good: 1800,  poor: 3000,  unit: 'ms' },
};

function getRating(name: VitalName, value: number): MetricRating {
  const t = THRESHOLDS[name];
  if (value <= t.good) return 'good';
  if (value <= t.poor) return 'needs-improvement';
  return 'poor';
}

export interface UseWebVitalsOptions {
  /** Called every time a metric is reported */
  onReport?: (metric: VitalMetric) => void;
  /** Send metrics to an analytics endpoint */
  analyticsEndpoint?: string;
}

export function useWebVitals(options: UseWebVitalsOptions = {}): WebVitalsState {
  const { onReport, analyticsEndpoint } = options;

  const [metrics, setMetrics] = useState<WebVitalsState>({
    LCP: null,
    CLS: null,
    FID: null,
    INP: null,
    TTFB: null,
    FCP: null,
    isSupported: typeof window !== 'undefined' && 'performance' in window,
  });

  const onReportRef = useRef(onReport);
  onReportRef.current = onReport;

  const handleMetric = useCallback(
    (name: VitalName, raw: { value: number; delta: number; id: string; navigationType?: string }) => {
      const metric: VitalMetric = {
        name,
        value: raw.value,
        rating: getRating(name, raw.value),
        delta: raw.delta,
        id: raw.id,
        navigationType: raw.navigationType ?? 'navigate',
      };

      setMetrics((prev) => ({ ...prev, [name]: metric }));

      // Fire optional callback
      onReportRef.current?.(metric);

      // Send to analytics endpoint if provided
      if (analyticsEndpoint) {
        const body = JSON.stringify(metric);
        if (navigator.sendBeacon) {
          navigator.sendBeacon(analyticsEndpoint, body);
        } else {
          fetch(analyticsEndpoint, {
            method: 'POST',
            body,
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
          }).catch(() => {});
        }
      }

      // Log to console in development
      if (import.meta.env.DEV) {
        const color =
          metric.rating === 'good'
            ? '#22c55e'
            : metric.rating === 'needs-improvement'
            ? '#f59e0b'
            : '#ef4444';
        console.log(
          `%c[Web Vitals] ${name}: ${formatValue(name, raw.value)} (${metric.rating})`,
          `color: ${color}; font-weight: bold;`
        );
      }
    },
    [analyticsEndpoint]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    let cancelled = false;

    // Dynamic import — web-vitals is only loaded after page is interactive
    import('web-vitals').then(({ onLCP, onCLS, onFID, onINP, onTTFB, onFCP }) => {
      if (cancelled) return;

      onLCP((m) => handleMetric('LCP', m));
      onCLS((m) => handleMetric('CLS', m));
      onFID((m) => handleMetric('FID', m));
      onINP((m) => handleMetric('INP', m));
      onTTFB((m) => handleMetric('TTFB', m));
      onFCP((m) => handleMetric('FCP', m));
    }).catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [handleMetric]);

  return metrics;
}

export function formatValue(name: VitalName, value: number): string {
  const t = THRESHOLDS[name];
  if (t.unit === 'ms') return `${Math.round(value)}ms`;
  if (name === 'CLS') return value.toFixed(3);
  return String(value);
}
