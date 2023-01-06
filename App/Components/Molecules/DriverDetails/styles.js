import {Colors, Layout} from 'Theme';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = {
  root: {
    backgroundColor: Colors.foreground,
    width: '100%',
  },
  header: {
    width: '100%',
    padding: 8,
    paddingBottom: 0,
  },
  driver: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.foreground,
  },

  center: {
    root: {
      marginTop: 10,
      width: width * 0.8,
      padding: 8,
      paddingVertical: 10,
      justifyContent: 'space-between',
    },
    text: {
      lineHeight: 20,
      fontWeight: 'normal',
    },
    reg: {
      color: Colors.primary,
    },
  },

  right: {
    root: {
      width: width * 0.2,
      ...Layout.center,
    },
    icon: {
      backgroundColor: Colors.foreground,
      borderRadius: 25,
    },
  },
};

export default styles;
