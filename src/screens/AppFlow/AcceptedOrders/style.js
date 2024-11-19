import { StyleSheet, Platform } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize, responsiveScreenWidth } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  container211: {
    // height: responsiveHeight(90),
    width: responsiveWidth(90),
    justifyContent: 'center'
  },
  infoContainer11: {
    marginLeft: responsiveWidth(4),
    marginTop: responsiveHeight(2)
  },
  subInfoContainer11: {
    marginTop: responsiveWidth(3),
    marginLeft: responsiveWidth(4)
  },
  namelbl11: {
    fontSize: 10
  },
  nameTxt11: {
    marginTop: responsiveHeight(0.5),
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8)
  },
  textgeo: {
    marginTop: responsiveHeight(2.5),
    fontSize: 10
  },
  modalmapcontainer11: {
    height: responsiveHeight(38),
    // backgroundColor: 'blue',
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2)
  },
  details11: {
    marginTop: responsiveHeight(2.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: responsiveWidth(4)
  },
  jobType11: {
    fontSize: 10
    // marginTop: responsiveHeight(2),
  },
  reparationType11: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginTop: responsiveHeight(0.5)
  },
  text5: {
    color: '#535edc',
    textDecorationLine: 'underline',
    marginTop: responsiveHeight(1),
    fontWeight: 'bold'
  },
  price11: {
    borderColor: '#278be8',
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveHeight(1),
    marginRight: responsiveWidth(5),
    width: responsiveWidth(38),
    height: responsiveHeight(7),
    borderColor: '#278be8',
    color: 'black',
    textAlign: 'center'
  },
  buttonContainer11: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(4)
  },
  refuseTxt11: {
    color: '#535edc',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8)
  },
  btnRefuse11: {
    height: responsiveHeight(7),
    borderRadius: responsiveHeight(1),
    borderColor: '#535edc',
    borderWidth: responsiveWidth(0.2),
    width: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnAccept11: {
    height: responsiveHeight(7),
    borderRadius: responsiveHeight(1),
    width: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#535edc',
    marginRight: responsiveWidth(5)
  },
  acceptTxt11: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8)
  },
  priceTxt: {
    fontSize: 12,
    marginRight: responsiveWidth(2)
  },
  detailsContainer11: {
    marginLeft: responsiveWidth(4)
  },
  detailTxt11: {
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.5),
    lineHeight: responsiveHeight(3)
  },

  row: {
    marginLeft: responsiveWidth(6)
  },
  backimage: {
    // marginTop: responsiveHeight(3.5),
  },
  repairTxt: {
    // marginLeft: responsiveWidth(2),
    fontWeight: 'bold'
    // marginTop: responsiveHeight(1.5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headertext: {
    fontSize: 12,
    color: '#898b8c',
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(3),
    marginRight: responsiveWidth(3)
  },
  repair: {
    fontWeight: 'bold'
  },
  textview: {
    marginLeft: responsiveWidth(3),
    marginTop: 5
  },
  para1: {
    fontSize: 14,
    color: '#898b8c'
  },
  mapcontainer: {
    height: Platform.OS === 'android' ? responsiveHeight(25) : responsiveHeight(25.1),
    width: responsiveWidth(88),
    marginTop: responsiveHeight(1)
    // marginBottom: responsiveHeight(6),
  },
  modalmap11: {
    ...StyleSheet.absoluteFillObject
  },
  textview2: {
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(2)
  },
  dateTxt: {
    fontSize: 13,
    marginLeft: responsiveWidth(3)
  },
  price: {
    fontSize: 13,
    marginRight: responsiveWidth(3),
    borderRadius: responsiveHeight(1),
    borderWidth: responsiveWidth(0.2),
    height: responsiveHeight(7),
    width: Platform.OS === 'android' ? responsiveWidth(37) : responsiveWidth(38),
    justifyContent: 'center',
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(5),
    borderColor: '#535edc',
    paddingLeft: responsiveWidth(2.5)
  },
  Modalheader: {
    marginTop: responsiveHeight(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(1)
  },
  title: {
    marginTop: responsiveHeight(0.5),
    marginLeft: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(1)
  },
  titletext: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 12,
    marginLeft: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(1)
  },
  subtitletext: {
    fontSize: responsiveFontSize(1.6),
    // marginTop: responsiveHeight(0.5),
    lineHeight: responsiveHeight(3)
  },
  subtitle2text: {
    fontSize: 13,
    marginTop: 2
  },
  Modalbackground: {
    backgroundColor: 'white',
    // height: responsiveHeight(40),
    width: responsiveWidth(88),
    alignSelf: 'center',
    // marginTop: responsiveHeight(1.5),
    borderRadius: responsiveHeight(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  mainFlatListView: {
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveHeight(2)
  },
  centeredView11: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 32, 19, 0.7)',
    height: responsiveHeight(100)
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
    // height: responsiveHeight(38),
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
  modalView: {
    marginVertical: responsiveHeight(4),
    height: responsiveHeight(85),
    backgroundColor: 'white',
    borderRadius: responsiveHeight(1),
    width: responsiveWidth(90),
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
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
    ...StyleSheet.absoluteFillObject
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
  logout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(3.5),
    // marginRight: responsiveWidth(3),
    alignItems: 'center'
  },
  logoutbutton: {
    flexDirection: 'row',
    marginRight: responsiveWidth(6)
  },
  logouttext: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: responsiveWidth(1),
    fontSize: responsiveFontSize(1.7)
  }
});
