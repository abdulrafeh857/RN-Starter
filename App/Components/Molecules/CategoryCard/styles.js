import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    height: height * 0.1,
    width: height * 0.1,
    borderRadius: 6,
    alignItems: 'center',
  },
  root1: {
    height: '100%',
    width: height * 0.1,
    margin: 0,
    borderRadius: 6,
  },
  rootImage: {
    borderRadius: 6,
  },
  card: {
    backgroundColor: 'transparent',
    height: height * 0.1,
    width: height * 0.1,
    borderRadius: 6,
    elevation: 0,
  },
  text: {
    color: 'white',
    zIndex: 1,
    position: 'absolute',
    bottom: 3,
    left: 5,
    fontSize: 12,
    lineHeight: 12,
  },
});

export default styles;
