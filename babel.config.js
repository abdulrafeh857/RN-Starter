module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./App'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@Api': ['./App/Api'],
          '@Assets': ['./App/Assets'],
          '@Images': ['./App/Assets/Images'],
          '@Components': ['./App/Components'],
          '@Atoms': ['./App/Components/Atoms'],
          '@Molecules': ['./App/Components/Molecules'],
          '@Organisms': ['./App/Components/Organisms'],
          '@Templates': ['./App/Components/Templates'],
          '@Views': ['./App/Components/Views'],
          '@Navigation': ['./App/Navigation'],
          '@Async': ['./App/Store/Async'],
          '@Redux': ['./App/Store/Redux'],
          '@Theme': ['./App/Theme'],
          '@Utils': ['./App/Utils'],
        },
      },
    ],
  ],
};
