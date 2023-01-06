import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Layout} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = {
  root: {
    backgroundColor: Colors.foreground,
    elevation: 0,
    width: '100%',
  },
  container: {
    width: width,
    marginLeft: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 18,
    lineHeight: 19,
  },
};

export default styles;
