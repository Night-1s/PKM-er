import { useState, useEffect, useCallback, useMemo } from 'react';

interface SmartPokemonImgProps {
  urls: string[];
  alt: string;
  className?: string;
  size?: 'small' | 'large';
}

export default function SmartPokemonImg({ urls, alt, className = '', size = 'small' }: SmartPokemonImgProps) {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [error, setError] = useState(false);

  const urlsKey = useMemo(() => JSON.stringify(urls), [urls]);

  useEffect(() => {
    setCurrentUrlIndex(0);
    setError(false);
  }, [urlsKey]);

  const handleError = useCallback(() => {
    if (currentUrlIndex < urls.length - 1) {
      setCurrentUrlIndex(prev => prev + 1);
    } else {
      setError(true);
    }
  }, [currentUrlIndex, urls.length]);

  if (error || urls.length === 0) {
    return (
      <div className={`flex items-center justify-center ${size === 'large' ? 'w-32 h-32' : 'w-10 h-10'} bg-gray-100 rounded-lg ${className}`}>
        <span className={`text-gray-400 ${size === 'large' ? 'text-4xl' : 'text-xs'}`}>?</span>
      </div>
    );
  }

  return (
    <img
      key={`${urlsKey}-${currentUrlIndex}`}
      src={urls[currentUrlIndex]}
      alt={alt}
      className={`${size === 'large' ? 'w-32 h-32' : 'w-10 h-10'} object-contain bg-gray-100 rounded-lg ${className}`}
      onError={handleError}
      loading="lazy"
    />
  );
}
