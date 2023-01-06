import {Colors, FontSize, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  rootScrollViewContainerStyle: {
    paddingBottom: height * 0.025,
    backgroundColor: Colors.background,
  },
  section: {
    rootViewStyle: {
      ...Layout.colVCenter,
      paddingVertical: 10,
      backgroundColor: '#fafafa',
      width: '100%',
      paddingLeft: 10,
    },
  },
  sides: {
    rootContainerStyle: {
      minHeight: height * 0.075,
      backgroundColor: Colors.foreground,
      paddingBottom: 10,
    },
    rootViewStyle: {
      marginVertical: 5,
      height: height * 0.05,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftViewStyle: {
      flexDirection: 'row',
      width: '75%',
      alignItems: 'center',
    },
    checkBoxContainerStyle: {
      backgroundColor: 'transparent',
      margin: 0,
      paddingLeft: 10,
      padding: 0,
      width: '100%',
      borderWidth: 0,
    },
    textPriceStyle: {
      width: '25%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontFamily: 'SofiaPro',
      color: Colors.primary,
    },
  },
  quantity: {
    rootViewStyle: {
      backgroundColor: Colors.foreground,
      height: height * 0.1,
      flexDirection: 'row',
      paddingHorizontal: '15%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    buttonStyle: {
      backgroundColor: Colors.primary,
      ...Layout.center,
      borderRadius: 50,
      height: height * 0.045,
      width: height * 0.045,
    },
  },
};

export default styles;
