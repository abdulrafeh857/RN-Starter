import {Dimensions} from 'react-native';
import {Colors} from 'Theme';

const {height} = Dimensions.get('window');

const styles = {
  root: {
    marginTop: 0,
    height: height * 0.1 + 28,
    backgroundColor: Colors.foreground,
  },
  categoryRootContainer: {
    height: height * 0.1,
  },
  categoryContainer: {
    marginLeft: 8,
  },
  card: {
    elevation: 0,
    borderRadius: 0,
    paddingVertical: 12,
    height: height * 0.1 + 24,
  },
  search: {
    root: {
      flexGrow: 1,
    },
    categoryRootContainer: {
      marginTop: 10,
      flexGrow: 1,
    },
    categoryContainer: {
      margin: 8,
    },
    card: {
      elevation: 0,
      borderRadius: 0,
      flexGrow: 1,
      paddingHorizontal: 0,
    },
    textContainer: {
      marginLeft: 16,
      width: '100%',
      alignSelf: 'center',
      alignItems: 'flex-start',
    },
    flatList: {
      paddingTop: 5,
    },
  },
};

export default styles;
