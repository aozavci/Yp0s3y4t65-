import { useEffect, useCallback } from 'react';
import { getAdUnitId } from '../config/adMobConfig';

const InterstitialAd = () => {
  const prepareInterstitial = useCallback(async () => {
    try {
      if (window.cordova && window.admob) {
        const interstitialConfig = {
          id: getAdUnitId('interstitial'),
          isTesting: process.env.NODE_ENV === 'development',
          autoShow: false
        };

        await window.admob.interstitial.config(interstitialConfig);
        await window.admob.interstitial.prepare();
      }
    } catch (error) {
      console.error('Error preparing interstitial ad:', error);
    }
  }, []);

  const showInterstitial = useCallback(async () => {
    try {
      if (window.cordova && window.admob) {
        await window.admob.interstitial.show();
        // Prepare the next interstitial ad after showing
        await prepareInterstitial();
      }
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      // If showing fails, try to prepare a new one
      await prepareInterstitial();
    }
  }, [prepareInterstitial]);

  useEffect(() => {
    // Initialize interstitial ad when component mounts
    const initInterstitial = () => {
      prepareInterstitial();
    };

    // Wait for device ready event before initializing ads
    document.addEventListener('deviceready', initInterstitial, false);

    return () => {
      document.removeEventListener('deviceready', initInterstitial);
    };
  }, [prepareInterstitial]);

  // Return the show function to be used by parent components
  return { showInterstitial };
};

export default InterstitialAd;