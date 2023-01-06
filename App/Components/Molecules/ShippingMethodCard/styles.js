import {Colors, Layout, FontSize} from 'Theme';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  root: {
    ...Layout.colHCenter,
    backgroundColor: Colors.foreground,
    height: height * 0.075,
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
  },
  icon: {
    height: FontSize.heading,
    width: FontSize.heading,
  },
  image: {
    height: height * 0.066,
    width: height * 0.066,
    marginRight: 8,
  },
};

export default styles;
