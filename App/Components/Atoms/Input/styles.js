import {Dimensions} from 'react-native';
import {Colors} from 'Theme';

const {width} = Dimensions.get('window');

const styles = {
  root: {
    width: width - 36,
    alignSelf: 'center',
    backgroundColor: Colors.foreground,
    fontSize: 14,
  },
  error: {
    paddingTop: 5,
  },
  text: {
    color: Colors.error,
    marginLeft: 18,
  },
};

export default styles;
