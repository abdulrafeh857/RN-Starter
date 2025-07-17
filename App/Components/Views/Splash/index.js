import React from 'react';
import useService from './service';
import useStyles from './styles';
import { Image, Text } from 'react-native';
import { Screen } from '@Templates';
import { Colors } from '@Theme';
import ReactNativeModal from 'react-native-modal';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { ActivityIndicator } from 'react-native-paper';
import appVersion from '../../../../appversion';
import { Pusher } from 'Components/Organisms';

const Splash = props => {
  const { visible, modalVisible, setModalVisible } = useService(props);
  const { image, versionText } = useStyles();

  return (
    <>
      <Screen topColor={Colors.genblue}>
        <ActivityIndicator size={'small'} color={Colors.genblue} animating={true} style={{ marginTop: responsiveWidth(120) }}></ActivityIndicator>
        <ReactNativeModal
          isVisible={visible}
          animationIn="flipInX"
          animationOut="flipOutX"
          animationInTiming={1300}
          animationOutTiming={1}
          backdropColor="transparent"
          backdropOpacity={0}
          coverScreen={false}
          hasBackdrop={false}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveWidth(90),
            width: responsiveWidth(90),
            maxHeight: responsiveWidth(20)
          }}>
          <Image style={image} resizeMethod="resize" resizeMode="contain" source={require('@Images/logo.png')} />
        </ReactNativeModal>

        <Text style={versionText}>Version {appVersion}</Text>
      </Screen>
    </>
  );
};

export default Splash;
