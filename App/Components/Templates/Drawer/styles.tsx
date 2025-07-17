import { CardShadow, Colors, FontFamily } from 'Theme';
import { StyleSheet } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  topView: {
    paddingLeft: 15,
    paddingBottom: 1,
    backgroundColor: Colors.statusBack,
    borderBottomWidth: 0.71,
    borderBottomColor: Colors.greyTextLight,
    height: responsiveHeight(5),
    justifyContent: 'center'
  },

  dpimage: {
    height: 50,
    width: 50,
    marginTop: 5,
    borderRadius: 25
  },
  image: {
    height: 27,
    width: 65,
    marginTop: 5,
    alignSelf: 'center'

    // marginLeft: responsiveWidth(57)
  },

  name: {
    fontSize: 15.5,
    color: Colors.text,
    fontFamily: FontFamily.Bold,
    maxWidth: responsiveWidth(55),
    marginTop: 14,
    marginLeft: 10
  },
  email: {
    fontSize: responsiveFontSize(2),
    color: Colors.greyText,
    fontFamily: FontFamily.SemiBold,
    maxWidth: responsiveWidth(55),
    marginTop: 1,
    marginLeft: 10
  },
  btn: {
    marginLeft: 10,
    // height: 25,
    width: responsiveWidth(70),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
    marginBottom: 10
  },
  btntxt: {
    marginTop: responsiveHeight(0),
    marginLeft: responsiveWidth(2),
    paddingTop: responsiveHeight(0.3),
    fontSize: 15,
    color: Colors.text,
    fontFamily: FontFamily.SemiBold
  },

  view: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(50)
  },
  arrow: {
    left: responsiveWidth(10)
  },
  drawericon: {
    height: responsiveHeight(5),
    width: responsiveWidth(10)
  },

  drawericon1: {
    height: responsiveHeight(5),
    width: responsiveWidth(10),
    // backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  btnsAdmin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    borderRadius: 5,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.forgot,
    padding: 7
  },
  btntxtsAdmin: {
    fontSize: 14,
    color: Colors.forgot,
    fontFamily: FontFamily.SemiBold
  },
  legal: {
    position: 'absolute',
    bottom: responsiveHeight(2.4),
    width: '100%',
    paddingHorizontal: 20
  },
  legaltxt: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 14,
    color: Colors.greyText
  },

  modalView: {
    paddingVertical: responsiveHeight(3),
    width: responsiveWidth(90),
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    ...CardShadow
  },
  modalMidText: {
    fontSize: 18,
    color: Colors.text,
    fontFamily: FontFamily.SemiBold,
    marginTop: 10
  }
});

export default styles;
