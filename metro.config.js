// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig
} = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      'png',
      'jpg',
      'jpeg',
      'gif'
    ],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'js', 'jsx', 'ts', 'tsx']
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true
      }
    })
  }
};

// Wrap with Reanimated Metro Config
module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(defaultConfig, customConfig)
);
