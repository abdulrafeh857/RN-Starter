import {Colors, Layout} from 'Theme';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const styles = {
  rootViewStyle: {
    width: width * 0.4,
    backgroundColor: Colors.foreground,
    marginRight: 15,
    borderRadius: 10,
  },
  imageContainerStyle: {
    height: '60%',
    width: '100%',
    ...Layout.center,
  },
  imageStyle: {
    ...Layout.fullSize,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainerStyle: {
    height: '40%',
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
  },
  ratingPriceContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export default styles;
