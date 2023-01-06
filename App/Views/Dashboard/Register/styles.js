import {Colors} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.foreground,
  },
  welcome: {
    root: {
      width: '100%',
      paddingLeft: 18,
      marginVertical: 10,
    },
    text: {
      color: Colors.primaryDark,
      fontSize: 24,
      lineHeight: 24,
    },
    subtext: {
      color: Colors.primaryDark,
      fontSize: 18,
      lineHeight: 18,
    },
  },
  rootScrollViewStyle: {
    flexGrow: 1,
    backgroundColor: Colors.foreground,
    paddingBottom: 250,
  },
  checkBoxContainerStyle: {
    width: 50,
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    justifyContent: 'center',
    height: 50,
    padding: 0,
    margin: 0,
    paddingLeft: 10,
  },
  checkBoxText: {
    fontWeight: 'normal',
    fontFamily: 'SofiaPro',
    fontSize: 12,
    lineHeight: 12,
    color: Colors.text,
  },
  termsAndConditionsLabelStyle: {
    fontSize: 11,
    lineHeight: 11,
    textDecorationLine: 'underline',
    paddingLeft: 0,
  },
};

export default styles;
