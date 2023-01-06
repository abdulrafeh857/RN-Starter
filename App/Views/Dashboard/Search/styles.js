import {Colors, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.foreground,
  },
  topSectionContainerStyle: {
    ...Layout.colHCenter,
    backgroundColor: Colors.foreground,
    paddingVertical: 8,
    width: '100%',
    paddingLeft: 8,
  },
  rootScrollContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.foreground,
  },
  vendorCard: {
    contentContainerStyle: {
      justifyContent: 'center',
      paddingBottom: 3,
    },
  },
  section: {
    root: {
      padding: 10,
      backgroundColor: Colors.foreground,
    },
    child: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  noSearchRoot: {
    flex: 1,
  },
  browseCategoryRoot: {
    flex: 1,
  },
};

export default styles;
