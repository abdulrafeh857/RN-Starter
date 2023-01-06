import {Colors, FontSize, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flexDirection: 'row',
    marginBottom: 1,
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.foreground,
  },
  leftContainerStyle: {
    width: '77.5%',
    justifyContent: 'space-between',
    padding: 10,
  },
  rightContainerStyle: {
    width: '22%',
    ...Layout.center,
  },
  text: {
    fontStyle: 'italic',
  },
};

export default styles;
