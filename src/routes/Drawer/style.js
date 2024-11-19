import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  btnlogo1: {
    marginTop: responsiveHeight(0.2),
    marginRight: responsiveWidth(0)
    //justifyContent:"flex-start"
  },

  txtsplash: {
    color: 'black',
    fontSize: responsiveFontSize(4),
    justifyContent: 'center',
    marginRight: responsiveWidth(6)
  },
  topview: {
    flexDirection: 'row',
    marginTop: responsiveHeight(3),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(6.5)
  },
  btnText: {
    color: 'black',
    fontSize: responsiveFontSize(2.7),
    justifyContent: 'center',
    fontWeight: 'bold',
    marginLeft: responsiveWidth(3)
  },
  Btn: {
    width: responsiveWidth(60),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsiveWidth(10),
    marginTop: responsiveHeight(5)
  }
});
