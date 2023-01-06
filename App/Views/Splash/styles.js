import {Dimensions} from 'react-native';
import {Colors, Layout} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = {
  root: {
    backgroundColor: 'rgb(109, 201, 239)',
    flex: 1,
    ...Layout.center,
  },
  child: {
    height: 80,
  },
  logo: {
    width: width * 0.5,
  },
};

export default styles;
