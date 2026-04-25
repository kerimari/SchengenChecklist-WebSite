import { useState, useEffect } from 'react';

interface UseIdleLoaderOptions {
  /**
   * Milliseconds to wait before force-loading even if the browser
   * never becomes idle (e.g. on low-end devices with constant activity).
   * Default: 4000ms
   */
  timeout?: number;
  /**
   * If true, also waits for the first user interaction (mousemove,
   * touchstart, keydown, scroll) before loading. Useful for heavy
   * widgets like chat that are only needed after interaction.
   * Default: false
   */
  waitForInteraction?: boolean;
}

/**
 * useIdleLoader — defers component mounting until the browser is idle.
 *
 * Strategy (in order):
 *  1. requestIdleCallback  — fires when the main thread has spare time
 *  2. setTimeout fallback  — fires after `timeout` ms if rIC never fires
 *  3. waitForInteraction   — additionally waits for first user gesture
 *
 * Usage:
 *   const isReady = useIdleLoader({ timeout: 3000, waitForInteraction: true });
 *   return isReady ? <HeavyWidget /> : null;
 *
 * Effect on Core Web Vitals:
 *  - TTI  ↓  (main thread is free during initial load)
 *  - INP  ↓  (less JS competing for the thread during first interactions)
 *  - TBT  ↓  (Total Blocking Time — fewer long tasks at startup)
 */
export function useIdleLoader({
  timeout = 4000,
  waitForInteraction = false,
}: UseIdleLoaderOptions = {}): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    let interacted = false;
    let idleFired = false;

    const load = () => {
      if (waitForInteraction && !interacted) return;
      setIsReady(true);
      cleanup();
    };

    const onIdle = () => {
      idleFired = true;
      load();
    };

    const onInteraction = () => {
      interacted = true;
      if (idleFired) load();
    };

    const cleanup = () => {
      if (idleHandle !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      clearTimeout(timeoutHandle);
      if (waitForInteraction) {
        window.removeEventListener('mousemove', onInteraction);
        window.removeEventListener('touchstart', onInteraction);
        window.removeEventListener('keydown', onInteraction);
        window.removeEventListener('scroll', onInteraction, true);
      }
    };

    // Register interaction listeners if needed
    if (waitForInteraction) {
      window.addEventListener('mousemove', onInteraction, { once: true });
      window.addEventListener('touchstart', onInteraction, { once: true });
      window.addEventListener('keydown', onInteraction, { once: true });
      window.addEventListener('scroll', onInteraction, { once: true, capture: true });
    }

    // Use requestIdleCallback if available (Chrome, Edge, Firefox)
    if ('requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(onIdle, { timeout });
    } else {
      // Safari fallback: use setTimeout
      timeoutHandle = setTimeout(onIdle, timeout);
    }

    return cleanup;
  }, [timeout, waitForInteraction]);

  return isReady;
}
