
import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import ScrollToTop from "./components/ScrollToTop";
import UpdateBanner from "./components/UpdateBanner";
import WebVitalsDebug from "./components/WebVitalsDebug";
import { AuthProvider } from "./hooks/useAuth";
import { useServiceWorker } from "./hooks/useServiceWorker";
import { useWebVitals } from "./hooks/useWebVitals";
import { useIdleLoader } from "./hooks/useIdleLoader";

// Chatbot is heavy (~200 lines, complex state) and not needed at page load.
// Lazy-import so it's split into its own chunk by Vite.
const Chatbot = lazy(() => import("./components/Chatbot"));

function AppInner() {
  const { hasUpdate, updateSW } = useServiceWorker();
  const vitals = useWebVitals({
    onReport: (metric) => {
      // Extend here: send to Google Analytics, Datadog, custom endpoint, etc.
      // Example: gtag('event', metric.name, { value: metric.value, metric_rating: metric.rating });
      if (import.meta.env.DEV) return; // already logged by hook in dev
      // Production: silent collection — add your analytics call here
    },
  });

  // Mount Chatbot only after the browser becomes idle AND the user
  // has interacted with the page. This keeps TTI and INP low.
  const chatbotReady = useIdleLoader({
    timeout: 4000,          // force-load after 4s even if never idle
    waitForInteraction: true, // additionally wait for first user gesture
  });

  return (
    <>
      <ScrollToTop />
      <AppRoutes />
      {/* Chatbot is deferred — Suspense boundary renders nothing until ready */}
      {chatbotReady && (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      )}
      <UpdateBanner hasUpdate={hasUpdate} onUpdate={updateSW} />
      <WebVitalsDebug metrics={vitals} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
