import {Dimensions} from 'react-native';
import {Colors} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    height: height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  markerFixed: {
    left: '50%',
    marginLeft: -30,
    marginTop: -60,
    position: 'absolute',
    top: '50%',
  },
  myLocation: {
    right: 15,
    position: 'absolute',
    backgroundColor: 'white',
    height: 40,
    width: 40,
    bottom: height * 0.275,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.text,
    elevation: 5,
  },
  marker: {
    height: 60,
    width: 60,
  },
  toolbar: {
    container: {
      position: 'absolute',
      top: 0,
      width: '100%',
      backgroundColor: '#fff',
      elevation: 2,
    },
  },
  bottomContainer: {
    paddingVertical: 18,
    position: 'absolute',
    bottom: 0,
    width: width,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottomChild: {
    justifyContent: 'center',
    width: '85%',
  },
  addressContainer: {
    width: '100%',
    marginVertical: 10,
  },
  addrText: {
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
  },
  buttonStyle: {
    text: {
      fontFamily: 'SofiaPro-Medium',
      color: Colors.text,
      fontSize: 14,
      lineHeight: 14,
    },
    container: {
      height: height * 0.075,
      borderRadius: 5,
      width: '100%',
      backgroundColor: 'white',
    },
  },
};

export default styles;
