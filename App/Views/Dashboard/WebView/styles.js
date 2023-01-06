import {Colors, FontSize, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.foreground,
  },
  loaderStyle: {
    position: 'absolute',
    top: height * 0.5 - 10,
    left: width * 0.5 - 10,
    zIndex: 1,
  },
  loader: Colors.primary,
};

export default styles;
