import {Colors, Layout} from 'Theme';

const styles = {
  root: {
    backgroundColor: 'white',
    flex: 1,
    ...Layout.center,
  },
  child: {
    height: 80,
  },
  text: {
    color: Colors.primary,
  },
};

export default styles;
