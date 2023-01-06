import {Colors, FontSize} from 'Theme';

const styles = {
  orderCard: {
    cardRootContainerStyle: {
      width: '100%',
      backgroundColor: Colors.foreground,
    },
    topContainerStyle: {
      paddingHorizontal: 12,
      paddingTop: 10,
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
      paddingBottom: 10,
    },
    bottomContainerStyle: {
      width: '100%',
      flexDirection: 'row',
      flex: 1,
    },
    bottomRootViewStyle: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  button: {
    root: {
      height: 30,
      width: 100,
      backgroundColor: Colors.transparent,
      margin: 12,
      marginTop: 5,
      marginRight: 0,
      alignSelf: 'flex-end',
      elevation: 0,
      borderColor: Colors.primary,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    text: {
      fontSize: 12,
      lineHeight: 12,
      color: Colors.primary,
    },
  },
};

export default styles;
