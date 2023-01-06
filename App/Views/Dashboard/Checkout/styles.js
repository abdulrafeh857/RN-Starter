import {Colors, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  rootScrollViewContainerStyle: {
    backgroundColor: Colors.background,
  },
  sectionContainerStyle: {
    ...Layout.colVCenter,
    padding: 10,
    width: '100%',
    paddingLeft: 8,
  },
  billingSectionContainerStyle: {
    ...Layout.colHCenter,
    backgroundColor: Colors.foreground,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  billingSectionText: {
    fontSize: 16,
    lineHeight: 16,
  },
  lineThroughPrice: {
    textDecorationLine: 'line-through',
    fontFamily: 'SofiaPro',
    color: Colors.primary,
    fontSize: 17,
    lineHeight: 17,
    marginRight: 10,
  },
  addAddressButton: {
    rootViewStyle: {
      ...Layout.colHCenter,
      height: height * 0.075,
      width: '100%',
      flexDirection: 'row',
      paddingLeft: 8,
      backgroundColor: Colors.foreground,
      marginTop: 1,
    },
    textStyle: {
      marginLeft: 5,
    },
  },
  paymentMethodCard: {
    rootViewStyle: {
      width: '100%',
      borderTopWidth: 1,
      borderColor: Colors.background,
      paddingLeft: 8,
      padding: 10,
      backgroundColor: Colors.foreground,
      justifyContent: 'center',
    },
    containerStyle: {
      flexDirection: 'row',
      width: '100%',
      paddingRight: 20,
      justifyContent: 'space-between',
    },
    leftViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  note: {
    rootViewStyle: {
      backgroundColor: Colors.foreground,
      paddingTop: 7,
      paddingBottom: 12,
    },
  },
};

export default styles;
