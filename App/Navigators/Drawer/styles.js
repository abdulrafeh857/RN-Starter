import {Dimensions} from 'react-native';
import {Colors} from 'Theme';
const {height} = Dimensions.get('window');

const styles = {
  drawer: {
    rootViewContainerStyle: {
      flexGrow: 1,
      paddingBottom: height * 0.5,
    },
    rootViewStyle: {
      height: height * 0.225,
      width: '100%',
      backgroundColor: Colors.primary,
    },
    imageContainerStyle: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageStyle: {
      borderRadius: 500,
      height: 100,
      width: 100,
    },
    moreContentContainerStyle: {
      marginVertical: 10,
      height: 1,
      backgroundColor: '#7777',
    },
  },
  more: {
    rootViewStyle: {
      height: height * 0.06,
      marginBottom: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: '5%',
    },
    text: {
      fontSize: 13,
      lineHeight: 13,
      marginLeft: '7.5%',
      color: '#111',
    },
  },
  screen: {
    rootViewStyle: {
      height: height * 0.07,
      marginBottom: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: '5%',
    },
  },
  badge: {
    backgroundColor: Colors.tertiary,
    height: 7,
    width: 7,
    borderRadius: 10,
    position: 'absolute',
    right: 7.5,
  },
  version: {
    padding: 12,
    alignSelf: 'center',
  },
};

export default styles;
