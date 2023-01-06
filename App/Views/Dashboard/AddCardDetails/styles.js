import {Colors, Layout} from 'Theme';

import {Dimensions, Appearance, Platform} from 'react-native';

let darkMode = Appearance.getColorScheme() === 'dark';

const {width, height} = Dimensions.get('window');

const styles = {
  rootViewContainerStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  rootViewStyle: {
    backgroundColor: Colors.background,
  },
  form: {
    height: height * 0.5,
    width: width - 20,
    margin: 10,
  },
  cardStyle: {
    backgroundColor: Platform.select({
      android: Colors.white,
      ios: darkMode ? '#555' : Colors.white,
    }),
  },
};

export default styles;
