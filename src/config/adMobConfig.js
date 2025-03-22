// AdMob Configuration
export const ADMOB_CONFIG = {
  APP_ID: 'ca-app-pub-3421453932487412~5788084110',
  BANNER_AD_UNIT_ID: 'ca-app-pub-3421453932487412/8306436247',
  INTERSTITIAL_AD_UNIT_ID: 'ca-app-pub-3421453932487412/3158346494'
};

// Test IDs for development
export const TEST_IDS = {
  BANNER_AD_UNIT_ID: 'ca-app-pub-3940256099942544/6300978111',
  INTERSTITIAL_AD_UNIT_ID: 'ca-app-pub-3940256099942544/1033173712'
};

// Use test IDs in development environment
export const getAdUnitId = (type) => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  switch (type) {
    case 'banner':
      return isDevelopment ? TEST_IDS.BANNER_AD_UNIT_ID : ADMOB_CONFIG.BANNER_AD_UNIT_ID;
    case 'interstitial':
      return isDevelopment ? TEST_IDS.INTERSTITIAL_AD_UNIT_ID : ADMOB_CONFIG.INTERSTITIAL_AD_UNIT_ID;
    default:
      return null;
  }
};