import { Colors, FontFamily } from 'Theme';
import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CardShadow, CardShadowLow } from 'Theme';

const useStyles = () =>
  StyleSheet.create({
    text: {
      fontSize: 15,
      alignSelf: 'center',
      textAlign: 'center',
      color: Colors.greyText,
      fontFamily: FontFamily.Regular,
      maxWidth: responsiveWidth(75),
      marginVertical: responsiveWidth(5)
    },
    qrContainer: {
      flex: 0.5,
      backgroundColor: Colors.transparent,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: responsiveWidth(83),
      height: 250,
      alignSelf: 'center'
      // borderRadius: 10
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
      ...CardShadow
    },
    button: {
      width: responsiveWidth(85),
      alignSelf: 'center'
      // position: 'absolute',
      // top: responsiveHeight(75),
      // zIndex: 100,
      // ...CardShadow
    },
    label: {
      fontSize: 17,
      fontFamily: FontFamily.SemiBold,
      color: Colors.foreground
    },
    mainModalLocView: {
      backgroundColor: Colors.white,
      alignSelf: 'center',
      borderRadius: 10,
      paddingVertical: responsiveWidth(4),
      paddingHorizontal: responsiveWidth(5),
      width: responsiveWidth(85),
      borderWidth: 1,
      borderColor: Colors.greyText + '35',
      alignItems: 'flex-start'
    },
    locTitle: {
      fontSize: 16,
      color: Colors.text,
      fontFamily: FontFamily.Bold
    },
    locAdd: {
      fontSize: 15,
      color: Colors.text,
      fontFamily: FontFamily.SemiBold
    },
    modalLocBtn: {
      borderWidth: 1,
      borderColor: Colors.text,
      borderRadius: 15,
      height: responsiveHeight(5.5),
      width: responsiveWidth(15),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      flexDirection: 'row'
    },
    modalLocBtnText: {
      fontSize: 16,
      color: Colors.text,
      fontFamily: FontFamily.Bold,
      marginLeft: 10
    },
    mainMapModalView: {
      backgroundColor: Colors.foreground,
      borderRadius: 10,
      paddingVertical: responsiveWidth(3),
      paddingHorizontal: responsiveWidth(4),
      ...CardShadowLow,
      width: responsiveWidth(80),
      alignSelf: 'center'
      // alignSelf: 'flex-end'
    },
    modalMapBtn: {
      width: responsiveWidth(30),
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 0.2,
      borderColor: Colors.greyText,
      borderRadius: 8,
      justifyContent: 'center',
      paddingVertical: responsiveHeight(1)
    },
    modalBtnText: {
      fontSize: 16,
      color: Colors.text,
      fontFamily: FontFamily.SemiBold,
      textAlign: 'center',
      marginLeft: 10
    }
  });
export default useStyles;
