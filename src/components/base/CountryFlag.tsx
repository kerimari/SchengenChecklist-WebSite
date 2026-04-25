
interface CountryFlagProps {
  countryId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const countryIdToCode: Record<string, string> = {
  germany: 'DE',
  france: 'FR',
  italy: 'IT',
  spain: 'ES',
  netherlands: 'NL',
  austria: 'AT',
  belgium: 'BE',
  czech: 'CZ',
  denmark: 'DK',
  estonia: 'EE',
  finland: 'FI',
  greece: 'GR',
  hungary: 'HU',
  iceland: 'IS',
  latvia: 'LV',
  liechtenstein: 'LI',
  lithuania: 'LT',
  luxembourg: 'LU',
  portugal: 'PT',
  slovakia: 'SK',
  slovenia: 'SI',
  sweden: 'SE',
  switzerland: 'CH',
  croatia: 'HR',
  bulgaria: 'BG',
  romania: 'RO',
  malta: 'MT',
  norway: 'NO',
  poland: 'PL',
};

const sizeMap = {
  sm: { width: 24, height: 18 },
  md: { width: 32, height: 24 },
  lg: { width: 48, height: 36 },
  xl: { width: 64, height: 48 },
};

function getFlagUrl(code: string, width: number): string {
  // flagsapi.com - very reliable, works on all platforms
  return `https://flagsapi.com/${code}/flat/${width}.png`;
}

function getFallbackUrl(code: string): string {
  // countryflagsapi.com as secondary fallback
  return `https://countryflagsapi.netlify.app/flag/${code.toLowerCase()}.svg`;
}

function getSecondFallbackUrl(code: string): string {
  // flagcdn.com as tertiary fallback
  return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
}

export default function CountryFlag({ countryId, size = 'md', className = '' }: CountryFlagProps) {
  const code = countryIdToCode[countryId];
  const { width, height } = sizeMap[size];

  if (!code) return null;

  const primaryUrl = getFlagUrl(code, 64);
  const fallbackUrl = getSecondFallbackUrl(code);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    const currentSrc = target.src;
    if (currentSrc.includes('flagsapi.com')) {
      target.src = fallbackUrl;
    } else if (currentSrc.includes('flagcdn.com')) {
      // Last resort: hide the image gracefully
      target.style.display = 'none';
    }
  };

  return (
    <img
      src={primaryUrl}
      onError={handleError}
      width={width}
      height={height}
      alt={countryId}
      className={`inline-block object-cover rounded-sm shadow-sm ${className}`}
      style={{ width, height, objectFit: 'cover' }}
      loading="eager"
      crossOrigin="anonymous"
    />
  );
}

export { countryIdToCode };
