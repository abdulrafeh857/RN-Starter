import { showMessage } from 'react-native-flash-message';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { FontFamily } from 'Theme';

const FlashMessage = props => {
  const { message, type, description, onPress } = props;
  showMessage({
    message: message,
    description: description,
    type: type,
    duration: 7000,
    floating: true,
    animated: true,
    position: 'top',
    icon: 'auto',
    hideOnPress: true,
    onPress: onPress,
    textStyle: {
      fontFamily: FontFamily.Regular,
      fontSize: 14.5,
      maxWidth: responsiveWidth(80)
    },
    titleStyle: {
      fontFamily: FontFamily.SemiBold,
      fontSize: 16
    }
  });
};
export default FlashMessage;
