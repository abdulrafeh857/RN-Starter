import {Colors} from 'Theme';
import {DefaultTheme, configureFonts} from 'react-native-paper';
// import * as Sentry from '@sentry/react-native';

//"@sentry/react-native": "^2.1.1",
// const production = process.env.NODE_ENV === 'production';
// production &&
//   Sentry.init({
//     dsn:
//       'https://ab71015b9f564694be895faf03d6c80e@o135747.ingest.sentry.io/5612700',
//   });

const fonts = {
  regular: {
    fontFamily: 'SofiaPro',
  },
  medium: {
    fontFamily: 'SofiaPro-Medium',
  },
  light: {
    fontFamily: 'SofiaPro',
  },
  thin: {
    fontFamily: 'SofiaPro',
  },
};

const paperFonts = {
  web: fonts,
  ios: fonts,
  android: fonts,
};

const materialTheme = {
  palette: {
    primaryColor: Colors.primary,
  },
};

const paperTheme = {
  ...DefaultTheme,
  roundness: 6,
  fonts: configureFonts(paperFonts),
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.foreground,
  },
};

export {materialTheme, paperTheme};
