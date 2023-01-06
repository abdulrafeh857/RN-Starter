import {Dimensions} from 'react-native';
import {Colors} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = {
  root: {
    flexDirection: 'row',
    backgroundColor: Colors.foreground,
    borderBottomWidth: 1,
    borderColor: '#7774',
    height: 50,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'SofiaPro',
    fontWeight: 'normal',
    fontSize: 14,
    color: '#111',
    paddingLeft: 11,
  },
  input: {
    width: width,
    alignSelf: 'center',
    backgroundColor: Colors.foreground,
    fontSize: 14,
    paddingLeft: 18,
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
