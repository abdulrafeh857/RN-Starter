import {Colors, FontSize, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = {
  root: {
    flex: 1,
    backgroundColor: Colors.foreground,
    paddingBottom: 12,
  },
  cartItemContainerStyle: {
    minHeight: height * 0.075,
    backgroundColor: Colors.foreground,
  },
  cartItemRootContainerStyle: {
    paddingTop: 5,
    width: '100%',
    backgroundColor: Colors.foreground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemLeftContainerStyle: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    width: width,
    justifyContent: 'space-between',
  },
  cartItemQuantityTextContainerStyle: {
    width: '75%',
    flexDirection: 'row',
  },
  sideRootContainerStyle: {
    width: '100%',
    backgroundColor: Colors.foreground,
    ...Layout.colHCenter,
    paddingLeft: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sideLeftContainerStyle: {
    width: '80%',
  },
  sideRightContainerStyle: {
    ...Layout.center,
  },
  modifiersContainerStyle: {
    grpTextStyle: {
      fontSize: 13,
      lineHeight: 13,
      textAlign: 'justify',
      color: '#3f3f3fcc',
      paddingTop: 10,
    },
    sidesTextStyle: {
      fontSize: 13,
      lineHeight: 13,
      textAlign: 'justify',
      color: Colors.primary,
      paddingTop: 4,
    },
  },
  bottomViewStyle: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: Colors.background,
  },
};

export default styles;
