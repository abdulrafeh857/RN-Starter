import {Dimensions} from 'react-native';
import {p} from '@Atoms';
import {Colors} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = {
  input: {
    backgroundColor: Colors.foreground,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputChild: {
    backgroundColor: Colors.foreground,
    width: width - 16,
  },
  inputText: {
    padding: 10,
    paddingBottom: 0,
    color: Colors.primaryDark,
    fontSize: 15,
    lineHeight: 18,
  },
  button: {
    root: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      justifyContent: 'space-evenly',
      paddingTop: 5,
    },
    delete: {
      borderColor: Colors.error,
      width: width * 0.33,
    },
    apply: {
      width: width * 0.33,
    },
  },
};

export default styles;
