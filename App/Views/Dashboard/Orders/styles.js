import {Colors, FontSize} from 'Theme';

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  rootScrollViewStyle: {
    paddingBottom: 20,
    backgroundColor: Colors.background,
  },
  invalidText: {
    marginTop: 10,
    fontSize: FontSize.body,
    color: '#1115',
    fontSize: 16,
    lineHeight: 16,
  },
  invalidCaption: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 11,
    color: '#1115',
  },
  orderCard: {
    cardRootContainerStyle: {
      marginTop: 10,
      width: '100%',
      backgroundColor: Colors.foreground,
    },
    topContainerStyle: {
      paddingLeft: '2%',
      paddingVertical: 10,
      paddingRight: '5%',
    },
    textVendorStyle: {
      fontSize: FontSize.caption,
      color: Colors.text,
    },
    titlePriceViewStyle: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bottomContainerStyle: {
      width: '100%',
      flexDirection: 'row',
      flex: 1,
    },
    bottomRootViewStyle: {
      flexDirection: 'row',
      width: '100%',
      borderBottomWidth: 0.5,
      borderColor: Colors.tintGrey,
      paddingHorizontal: '5%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
};

export default styles;
