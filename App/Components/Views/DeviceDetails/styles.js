import { CardShadowLow, Colors, FontFamily } from 'Theme';
import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CardShadow } from 'Theme';

const useStyles = () =>
  StyleSheet.create({
    text: {
      fontSize: 23,
      alignSelf: 'center',
      textAlign: 'center',
      color: Colors.text,
      fontFamily: FontFamily.SemiBold,
      maxWidth: responsiveWidth(75),
      marginTop: responsiveWidth(5)
    },
    idText: {
      fontSize: 18,
      alignSelf: 'center',
      textAlign: 'center',
      color: Colors.text,
      fontFamily: FontFamily.Regular,
      maxWidth: responsiveWidth(75),
      marginVertical: responsiveWidth(1)
    },
    image: {
      width: responsiveWidth(83),
      height: 250,
      alignSelf: 'center',
      borderRadius: 10
    },
    imageView: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: responsiveWidth(85),
      paddingVertical: responsiveWidth(1),
      borderRadius: 10,
      overflow: 'hidden',
      marginVertical: responsiveWidth(5),
      backgroundColor: Colors.silver,
      height: responsiveHeight(30),

      ...CardShadow
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
