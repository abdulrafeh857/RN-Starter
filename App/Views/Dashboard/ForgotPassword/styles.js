import {Colors} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.foreground,
  },
  rootScrollViewStyle: {
    backgroundColor: Colors.foreground,
  },
  rootInputContainerStyle: {
    backgroundColor: Colors.foreground,
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
  success: {
    padding: 18,
    alignItems: 'center',
  },
};

export default styles;
