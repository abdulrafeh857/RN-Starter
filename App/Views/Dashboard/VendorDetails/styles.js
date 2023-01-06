import {Colors, FontSize, Layout} from 'Theme';

import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const styles = {
  rootViewStyle: {
    flex: 1,
    backgroundColor: Colors.foreground,
  },
  description: {
    root: {
      width: '100%',
      minHeight: 50,
      backgroundColor: Colors.foreground,
    },
    top: {
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-between',
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    heading: {
      marginLeft: 10,
      paddingTop: 3,
    },
    caption: {
      fontFamily: 'SofiaPro-Light',
      fontWeight: 'normal',
      textAlign: 'justify',
      fontSize: 11,
      lineHeight: 15,
    },
    right: {
      ...Layout.center,
    },
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerIcon: {
    paddingHorizontal: 15,
  },
  rootScrollStyle: {
    paddingBottom: height * 0.1,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  tabContainer: {
    justifyContent: 'center',
    borderBottomColor: Colors.primary,
    paddingLeft: 8,
    paddingTop: 0,
    paddingBottom: 10,
  },
  tabBarTitle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionRoot: {
    backgroundColor: Colors.foreground,
    paddingTop: 14,
    paddingBottom: 8,
  },
  sectionText: {
    paddingLeft: 10,
    fontSize: 20,
    lineHeight: 20,
  },
  sectionCaption: {
    paddingLeft: 10,
    paddingTop: 1,
    fontSize: 13,
    lineHeight: 13,
  },
  errRoot: {
    height: height * 0.45,
    ...Layout.center,
  },
  errChild: {
    height: height * 0.75,
    ...Layout.center,
  },
  errText: {
    marginTop: 10,
    fontSize: FontSize.body,
    color: '#1115',
  },
};

export default styles;
