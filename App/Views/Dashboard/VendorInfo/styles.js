import {Colors} from 'Theme';

const styles = {
  rootViewContainerStyle: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  rootViewStyle: {
    flexGrow: 1,
    paddingBottom: 50,
    backgroundColor: Colors.background,
  },
  root: {
    backgroundColor: Colors.foreground,
    padding: 8,
  },
  padTop: {
    paddingTop: 5,
  },
  padColored: {
    padding: 5,
    color: Colors.primaryDark,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default styles;
