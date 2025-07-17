import { Colors, FontFamily } from 'Theme';
import { Platform, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CardShadowLow } from 'Theme';

const useStyles = () =>
  StyleSheet.create({
    mainModalView: {
      backgroundColor: Colors.white,
      borderRadius: 10,
      paddingVertical: responsiveWidth(3),
      paddingHorizontal: responsiveWidth(4),
      ...CardShadowLow,
      width: responsiveWidth(50),
      alignSelf: 'flex-end'
    },
    modalBtnText: {
      fontSize: 16,
      color: Colors.text,
      fontFamily: FontFamily.SemiBold,
      textAlign: 'center',
      marginLeft: 10
    },
    modalBtn: {
      width: responsiveWidth(40),
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row'
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
    map: {
      marginTop: 10,
      height: Platform.OS === 'ios' ? responsiveHeight(90) : responsiveHeight(90),
      width: responsiveWidth(100),
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center'
    },
    fab: {
      position: 'absolute',
      right: responsiveHeight(2),
      bottom: responsiveHeight(23),
      backgroundColor: Colors.genorange
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
    }
  });
export default useStyles;
