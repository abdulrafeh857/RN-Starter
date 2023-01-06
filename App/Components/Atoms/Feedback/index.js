import Snackbar from 'react-native-snackbar';
import {Colors} from 'Theme';

const renderSnackBar = (message, button, onPress, state) => {
  let successOrErrorMsg =
    state === 'simple' || state === 'success' || state === 'error'
      ? message
      : '';

  let successOrErrorBGColor =
    state === 'simple' || state === 'success'
      ? Colors.primaryDark
      : state === 'error'
      ? '#ff646a'
      : 'white';

  Snackbar.show({
    text: successOrErrorMsg,
    duration: Snackbar.LENGTH_LONG,
    numberOfLines: 3,
    backgroundColor: successOrErrorBGColor,
    textColor: 'white',
    action: {
      text: button || '',
      textColor: 'white',
      onPress: onPress || (() => {}),
    },
  });
};

const Feedback = {
  simple: (message, button, onPress) =>
    renderSnackBar(message, button, onPress, 'simple'),

  success: (message, button, onPress) => {
    renderSnackBar(message, button, onPress, 'success');
  },

  error: (message, button, onPress) =>
    renderSnackBar(message, button, onPress, 'error'),

  dismiss: () => {
    Snackbar.dismiss();
  },
};

export default Feedback;

/*
USAGE:

Feedback.simple('Message', 'Done', () => {})

*/
