import {Colors, Layout} from 'Theme';

const styles = {
  root: {
    height: 70,
    width: '100%',
    backgroundColor: Colors.foreground,
    padding: 8,
  },
  card: {
    borderColor: Colors.primary,
    borderRadius: 6,
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  left: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 30,
    borderColor: Colors.primaryDark,
    borderWidth: 2,
    ...Layout.center,
  },
  ongoingText: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.primaryDark,
  },
  centerText: {
    fontSize: 14,
    lineHeight: 14,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 14,
    color: 'white',
  },
  center: {
    height: 40,
    margin: 5,
    justifyContent: 'center',
  },
  right: {
    height: 35,
    paddingHorizontal: 10,
    margin: 7.5,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 2,
  },
};

export default styles;
