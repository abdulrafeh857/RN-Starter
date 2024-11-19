import { StyleSheet, Platform } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  infoView: {
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(2)
  },
  nameTxt: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  hairline: {
    marginTop: responsiveHeight(3),
    width: responsiveWidth(100),
    height: responsiveHeight(0.05),
    opacity: 0.4,
    backgroundColor: 'grey'
  },
  emailTxt: {
    color: 'grey'
  },
  txtInputView: {
    alignSelf: 'center',
    width: responsiveWidth(88),
    height: responsiveHeight(7),
    borderWidth: 1,
    borderRadius: responsiveWidth(2),
    borderColor: '#535edc',
    marginTop: Platform.OS === 'android' ? responsiveHeight(1.5) : responsiveHeight(0.8),
    paddingLeft: responsiveWidth(3),
    justifyContent: 'center'
  },

  btnsSave: {
    width: responsiveWidth(88),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(2),
    backgroundColor: '#535edc',
    marginTop: Platform.OS === 'android' ? responsiveHeight(12) : responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  saveTxt: {
    color: 'white'
  },
  firstview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(8)
  },
  image: {
    height: responsiveWidth(20),
    width: responsiveWidth(20)
  },
  imageview: {
    height: responsiveWidth(22),
    width: responsiveWidth(22),
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: responsiveWidth(11),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backbutton: {
    marginTop: responsiveHeight(1),
    height: responsiveHeight(3),
    marginLeft: responsiveWidth(6)
  },
  addicon: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(3),
    marginLeft: responsiveWidth(15),
    marginTop: responsiveHeight(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  backbutton: {
    marginLeft: responsiveWidth(6),
    marginTop: responsiveHeight(1)
  },
  textinput: {
    color: 'black',
    fontSize: responsiveFontSize(1.7)
  },
  btnsSave1: {
    width: responsiveWidth(88),
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(2),
    backgroundColor: '#535edc',
    marginTop: Platform.OS === 'android' ? responsiveHeight(2) : responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
