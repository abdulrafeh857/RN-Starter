import {Colors} from 'Theme';
import {Dimensions} from 'react-native';

const styles = {
  rootViewStyle: {
    backgroundColor: Colors.foreground,
    flex: 1,
  },
  rootScrollViewContainerStyle: {
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
  fc: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 18,
  },
  inputTextStyle: {
    fontSize: 12,
    lineHeight: 12,
  },
  checkBoxContainerStyle: {
    width: '50%',
    paddingHorizontal: 8,
    backgroundColor: Colors.transparent,
    borderWidth: 0,
    justifyContent: 'center',
    height: 30,
    padding: 0,
    margin: 0,
  },
  checkBoxText: {
    fontWeight: 'normal',
    fontFamily: 'SofiaPro',
    fontSize: 12,
    lineHeight: 12,
    color: Colors.text,
  },
  signUpContainer: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
};

export default styles;
