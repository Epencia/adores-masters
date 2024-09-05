
const IS_DEV = process.env.APP_VARIANT === 'development';
export default {
  expo: {

    name: IS_DEV ? 'Adorès Masters (Dev)' : 'Adorès Masters',
    slug: 'adores-masters',
    version: '2.0.0',
    orientation: 'portrait',
    icon: './assets/logo-icone.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/adaptive-logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      accessibilityLabel: "Image de lancement d'Adorès Masters",
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'dev.mandigoentreprise.adoresmasters' : 'com.mandigoentreprise.adoresmasters',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-logo.png',
        backgroundColor: '#ffffff',
      },
      package: IS_DEV ? 'dev.mandigoentreprise.adoresmasters' : 'com.mandigoentreprise.adoresmasters',
      versionCode: 2
    },
    web: {
      favicon: './assets/favlogo.png',
    },
    extra: {
      appVariant: 'development' || null,
      eas: {
        projectId: '9e57c74e-c016-4fb6-ab27-0b6a36ae1ab5',
      },
    },
    updates: {
      url: 'https://u.expo.dev/9e57c74e-c016-4fb6-ab27-0b6a36ae1ab5',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    }
  },
};