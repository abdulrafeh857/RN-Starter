import {Colors, FontSize, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.foreground,
  },
  rootScrollViewStyle: {
    backgroundColor: Colors.background,
  },
  rootInputContainerStyle: {
    backgroundColor: Colors.foreground,
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
  inputStyle: {
    fontSize: 14,
    lineHeight: 14,
  },
  textPasswordTipStyle: {
    fontSize: FontSize.caption,
    color: '#333c',
  },
  checkBoxContainerStyle: {
    width: '100%',
    marginLeft: '-3%',
    backgroundColor: Colors.transparent,
    borderWidth: 0,
  },
  bottomButton: {
    rootViewStyle: {
      backgroundColor: Colors.primary,
      ...Layout.center,
      height: height * 0.075,
      width: '100%',
    },
    textStyle: {
      fontSize: FontSize.body,
      color: '#fffc',
    },
  },
};

export default styles;
