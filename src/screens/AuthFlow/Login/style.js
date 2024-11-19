import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  container2: {
    // height: responsiveHeight(90),
    width: responsiveWidth(90),
    justifyContent: 'center'
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
  inputview: {
    alignItems: 'center'
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
  password: {
    borderRadius: responsiveHeight(0.5),
    borderWidth: responsiveWidth(0.2),
    height: responsiveHeight(8),
    width: responsiveWidth(88),
    marginTop: responsiveHeight(2),
    borderColor: '#535edc',
    paddingLeft: responsiveWidth(2.5),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  loginview: {
    justifyContent: 'center',
    marginTop: responsiveHeight(12)
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
  },
  forgetp: {
    alignItems: 'center',
    marginTop: responsiveHeight(4),
    height: responsiveHeight(4)
  },
  iconview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(6),
    marginRight: responsiveWidth(15),
    marginLeft: responsiveWidth(10)
  },
  socialBtn: {
    height: responsiveHeight(6),
    width: responsiveWidth(33),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: responsiveHeight(1),
    backgroundColor: 'white',
    paddingRight: responsiveWidth(2),
    paddingLeft: responsiveWidth(2.5),

    shadowColor: '#278be8',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9
  },
  price2: {
    fontSize: 8
  },
  iconviewBtn: {
    height: responsiveHeight(4),
    width: responsiveWidth(8.5),
    backgroundColor: '#d1e2ff',
    borderRadius: responsiveHeight(0.5),
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {},
  Socialtext: {
    color: 'black',
    alignItems: 'center',
    marginRight: responsiveWidth(1),
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  cusname: {
    marginLeft: responsiveWidth(4),
    marginTop: responsiveHeight(3)
  },
  cusname2: {
    marginLeft: responsiveWidth(4)
  },
  textgeo: {
    marginTop: responsiveHeight(2.5),
    fontSize: 10
  },
  mapcontainer: {
    height: responsiveHeight(38),
    backgroundColor: 'blue',
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2.5)
  },
  details: {
    marginTop: responsiveHeight(2.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: responsiveWidth(4)
  },
  price: {
    borderColor: '#278be8',
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveHeight(1),
    marginRight: responsiveWidth(5),
    width: responsiveWidth(38),
    height: responsiveHeight(8)
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(4)
  },
  refuse: {
    color: '#278be8',
    fontWeight: 'bold'
  },
  button1: {
    height: responsiveHeight(7),
    borderRadius: responsiveHeight(1),
    borderColor: '#278be8',
    borderWidth: responsiveWidth(0.2),
    width: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    height: responsiveHeight(7),
    borderRadius: responsiveHeight(1),
    borderColor: '#278be8',
    borderWidth: responsiveWidth(0.2),
    width: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#278be8',
    marginRight: responsiveWidth(5)
  },
  accept: {
    color: 'white',
    fontWeight: 'bold'
  },
  para: {
    marginLeft: responsiveWidth(4)
  },
  pt: {
    marginTop: 5,
    fontSize: 13
  },

  buttonOpen: {
    backgroundColor: 'blue',
    marginTop: responsiveHeight(2)
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 32, 19, 0.7)'
  },
  view1: {
    justifyContent: 'center',
    marginTop: responsiveHeight(2)
  },
  ti2: {
    marginTop: responsiveHeight(1),
    borderRadius: responsiveHeight(1),
    borderWidth: responsiveWidth(0.2),
    borderColor: 'blue',
    height: responsiveHeight(20),
    justifyContent: 'center',
    width: responsiveWidth(85),
    marginLeft: responsiveWidth(3)
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(70),
    alignSelf: 'center',
    marginTop: responsiveHeight(4)
  },
  btn: {
    borderRadius: responsiveHeight(1),
    borderWidth: responsiveWidth(0.2),
    borderColor: 'blue',
    height: responsiveHeight(8),
    width: responsiveWidth(33),
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    height: responsiveHeight(38)
  },
  btn2: {
    borderRadius: responsiveHeight(1),
    backgroundColor: 'blue',
    height: responsiveHeight(8),
    width: responsiveWidth(33),
    justifyContent: 'center',
    alignItems: 'center'
  },
  t4: {
    color: 'blue'
  },
  t3: {
    color: 'white'
  },
  inputtext: {
    color: 'black'
  }
});
