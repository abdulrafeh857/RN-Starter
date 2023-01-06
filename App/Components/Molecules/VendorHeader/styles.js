import {Colors, FontSize, Layout} from 'Theme';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');

const styles = {
  rootViewStyle: {
    width: '100%',
    backgroundColor: Colors.foreground,
    borderBottomWidth: 3,
    borderColor: '#0001',
  },
  imageContainerStyle: {
    height: height * 0.275,
    ...Layout.center,
  },
  imageStyle: {
    ...Layout.fullSize,
  },
  viewStyle: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRootContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
  },
  textContainerStyle: {
    width: '75%',
    justifyContent: 'space-evenly',
  },
  textTitleStyle: {
    fontSize: FontSize.body * 1.05,
  },
  textAddrStyle: {
    fontSize: FontSize.body * 0.95,
    color: '#333c',
  },
  textCaptionStyle: {
    fontSize: FontSize.caption,
    color: '#333c',
    marginTop: 5,
  },
  estTimeContainerView: {
    width: '25%',
    ...Layout.center,
  },
  textEstTimeStyle: {
    fontSize: FontSize.subTitle,
    color: Colors.primary,
  },
};

export default styles;
