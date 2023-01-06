import {Dimensions} from 'react-native';
import {Colors, Layout} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = {
  root: {
    alignItems: 'flex-start',
    borderRadius: 0,
    backgroundColor: Colors.foreground,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
    paddingBottom: 0,
  },
  left: {
    width: width * 0.5,
    backgroundColor: Colors.foreground,
  },
  addressContainer: {
    padding: 2,
  },
  arrow: {
    fontSize: 9,
    lineHeight: 9,
    color: Colors.text,
  },
  options: {
    flexDirection: 'row',
    width: width * 0.45,
    height: 20,
    backgroundColor: Colors.foreground,
    alignItems: 'center',
    zIndex: 1,
  },
  option: {
    backgroundColor: Colors.foreground,
    padding: 3,
    marginRight: 20,
    ...Layout.center,
  },
  optionText: {
    fontSize: 12,
    lineHeight: 12,
    color: Colors.primaryDark,
  },
  drawerIconContainerStyle: {
    padding: 12.5,
    paddingRight: 0,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    paddingLeft: 0,
  },
  right: {
    width: width * 0.25,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightChild: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartActive: {
    paddingHorizontal: 5,
    borderRadius: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.045,
    backgroundColor: Colors.primary,
  },
  badge: {
    backgroundColor: Colors.tertiary,
    height: 7,
    width: 7,
    borderRadius: 10,
    position: 'absolute',
    right: 7.5,
    top: 17.5,
  },
  user: {
    marginRight: -5,
  },
  cart: {
    image: {
      height: height * 0.025,
      width: height * 0.025,
    },
    text: {
      color: 'white',
      paddingLeft: 3,
      paddingTop: 3,
    },
  },
  search: {
    container: {
      marginTop: -5,
      paddingBottom: 12,
      justifyContent: 'center',
    },
    root: {
      top: 0,
      zIndex: 1,
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
  },
};

export default styles;
