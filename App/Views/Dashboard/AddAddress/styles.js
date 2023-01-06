import {Colors, FontSize} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewContainerStyle: {
    flex: 1,
    backgroundColor: Colors.foreground,
  },
  rootViewStyle: {
    paddingBottom: height * 0.1,
    backgroundColor: Colors.foreground,
  },
  inputTextContainerStyle: {
    backgroundColor: Colors.foreground,
    paddingTop: '5%',
    paddingHorizontal: '4%',
  },
  inputStyle: {
    fontSize: FontSize.body,
  },
};

export default styles;
