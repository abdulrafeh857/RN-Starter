import { Colors, FontFamily } from 'Theme';
import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CardShadowLow } from 'Theme';

const useStyles = () =>
  StyleSheet.create({
    timeView: {
      width: responsiveWidth(85),
      borderRadius: 10,
      backgroundColor: Colors.light,
      paddingVertical: responsiveWidth(2),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsiveWidth(2),
      marginTop: responsiveWidth(3),
      flexDirection: 'row',
      ...CardShadowLow
    },
    timeViewHalf: {
      width: responsiveWidth(41),
      borderRadius: 10,
      backgroundColor: Colors.light,
      paddingVertical: responsiveWidth(4),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: responsiveWidth(5),
      flexDirection: 'row',
      ...CardShadowLow
    },
    halfMain: {
      marginTop: responsiveWidth(2),
      width: responsiveWidth(85),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    headText: {
      fontSize: 14,
      color: Colors.greyText,
      fontFamily: FontFamily.SemiBold
    },
    timeText: {
      fontSize: 16,
      color: Colors.text,
      fontFamily: FontFamily.SemiBold
    },
    progressText: {
      fontSize: 16,
      color: Colors.text,
      fontFamily: FontFamily.Black,
      fontWeight: '700',
      alignSelf: 'center',
      textAlign: 'center'
    },
    topText: {
      fontSize: 18,
      color: Colors.text,
      fontFamily: FontFamily.Bold,
      marginTop: responsiveWidth(5),
      marginLeft: responsiveWidth(8)
    },
    verticalLine: {
      height: responsiveWidth(5),
      width: 1,
      backgroundColor: Colors.greyText,
      alignSelf: 'center',
      marginHorizontal: 5
    },
    smallStatsView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: responsiveWidth(10),
      alignSelf: 'center',
      alignItems: 'center'
    },
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
    horizontalLine: {
      height: 1,
      width: responsiveWidth(43),
      backgroundColor: 'rgba(0,0,0,0.3)',
      alignSelf: 'center',
      marginVertical: 10
    },
    flatlistStyle: {
      width: responsiveWidth(85),
      borderRadius: 10,
      backgroundColor: Colors.light,
      alignSelf: 'center',
      marginTop: responsiveWidth(3),
      paddingVertical: responsiveWidth(2),
      ...CardShadowLow
    },
    statsView: {
      paddingVertical: 2,
      width: responsiveWidth(15),
      minHeight: responsiveHeight(12.5),
      backgroundColor: Colors.foreground,
      borderRadius: 10,
      // paddingVertical: 6,
      alignItems: 'center',
      justifyContent: 'center',
      // height:responsiveHeight(15),
      ...CardShadowLow
    },
    value: {
      fontSize: 15,
      color: Colors.text,
      fontFamily: FontFamily.Bold,
      alignSelf: 'center',
      textAlign: 'center'
      // paddingVertical:4
      // maxWidth: responsiveWidth(23)
      // position: 'absolute'
    },
    dotView: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: Colors.warning,
      position: 'absolute',
      top: 10,
      left: 8
    },
    title: {
      fontSize: 14,
      color: Colors.greyText,
      fontFamily: FontFamily.Regular,
      alignSelf: 'center',
      textAlign: 'center'
    },
    mainModalLocView: {
      backgroundColor: Colors.white,
      alignSelf: 'center',
      borderRadius: 20,
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
    }
  });
export default useStyles;
