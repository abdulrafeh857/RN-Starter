import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Layout} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = {
  root: {
    flexDirection: 'row',
    backgroundColor: Colors.foreground,
  },
  search: {
    elevation: 0,
    width: '85%',
  },
  searchIcon: {
    width: '10%',
    margin: 0,
    marginLeft: 10,
    alignSelf: 'center',
  },
};

export default styles;
