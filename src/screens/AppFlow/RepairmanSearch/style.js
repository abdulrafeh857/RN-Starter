import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  mapcontainer: {
    height: responsiveHeight(100),
    width: responsiveWidth(100)
  },
  maps: {
    height: responsiveHeight(100)
  },
  textinput: {
    borderRadius: responsiveHeight(0.5),
    justifyContent: 'center'
  },
  modalView: {
    marginVertical: responsiveHeight(6),
    // height: responsiveHeight(80),
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
    shadowRadius: 4,
    paddingBottom: responsiveHeight(2.5)
  },
  inputtextview: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: responsiveHeight(1),
    height: responsiveHeight(8),
    alignItems: 'center',
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(3)
  },

  tt1: {
    fontSize: responsiveFontSize(1.5)
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 32, 19, 0.7)',
    height: responsiveHeight(100)
  },
  optionsView: {
    justifyContent: 'center',
    marginTop: responsiveHeight(2.5),
    zIndex: 0
  },
  optionsTxtInput: {
    borderRadius: responsiveHeight(1),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#535edc',
    height: responsiveHeight(18),

    width: responsiveWidth(80),
    alignSelf: 'center'
  },
  modalBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(80),
    alignSelf: 'center',
    marginTop: responsiveHeight(3)
  },
  modalBtn: {
    borderRadius: responsiveHeight(1),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#535edc',
    height: responsiveHeight(7),
    width: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    height: responsiveHeight(38)
  },
  modalBtnColored: {
    borderRadius: responsiveHeight(1),
    backgroundColor: '#535edc',
    height: responsiveHeight(7),
    width: responsiveWidth(38),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTxt: {
    color: 'blue'
  },
  btnTxtWhite: {
    color: 'white'
  },
  centeredView11: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 32, 19, 0.7)'
  },
  container211: {
    // height: responsiveHeight(90),
    width: responsiveWidth(90),
    justifyContent: 'center'
  },
  infoContainer11: {
    marginLeft: responsiveWidth(4),
    marginTop: responsiveHeight(3)
  },
  subInfoContainer11: {
    marginTop: responsiveWidth(2),
    marginLeft: responsiveWidth(4)
  },
  namelbl11: {
    fontSize: 10
  },
  nameTxt11: {
    marginTop: responsiveHeight(0.5),
    fontWeight: 'bold',
    fontSize: 16
  },
  modalmapcontainer11: {
    height: responsiveHeight(38),
    // backgroundColor: 'blue',
    width: responsiveWidth(90),
    marginTop: responsiveHeight(2.5)
  },
  details11: {
    marginTop: responsiveHeight(2.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: responsiveWidth(4)
  },
  jobType11: {
    fontSize: 10,
    marginTop: responsiveHeight(2)
  },
  reparationType11: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5
  },
  text5: {
    color: '#535edc',
    textDecorationLine: 'underline',
    marginTop: responsiveHeight(2),
    fontWeight: 'bold'
  },
  price11: {
    borderColor: '#278be8',
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveHeight(1),
    marginRight: responsiveWidth(5),
    width: responsiveWidth(38),
    height: responsiveHeight(8),
    borderColor: '#278be8'
  },
  buttonContainer11: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
    marginLeft: responsiveWidth(4)
  },
  refuseTxt11: {
    color: '#535edc',
    fontWeight: 'bold'
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
    fontWeight: 'bold'
  },
  priceTxt: {
    fontSize: 12,
    marginRight: responsiveWidth(2)
  },
  detailsContainer11: {
    marginLeft: responsiveWidth(4)
  },
  detailTxt11: {
    marginTop: 5,
    fontSize: 13
  },
  modalmap11: {
    ...StyleSheet.absoluteFillObject
  },
  priceview: {
    marginTop: responsiveHeight(2.5),
    borderRadius: responsiveHeight(1),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#535edc',
    height: responsiveHeight(7),
    width: responsiveWidth(40)
  }
});
