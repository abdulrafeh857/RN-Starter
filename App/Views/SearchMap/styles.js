import {Dimensions} from 'react-native';
import {Colors, FontSize, Layout} from 'Theme';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  itemContainer: {
    width: '100%',
    marginTop: 10,
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomColor: Colors.tintGrey,
    justifyContent: 'space-between',
  },
  iconContainer: {
    ...Layout.center,
    width: '20%',
    flexDirection: 'row',
  },
  iconSize: FontSize.subTitle,
  iconColor: Colors.tintGrey,
  itemBodyContainer: {
    width: '79%',
    borderColor: Colors.tintGrey,
  },
  listContainerStyle: [Layout.fullSize],
  text: {
    fontSize: 14,
    lineHeight: 15,
    paddingTop: 5,
    color: Colors.text,
  },
  buttonStyle: {
    text: {
      fontFamily: 'SofiaPro-Medium',
      color: Colors.text,
      fontSize: 14,
      lineHeight: 15,
    },
    container: {
      height: height * 0.075,
      borderRadius: 5,
      paddingVertical: 25,
      width: '100%',
      backgroundColor: 'white',
    },
  },
};

export default styles;
