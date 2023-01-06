import React, {useRef} from 'react';
import {View, Dimensions} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import styles from './styles';
import base64 from 'react-native-base64';
import ViewShot from 'react-native-view-shot';

const {width} = Dimensions.get('window');

const QRCodePopup = (props) => {
  const {visible, onClose, value, onShare} = props;

  const snapRef = useRef();

  let _value = JSON.stringify(value || '');
  _value = base64.encode(_value);

  let _onClose = () => onClose && onClose(false);
  let _onShare = () => {
    if (snapRef.current) {
      snapRef.current.capture().then((uri) => {
        onShare && onShare(uri);
      });
    }
  };

  if (visible)
    return (
      <View>
        <Portal>
          <Dialog visible={true} onDismiss={_onClose}>
            <ViewShot ref={snapRef} options={{quality: 1}}>
              <Dialog.Title style={{textAlign: 'center', fontSize: 14}}>
                Please ask your rider to scan the QR Code before collecting your
                order.
              </Dialog.Title>
              <Dialog.Content>
                <View style={styles.root}>
                  <QRCode
                    value={_value}
                    size={width / 2}
                    color="black"
                    backgroundColor="white"
                  />
                </View>
              </Dialog.Content>
            </ViewShot>
            <Dialog.Actions>
              <Button onPress={_onClose}>Close</Button>
              <Button onPress={_onShare}>Share</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  else return null;
};

export default QRCodePopup;
