import {Dimensions, StyleSheet} from 'react-native';
import { Colors} from 'Theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.foreground,
    borderRadius: 0,
    elevation: 0,
    width: width,
  },
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default styles;
