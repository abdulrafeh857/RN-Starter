import {Colors, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = {
  root: {
    ...Layout.colHCenter,
    height: height * 0.075,
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 8,
    marginTop: 1,
    backgroundColor: Colors.foreground,
  },
  text: {
    marginLeft: 5,
  },
  overlay: {
    backgroundColor: '#7777',
    height: height * 2,
    width: width,
    position: 'absolute',
    bottom: 0,
  },
  header: {
    root: {
      backgroundColor: 'white',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      padding: 10,
      height: 10,
      width: '100%',
    },
    handle: {
      backgroundColor: Colors.text,
      width: 50,
      height: 5,
      borderRadius: 10,
      alignSelf: 'center',
    },
  },
  content: {
    root: {
      backgroundColor: 'white',
      padding: 16,
      height: '100%',
    },
    text: {
      color: 'white',
    },
    button: {
      marginTop: 15,
    },
  },
};

export default styles;
