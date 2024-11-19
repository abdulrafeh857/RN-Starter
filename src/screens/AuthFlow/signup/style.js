import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  Logo: {
    height: responsiveHeight(55),
    resizeMode: 'contain',
    width: responsiveWidth(99)
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: responsiveHeight(15)
  },
  mainTxt: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#535edc'
  },
  btnView: {
    flexDirection: 'row',
    // marginTop:
    //   Platform.OS === 'android' ? responsiveHeight(16) : responsiveHeight(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(5),
    height: responsiveHeight(20),
    marginHorizontal: responsiveWidth(8)
  },
  btnTxt: {
    fontSize: 18,
    color: '#535edc'
  },
  btnMain: {
    height: responsiveHeight(7),
    borderColor: '#535edc',
    borderRadius: responsiveWidth(2),
    borderWidth: 1,
    width: responsiveWidth(40),
    alignItems: 'center',
    justifyContent: 'center'
  }
});
