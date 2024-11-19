import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  Infoview: {
    marginLeft: responsiveWidth(6),
    marginTop: responsiveHeight(1.5)
  },
  mainTxt: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold'
  },
  mainSubTxt: {
    marginTop: responsiveHeight(0.5),
    lineHeight: responsiveHeight(2.5),
    fontSize: responsiveFontSize(1.7)
  },
  viewInput: {
    marginTop: responsiveHeight(2)
  },
  txtInput: {
    color: 'black',
    width: responsiveWidth(88),
    height: responsiveHeight(7),
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    borderColor: '#535edc',
    marginTop: responsiveHeight(1.5),
    paddingLeft: responsiveWidth(2.5)
  },

  registerBtn: {
    width: responsiveWidth(88),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(2),
    backgroundColor: '#535edc',
    marginTop: responsiveHeight(0.5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtBtn: {
    color: 'white'
  },
  endText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(4)
  },
  loginTxt: {
    color: '#535edc'
  }
});
