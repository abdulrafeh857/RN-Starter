import {Colors, FontSize, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  rootScrollViewContainerStyle: {
    flex: 1,
    paddingBottom: '3%',
    backgroundColor: Colors.background,
  },
  imageContainerStyle: {
    width: '100%',
    height: height * 0.5,
    ...Layout.center,
  },
  imageStyle: {
    height: height * 0.5,
    width: '70%',
  },
  textTitleStyle: {
    fontSize: FontSize.subTitle,
    color: Colors.text,
    marginLeft: 20,
    marginBottom: 10,
  },
  item: {
    rootViewStyle: {
      ...Layout.colHCenter,
      height: height * 0.1,
      width: '100%',
      backgroundColor: Colors.foreground,
      flexDirection: 'row',
      marginBottom: 1,
      paddingLeft: '10%',
    },
    textStyle: {
      fontSize: FontSize.body,
      color: Colors.text,
      marginLeft: '5%',
    },
  },
  tips: {
    rootViewStyle: {
      width: '100%',
      marginVertical: 10,
      paddingLeft: '5%',
    },
    textStyle: {
      fontSize: FontSize.caption,
      color: Colors.text,
    },
  },
  soonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLeft: {
    marginLeft: 15,
  },
  textRight: {
    marginRight: 18,
  },
};

export default styles;
