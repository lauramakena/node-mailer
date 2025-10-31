import React, { useEffect } from 'react';

interface SidebarAdProps {
  slot: string;
  className?: string;
}

const SidebarAd: React.FC<SidebarAdProps> = ({ slot, className = '' }) => {
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
    <div className={`sidebar-ad ${className}`}>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="text-xs text-gray-500 text-center mb-2">Advertisement</div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '250px' }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default SidebarAd;
