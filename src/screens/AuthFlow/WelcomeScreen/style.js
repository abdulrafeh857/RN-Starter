import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  Logo: {
    height: responsiveHeight(55),
    resizeMode: 'contain',
    width: responsiveWidth(100)
  },
  containerTxt: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(15)
  },
  welcomeTxt: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
    textAlign: 'center'
  },
  viewBtn: {
    flexDirection: 'row',
    // marginTop:
    //   Platform.OS === 'android' ? responsiveHeight(16) : responsiveHeight(10),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: responsiveHeight(5),
    height: responsiveHeight(22),
    marginHorizontal: responsiveWidth(8)
  },
  btnText: {
    fontSize: 16,
    color: '#535edc'
  },
  buttonMain: {
    height: responsiveHeight(7),
    borderColor: '#535edc',
    borderRadius: responsiveWidth(2),
    borderWidth: 1,
    width: responsiveWidth(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailstextview: {
    marginTop: responsiveHeight(1)
  },
  detailstext: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    lineHeight: responsiveHeight(2.5),
    color: '#949391'
  }
});
