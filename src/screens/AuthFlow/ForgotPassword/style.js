import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  backimage: {
    justifyContent: 'center',
    marginLeft: responsiveWidth(6)
  },
  loginHeading: {
    color: 'black',
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(2),
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
    height: responsiveHeight(6),
    alignItems: 'center'
  },
  loginTxt: {
    marginLeft: responsiveWidth(15),
    fontSize: responsiveFontSize(1.5),
    color: '#949391',
    lineHeight: responsiveHeight(2.5)
  },
  loginview: {
    justifyContent: 'center',
    marginTop: responsiveHeight(12)
  },
  email: {
    borderRadius: responsiveHeight(0.5),
    borderWidth: responsiveWidth(0.2),
    height: responsiveHeight(8),
    width: responsiveWidth(88),
    borderColor: '#535edc',
    paddingLeft: responsiveWidth(2.5),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  inputtext: {
    color: 'black'
  },
  button: {
    height: responsiveHeight(8),
    backgroundColor: '#535edc',
    borderRadius: responsiveHeight(0.5),
    width: responsiveWidth(88),
    marginTop: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  logintext: {
    color: 'white'
    // height: responsiveHeight(2),
  }
});
