import {Colors} from 'Theme';

const styles = {
  statusBar: Colors.primaryDark,
  headerHidden: {headerShown: false},
  dynamicTitle: {
    title: '',
    headerTitleStyle: {
      fontFamily: 'SofiaPro-Medium',
      fontSize: 18,
      lineHeight: 18,
      color: Colors.text,
    },
    headerTitleContainerStyle: {
      left: 50,
    },
    headerStyle: {
      backgroundColor: Colors.foreground,
      elevation: 0,
    },
    headerTintColor: Colors.text,
  },
};

export default styles;
