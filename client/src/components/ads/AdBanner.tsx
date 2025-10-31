import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  className = ''
}) => {
  useEffect(() => {
    // Delay AdSense initialization to avoid conflicts
    const timer = setTimeout(() => {
      try {
        // Initialize AdSense ads
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          window.adsbygoogle.push({});
        }
      } catch (err) {
        // Silently handle ad blocker errors
        console.warn('AdSense blocked or unavailable');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const publisherId = process.env.REACT_APP_ADSENSE_PUBLISHER_ID || 'ca-pub-XXXXXXXXXXXXXXXX';

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

export default AdBanner;
