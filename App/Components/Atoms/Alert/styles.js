import {Colors, Layout} from 'Theme';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = {
  root: {
    width: width * 0.85,
    alignSelf: 'center',
  },
  animation: {
    alignSelf: 'center',
  },
  content: {
    marginHorizontal: 25,
    marginBottom: 12,
  },
  body: {
    fontSize: 17,
    lineHeight: 19,
    textAlign: 'justify',
  },
  themePrimary: {
    colors: {
      primary: Colors.text,
    },
  },
  theme: {
    colors: {
      primary: Colors.tintGrey,
    },
  },
};

export default styles;
