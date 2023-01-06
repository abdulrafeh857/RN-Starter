import {Colors, Layout} from 'Theme';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = {
  rootViewContainerStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  rootViewStyle: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
  },
  description: {
    root: {
      width: '100%',
      backgroundColor: Colors.foreground,
      alignItems: 'center',
      flexDirection: 'row',
      padding: 8,
      justifyContent: 'space-between',
    },
  },
  billingSectionContainerStyle: {
    ...Layout.colHCenter,
    backgroundColor: Colors.foreground,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  billingSectionText: {
    fontSize: 16,
    lineHeight: 16,
  },
  lineThroughPrice: {
    textDecorationLine: 'line-through',
    fontFamily: 'SofiaPro',
    color: Colors.primary,
    fontSize: 17,
    lineHeight: 17,
    marginRight: 10,
  },
  buttonRoot: {
    flex: 1,
    width: 150,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    ...Layout.center,
  },
  deleteButtonRoot: {
    height: '100%',
    width: 75,
    backgroundColor: '#f85059',
    alignSelf: 'flex-end',
    ...Layout.center,
  },
  editButtonRoot: {
    height: '100%',
    width: 75,
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    ...Layout.center,
  },
  bottomView: {
    backgroundColor: Colors.foreground,
  },
};

export default styles;
