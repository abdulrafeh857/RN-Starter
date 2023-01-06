import {Colors, Layout} from 'Theme';
import {Dimensions} from 'react-native';
import {shadow} from '@Atoms';

const {width, height} = Dimensions.get('screen');

const styles = {
  rootViewStyle: {
    height: height * 0.33,
    backgroundColor: Colors.foreground,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    ...shadow.card,
  },
  imageContainerStyle: {
    height: '67.5%',
    width: width - 16,
    ...Layout.center,
  },
  imageStyle: {
    ...Layout.fullSize,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  textRootContainerStyle: {
    flexDirection: 'row',
    height: '32.5%',
    width: width - 16,
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: 3,
  },
  textContainerStyle: {
    height: '100%',
    width: '75%',
    justifyContent: 'space-evenly',
  },
  estTimeContainerView: {
    ...Layout.center,
  },
};

export default styles;
