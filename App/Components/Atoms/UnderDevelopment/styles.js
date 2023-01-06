import {Colors, Layout} from 'Theme';

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.foreground,
    ...Layout.center,
  },
  imageContainerStyle: {
    height: '20%',
    width: '50%',
    ...Layout.center,
  },
  imageStyle: {
    opacity: 0.5,
    ...Layout.fullSize,
  },
};

export default styles;
