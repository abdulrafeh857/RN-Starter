import {Colors, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewContainerStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  rootViewStyle: {
    flexGrow: 1,
    backgroundColor: Colors.background,
  },
  noCard: {
    top: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMethodCard: {
    rootViewStyle: {
      width: '100%',
      borderColor: Colors.tintGrey,
      paddingLeft: 8,
      padding: 10,
      backgroundColor: Colors.foreground,
      justifyContent: 'center',
    },
    containerStyle: {
      flexDirection: 'row',
      width: '100%',
      paddingRight: 20,
    },
    centerViewStyle: {
      marginLeft: 10,
    },
    brand: {
      color: Colors.text,
      fontSize: 15,
    },
    number: {
      color: Colors.tintGrey,
      fontSize: 15,
    },
    rightViewStyle: {
      position: 'absolute',
      right: 0,
      height: '100%',
      justifyContent: 'center',
    },
    expiry: {
      color: Colors.tintGrey,
      marginRight: 22,
    },
    icon: {
      position: 'absolute',
      right: 0,
    },
  },
  buttonRoot: {
    flex: 1,
    width: 75,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    ...Layout.center,
  },
  deleteButtonRoot: {
    height: '100%',
    width: 75,
    backgroundColor: '#f85059',
    alignSelf: 'flex-end',
    ...Layout.center,
  },
  fab: {
    backgroundColor: Colors.primaryDark,
    height: height * 0.075,
    width: height * 0.075,
    position: 'absolute',
    borderRadius: 100,
    bottom: height * 0.05,
    right: height * 0.05,
    ...Layout.center,
  },
};

export default styles;
