import {Dimensions} from 'react-native';
import {Colors} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = {
  rootScroll: {
    flexGrow: 1,
    backgroundColor: Colors.foreground,
  },
  root: {
    flex: 1,
  },
};

export default styles;
