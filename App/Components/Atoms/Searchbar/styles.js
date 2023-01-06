import {Colors, FontSize, Layout} from 'Theme';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    ...Layout.fullWidth,
    width: width,
    height: 40,
  },
  searchBarContainerStyle: {
    width: width,
    height: 40,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  iconContainerStyle: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
    width: '15%',
    backgroundColor: '#eee',
    ...Layout.center,
  },
  textInputStyle: {
    marginLeft: -1,
    fontSize: 12,
    color: Colors.primary,
    borderLeftWidth: 0,
    backgroundColor: '#eee',
    borderRightWidth: 0,
    width: '70%',
  },
  backButtonContainerStyle: {
    marginLeft: -1,
    backgroundColor: '#eee',
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filter: {
    height: 40,
    width: 40,
    ...Layout.center,
  },
};

export default styles;
