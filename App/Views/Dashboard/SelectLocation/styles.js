import {Colors, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  addAddressButton: {
    rootViewStyle: {
      ...Layout.colHCenter,
      width: '100%',
      flexDirection: 'row',
      paddingLeft: 8,
      backgroundColor: Colors.foreground,
      marginBottom: 1,
      paddingVertical: 8,
    },
    textStyle: {
      marginLeft: 5,
      color: Colors.primary,
    },
  },
  item: {
    rootView: {
      width: '100%',
      paddingLeft: 8,
      padding: 10,
      backgroundColor: Colors.foreground,
      marginBottom: 1,
    },
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    left: {
      width: '7%',
      alignItems: 'center',
    },
    center: {
      width: '86%',
    },
    right: {
      width: '7%',
      ...Layout.center,
    },
  },
  rootScrollViewContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.background,
  },
  noAddrRoot: {
    height: height * 0.75,
    ...Layout.center,
  },
  noAddrText: {
    marginTop: 10,
    color: '#1115',
  },
  fabStyle: {
    rootViewStyle: {
      backgroundColor: Colors.primaryDark,
      height: height * 0.075,
      width: height * 0.075,
      position: 'absolute',
      borderRadius: 100,
      bottom: height * 0.05,
      right: height * 0.05,
      ...Layout.center,
    },
  },
  buttonsRoot: {
    flex: 1,
    width: 150,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    ...Layout.center,
  },
  selectButtonRoot: {
    flex: 1,
    width: 75,
    height: '100%',
    backgroundColor: Colors.success,
    alignSelf: 'flex-end',
    ...Layout.center,
  },
  deleteButtonRoot: {
    flex: 1,
    width: 75,
    height: '100%',
    backgroundColor: '#f85059',
    alignSelf: 'flex-end',
    ...Layout.center,
  },
};

export default styles;
