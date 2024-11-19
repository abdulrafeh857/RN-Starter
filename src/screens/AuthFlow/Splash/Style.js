import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textview: {
    alignSelf: 'center',
    alignItems: 'center'
    // top: responsiveHeight(50),
  },
  Appname: {
    textAlign: 'center',
    fontSize: responsiveFontSize(5),
    color: 'white',
    fontWeight: 'bold',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 15,
    textShadowColor: 'blue'
  },
  ImageBackground: {
    width: responsiveWidth(94),
    height: responsiveHeight(60),
    paddingHorizontal: responsiveWidth(3),
    resizeMode: 'contain'
  }
});
