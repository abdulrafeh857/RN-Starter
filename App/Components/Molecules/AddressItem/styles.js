import {Colors, Layout} from 'Theme';

const styles = {
  item: {
    rootView: {
      width: '100%',
      paddingLeft: 8,
      padding: 10,
      backgroundColor: Colors.foreground,
    },
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    left: {
      width: '7%',
      alignItems: 'center',
    },
    center: {
      width: '86%',
    },
    right: {
      width: '7%',
      ...Layout.center,
    },
  },
};

export default styles;
