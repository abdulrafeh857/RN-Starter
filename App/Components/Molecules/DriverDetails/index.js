import {View, Linking, Platform} from 'react-native';
import styles from './styles';
import React, {useState} from 'react';
import {Colors} from 'Theme';
import * as TEXT from '@Atoms/Text';
import {IconButton} from 'react-native-paper';
import {Divider, QRCodePopup} from '@Atoms';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';

let now = new Date();

const DriverDetails = (props) => {
  const {rider, order} = props;

  const [showQRCode, setShowQRCode] = useState(false);

  const {users} = useSelector((state) => state.Users);

  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${rider?.phone}`;
    } else {
      number = `tel:${rider?.phone}`;
    }
    Linking.openURL(number);
  };

  const onShare = (uri) => {
    const options = {
      title: 'Share',
      message:
        'Please ask your rider to scan the QR Code before collecting your order.',
      url: uri,
      excludedActivityTypes: [],
    };
    Share.open(options);
  };

  let qrData = {
    user: users?.id,
    order: order?.number,
    rider: order?.rider?.id,
    timestamp: now,
  };

  const openQRCodeDialog = () => setShowQRCode(true);

  if (rider)
    return (
      <>
        <View style={styles.root}>
          <View style={styles.header}>
            <TEXT.SubHeading>Driver Details</TEXT.SubHeading>
          </View>
          <View style={styles.driver}>
            <View style={styles.center.root}>
              <TEXT.Heading>
                {rider?.rider?.charAt(0)?.toUpperCase() +
                  rider?.rider?.slice(1)}
              </TEXT.Heading>
              <TEXT.Normal>
                {rider?.vehicle?.make}-{rider?.vehicle?.model}
                <TEXT.Normal myStyle={styles.center.text}>
                  {' '}
                  ({rider?.vehicle?.color})
                </TEXT.Normal>
              </TEXT.Normal>
              <TEXT.Normal>
                Reg No:{' '}
                <TEXT.Normal myStyle={styles.center.reg}>
                  {rider?.vehicle?.registration_number}
                </TEXT.Normal>
              </TEXT.Normal>
            </View>
            <View style={styles.right.root}>
              <View style={styles.right.icon}>
                <IconButton
                  icon="phone"
                  color={Colors.primary}
                  size={25}
                  onPress={() => openDialScreen()}
                />
              </View>
              <View style={{marginTop: 10}}>
                <IconButton
                  icon="qrcode-scan"
                  color={Colors.primary}
                  size={30}
                  onPress={openQRCodeDialog}
                />
              </View>
            </View>
          </View>
        </View>
        <QRCodePopup
          visible={showQRCode}
          onClose={setShowQRCode}
          onShare={onShare}
          value={qrData}
        />
        <Divider />
      </>
    );
  else return null;
};

export default DriverDetails;
