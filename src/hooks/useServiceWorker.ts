import { useState, useEffect, useCallback } from 'react';

export interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  hasUpdate: boolean;
  updateSW: () => void;
}

export function useServiceWorker(): ServiceWorkerState {
  const [isSupported] = useState(() => 'serviceWorker' in navigator);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (!isSupported) return;

    let registration: ServiceWorkerRegistration | null = null;

    const registerSW = async () => {
      try {
        registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        setIsRegistered(true);

        // Check if there's already a waiting worker (e.g. page refresh)
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setHasUpdate(true);
        }

        // Listen for new SW installing
        registration.addEventListener('updatefound', () => {
          const newWorker = registration!.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // New SW installed, old one still active → update available
              setWaitingWorker(newWorker);
              setHasUpdate(true);
            }
          });
        });

        // When SW controller changes (after skipWaiting), reload the page
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });

        // Periodically check for updates (every 60 minutes)
        const interval = setInterval(() => {
          registration!.update().catch(() => {});
        }, 60 * 60 * 1000);

        return () => clearInterval(interval);
      } catch (err) {
        console.warn('[SW] Registration failed:', err);
      }
    };

    // Defer registration until after page load for better performance
    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW, { once: true });
    }

    return () => {
      registration?.removeEventListener('updatefound', () => {});
    };
  }, [isSupported]);

  const updateSW = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [waitingWorker]);

  return { isSupported, isRegistered, hasUpdate, updateSW };
}
