import * as TEXT from '@Atoms/Text';
import React, {useEffect} from 'react';
import {Button, Dialog, Portal} from 'react-native-paper';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import showAlert from '../../../Store/Actions/ShowAlert';
import LottieView from 'lottie-react-native';
import styles from './styles';

// let samplePayload = {
//   type: '',
//   autoDismiss: false,
//   title: '',
//   body: '',
//   buttons: [
//     {
//       name: '',
//       onPress: () => {},
//     },
//   ],
// };

const Alert = (props) => {
  const dispatch = useDispatch();

  const SA = useSelector((state) => state.ShowAlert);
  const alert = !SA.isLoading && SA.success && SA.data;

  let isSuccess = alert?.type === 'success';
  let isError = alert?.type === 'error';
  let isOops = alert?.type === 'oops';

  useEffect(() => {
    if (alert && alert.autoDismiss) {
      console.debug('Auto Dismiss after 6 seconds.');
      setTimeout(() => {
        console.debug('Auto Dismissed.');
        hideDialog();
      }, 6000);
    }
  }, [alert]);

  function hideDialog() {
    dispatch(showAlert(null));
  }

  if (alert) {
    return (
      <Portal>
        <Dialog style={styles.root} visible onDismiss={hideDialog}>
          <Dialog.Title>{alert.title}</Dialog.Title>
          <View style={styles.content}>
            {(isSuccess || isError || isOops) && (
              <LottieView
                loop={isOops}
                autoPlay={true}
                style={{
                  ...styles.animation,
                  height: isOops ? 150 : 80,
                  width: isOops ? 150 : 80,
                  marginBottom: isOops ? 0 : 25,
                  marginTop: isOops ? -5 : 0,
                }}
                source={
                  isSuccess
                    ? require('@Images/success.json')
                    : isError
                    ? require('@Images/error.json')
                    : require('@Images/oops.json')
                }
              />
            )}
            <TEXT.Title myStyle={styles.body}>{alert.body}</TEXT.Title>
          </View>
          <Dialog.Actions>
            {alert.buttons.map(({name, onPress}, index) => {
              let len = alert.buttons.length;

              return (
                <Button
                  theme={index === len - 1 ? styles.themePrimary : styles.theme}
                  key={index}
                  onPress={onPress}>
                  {name}
                </Button>
              );
            })}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  } else {
    return null;
  }
};

export default Alert;
