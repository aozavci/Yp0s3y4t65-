import { useEffect } from 'react';
import { getAdUnitId } from '../config/adMobConfig';

const BannerAd = () => {
  useEffect(() => {
    // Initialize banner ad when component mounts
    const initBannerAd = async () => {
      try {
        if (window.cordova && window.admob) {
          const bannerConfig = {
            id: getAdUnitId('banner'),
            isTesting: process.env.NODE_ENV === 'development',
            autoShow: true,
            overlap: false,
            offsetTopBar: false,
            size: window.admob.AD_SIZE.SMART_BANNER
          };

          await window.admob.banner.config(bannerConfig);
          await window.admob.banner.prepare();
        }
      } catch (error) {
        console.error('Error initializing banner ad:', error);
      }
    };

    // Wait for device ready event before initializing ads
    document.addEventListener('deviceready', initBannerAd, false);

    return () => {
      document.removeEventListener('deviceready', initBannerAd);
      // Clean up banner ad when component unmounts
      if (window.cordova && window.admob) {
        window.admob.banner.remove();
      }
    };
  }, []);

  // Return an empty div as a placeholder for the banner ad
  return <div id="banner-ad" className="w-full h-[50px] bg-transparent fixed bottom-0 left-0" />;
};

export default BannerAd;