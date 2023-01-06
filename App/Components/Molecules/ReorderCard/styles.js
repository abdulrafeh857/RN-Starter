import {Colors, FontSize} from 'Theme';
import {shadow} from '@Atoms';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = {
  orderCard: {
    cardRootContainerStyle: {
      width: width * 0.4,
      backgroundColor: Colors.foreground,
      borderRadius: 6,
      borderWidth: 0.3,
      borderColor: Colors.tintGrey,
      ...shadow.card,
    },
    topContainerStyle: {
      flexDirection: 'row',
      paddingTop: 10,
      paddingHorizontal: 6,
      justifyContent: 'space-between',
      paddingBottom: 4,
    },
  },
  button: {
    root: {
      height: 30,
      width: 90,
      backgroundColor: Colors.transparent,
      margin: 8,
      elevation: 0,
      borderColor: Colors.primary,
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    text: {
      fontSize: 12,
      lineHeight: 12,
      color: Colors.primary,
    },
  },
  itemViewStyle: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingBottom: 2,
  },
  titleTextStyle: {fontSize: 12, lineHeight: 12},
};

export default styles;
