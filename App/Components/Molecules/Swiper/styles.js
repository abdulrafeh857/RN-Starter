import {Dimensions} from 'react-native';
import {Colors} from 'Theme';

const {width, height} = Dimensions.get('window');

const styles = {
  banner: {
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: Colors.tintGrey,
  },
  border: {
    borderRadius: 6,
  },
  imageStyle: {
    height: height * 0.24,
    width: width - 60,
    justifyContent: 'center',
    backgroundColor: Colors.tintGrey,
    borderRadius: 6,
    marginBottom: Platform.select({ios: 0, android: 1}),
  },
};

export default styles;
