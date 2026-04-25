import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  /**
   * CSS aspect-ratio value, e.g. "16/9", "4/3", "1/1".
   * When provided, the wrapper reserves the exact space before the image
   * loads — this is the primary CLS prevention mechanism.
   */
  aspectRatio?: string;
  /** 'lazy' (default) or 'eager' for above-the-fold / LCP images */
  loading?: 'lazy' | 'eager';
  /**
   * fetchpriority hint for the browser's preload scanner.
   * Use 'high' for LCP images (hero, above-the-fold).
   */
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Aspect ratio placeholder color, defaults to a neutral gray */
  placeholderColor?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

/**
 * LazyImage — drop-in <img> replacement with:
 *  - native loading="lazy" (or "eager" for LCP images)
 *  - aspectRatio prop that reserves layout space → prevents CLS
 *  - animated skeleton placeholder while loading
 *  - smooth fade-in on load
 *  - graceful error fallback
 *  - fetchpriority support for LCP images
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  style,
  width,
  height,
  aspectRatio,
  loading = 'lazy',
  fetchPriority = 'auto',
  placeholderColor = '#e5e7eb',
  objectFit = 'cover',
  objectPosition = 'center',
  onError,
  crossOrigin,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If image is already cached, it fires load before React attaches the handler
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  const handleLoad = () => setLoaded(true);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setError(true);
    onError?.(e);
  };

  // Build wrapper styles — aspect-ratio is the key CLS fix:
  // the browser allocates the exact space before the image bytes arrive.
  const wrapperStyle: React.CSSProperties = {
    // aspect-ratio reserves intrinsic space → zero layout shift
    ...(aspectRatio ? { aspectRatio } : {}),
    width: width ?? '100%',
    // Only set explicit height when no aspectRatio is given
    ...(!aspectRatio && height ? { height } : {}),
    backgroundColor: error ? '#f3f4f6' : placeholderColor,
    ...style,
  };

  return (
    <span
      className="relative block overflow-hidden"
      style={wrapperStyle}
    >
      {/* Skeleton shimmer — visible until image loads */}
      {!loaded && !error && (
        <span
          aria-hidden="true"
          className="absolute inset-0 block"
          style={{
            background: `linear-gradient(90deg, ${placeholderColor} 25%, #f9fafb 50%, ${placeholderColor} 75%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite linear',
          }}
        />
      )}

      {/* Error fallback */}
      {error && (
        <span className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <i className="ri-image-line text-2xl text-gray-300" />
        </span>
      )}

      {/* Actual image */}
      {!error && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          // Explicit width/height attributes help the browser compute
          // intrinsic aspect ratio even before CSS is parsed → CLS fix
          width={width as number | undefined}
          height={height as number | undefined}
          // fetchpriority is a valid HTML attribute but not yet in React types
          {...({ fetchpriority: fetchPriority } as Record<string, string>)}
          crossOrigin={crossOrigin}
          onLoad={handleLoad}
          onError={handleError}
          className={className}
          style={{
            objectFit,
            objectPosition,
            width: '100%',
            height: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
            display: 'block',
          }}
        />
      )}

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </span>
  );
}
