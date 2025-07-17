import { Colors, FontFamily,CardShadowLow } from 'Theme';
import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const useStyles = () =>
  StyleSheet.create({
    text: {
      fontSize: 15,
      alignSelf: 'center',
      textAlign: 'center',
      color: Colors.greyText,
      fontFamily: FontFamily.Regular,
      maxWidth: responsiveWidth(75),
      marginTop: responsiveWidth(5)
    },
    mainModalView: {
      backgroundColor: Colors.foreground,
      borderRadius: 10,
      paddingVertical: responsiveWidth(3),
      paddingHorizontal: responsiveWidth(4),
      ...CardShadowLow,
      width: responsiveWidth(80),
      alignSelf: 'center'
      // alignSelf: 'flex-end'
    },
    modalBtnText: {
      fontSize: 18,
      color: Colors.text,
      fontFamily: FontFamily.SemiBold,
      textAlign: 'center'
      // marginLeft: 10
    },
    modalBtn: {
      width: responsiveWidth(30),
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 0.2,
      borderColor: Colors.greyText,
      borderRadius: 8,
      justifyContent: 'center',
      paddingVertical: responsiveHeight(1)
    }
  });

export default useStyles;
