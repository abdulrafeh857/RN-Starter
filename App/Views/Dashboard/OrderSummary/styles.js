import {Colors, FontSize, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.foreground,
  },
  rootScrollViewStyle: {
    backgroundColor: Colors.background,
  },
};

export default styles;
