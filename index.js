/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!"
  ]);
  LogBox.ignoreLogs([
    'Warning: Encountered two children with the same key',
    'new NativeEventEmitter()',
    'Require cycle',
    'Each child in a list'
  ]);
  console.error = error => error.apply;
AppRegistry.registerComponent(appName, () => App);
