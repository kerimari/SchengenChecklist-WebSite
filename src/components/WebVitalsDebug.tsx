import { useState } from 'react';
import {
  WebVitalsState,
  VitalMetric,
  VitalName,
  THRESHOLDS,
  formatValue,
} from '@/hooks/useWebVitals';

interface Props {
  metrics: WebVitalsState;
}

const METRIC_LABELS: Record<VitalName, { label: string; desc: string }> = {
  LCP:  { label: 'LCP',  desc: 'Largest Contentful Paint' },
  CLS:  { label: 'CLS',  desc: 'Cumulative Layout Shift' },
  FID:  { label: 'FID',  desc: 'First Input Delay' },
  INP:  { label: 'INP',  desc: 'Interaction to Next Paint' },
  TTFB: { label: 'TTFB', desc: 'Time to First Byte' },
  FCP:  { label: 'FCP',  desc: 'First Contentful Paint' },
};

const RATING_COLORS: Record<string, string> = {
  good: 'text-emerald-400',
  'needs-improvement': 'text-amber-400',
  poor: 'text-red-400',
};

const RATING_BG: Record<string, string> = {
  good: 'bg-emerald-500',
  'needs-improvement': 'bg-amber-500',
  poor: 'bg-red-500',
};

function MetricBar({ metric, name }: { metric: VitalMetric | null; name: VitalName }) {
  const t = THRESHOLDS[name];
  const { label, desc } = METRIC_LABELS[name];

  const pct = metric
    ? Math.min(100, (metric.value / t.poor) * 100)
    : 0;

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div>
          <span className="text-white text-xs font-semibold">{label}</span>
          <span className="text-gray-400 text-xs ml-1.5">{desc}</span>
        </div>
        {metric ? (
          <span className={`text-xs font-bold ${RATING_COLORS[metric.rating]}`}>
            {formatValue(name, metric.value)}
          </span>
        ) : (
          <span className="text-gray-500 text-xs">waiting…</span>
        )}
      </div>
      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            metric ? RATING_BG[metric.rating] : 'bg-gray-600'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {metric && (
        <div className="flex justify-between mt-0.5">
          <span className="text-gray-600 text-xs">0</span>
          <span className="text-gray-600 text-xs">
            {name === 'CLS' ? t.poor.toFixed(2) : `${t.poor}ms`}
          </span>
        </div>
      )}
    </div>
  );
}

function OverallScore({ metrics }: { metrics: WebVitalsState }) {
  const coreVitals: VitalName[] = ['LCP', 'CLS', 'INP'];
  const ratings = coreVitals
    .map((k) => metrics[k]?.rating)
    .filter(Boolean) as string[];

  if (ratings.length === 0) return null;

  const score =
    ratings.every((r) => r === 'good')
      ? 'good'
      : ratings.some((r) => r === 'poor')
      ? 'poor'
      : 'needs-improvement';

  const labels: Record<string, string> = {
    good: 'Good',
    'needs-improvement': 'Needs Work',
    poor: 'Poor',
  };

  return (
    <div className={`flex items-center gap-1.5 mb-3 px-2 py-1 rounded-md ${
      score === 'good' ? 'bg-emerald-500/20' :
      score === 'needs-improvement' ? 'bg-amber-500/20' : 'bg-red-500/20'
    }`}>
      <div className={`w-2 h-2 rounded-full ${RATING_BG[score]}`} />
      <span className={`text-xs font-semibold ${RATING_COLORS[score]}`}>
        Core Web Vitals: {labels[score]}
      </span>
    </div>
  );
}

export default function WebVitalsDebug({ metrics }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!import.meta.env.DEV) return null;

  const vitals: VitalName[] = ['LCP', 'CLS', 'INP', 'FID', 'TTFB', 'FCP'];

  const readyCount = vitals.filter((k) => metrics[k] !== null).length;

  return (
    <div className="fixed bottom-4 left-4 z-[9998] font-mono">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gray-900/95 border border-gray-700 text-white text-xs px-3 py-2 rounded-lg cursor-pointer whitespace-nowrap hover:bg-gray-800 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Web Vitals
          {readyCount > 0 && (
            <span className="bg-gray-700 text-gray-300 text-xs px-1.5 py-0.5 rounded-full">
              {readyCount}/{vitals.length}
            </span>
          )}
        </button>
      ) : (
        <div className="bg-gray-900/97 border border-gray-700 rounded-xl shadow-2xl w-72 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs font-semibold">Web Vitals Monitor</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized((v) => !v)}
                className="text-gray-400 hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer transition-colors"
              >
                {isMinimized ? (
                  <i className="ri-arrow-up-s-line" />
                ) : (
                  <i className="ri-subtract-line" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-xs px-1.5 py-0.5 rounded cursor-pointer transition-colors"
              >
                <i className="ri-close-line" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="p-3">
              <OverallScore metrics={metrics} />

              {vitals.map((name) => (
                <MetricBar key={name} name={name} metric={metrics[name]} />
              ))}

              {/* Legend */}
              <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-800">
                {(['good', 'needs-improvement', 'poor'] as const).map((r) => (
                  <div key={r} className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${RATING_BG[r]}`} />
                    <span className="text-gray-500 text-xs capitalize">
                      {r === 'needs-improvement' ? 'Needs work' : r}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 text-xs mt-2">
                Only visible in dev mode
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
