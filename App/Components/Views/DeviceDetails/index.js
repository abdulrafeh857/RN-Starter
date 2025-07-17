import React from 'react';
import useService from './service';
import useStyles from './styles';
import { Screen } from '@Templates';
import { Header } from 'Components/Organisms';
import { BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, FlashMessage } from 'Components/Molecules';
import { Colors } from 'Theme';
import { Pusher } from 'Components/Organisms';
import ReactNativeModal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Linking } from 'react-native';
const Splash = props => {
  const {
    details,
    setDetails,
    data,
    getUserLocation,
    loader,
    setLoader,
    getUserPermission,
    modalVisible,
    setModalVisible,
    locData,
    loaderBtn,
    setLoaderBtn,
    pusherFlag,
    genId
  } = useService(props);
  const { text, idText, image, imageView, mainModalView, modalBtn, modalBtnText } = useStyles();

  return (
    <Screen rootStyle={{ height: responsiveHeight(90) }}>
      <Header title={'Device'}></Header>

      <Text style={text}>{genId}</Text>
      {/* <Text style={idText}>{genId}</Text> */}
      <View style={imageView}>
        {console.log('\n\n\n image::', data?.type?.image)}
        <Image
          style={image}
          resizeMode="contain"
          source={
            typeof data?.type?.image === undefined || data?.type?.image === undefined ? require('@Images/engine.png') : { uri: data?.type?.image }
          }></Image>
      </View>

      <Button
        icon={'arrow-right'}
        loading={loaderBtn}
        disabled={loaderBtn}
        onPress={() => {
          // if(pusherFlag===false){
          //   FlashMessage({
          //     message: 'Error',
          //     description: 'Not Connected',
          //     type: 'danger'
          //   });
          // }
          // else{
          getUserLocation();
          setLoaderBtn(true);
          //props.navigation.navigate('Dashboard');}
          // }
        }}>
        <Text>CONNECT</Text>
      </Button>
      <ReactNativeModal
        isVisible={modalVisible}
        backdropOpacity={0.1}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        animationInTiming={20}
        animationOutTiming={20}>
        <View style={mainModalView}>
          <Text style={modalBtnText}>Location access is required for the app to function. Please enable location services in the settings.</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: responsiveWidth(65),
              alignSelf: 'center',
              marginTop: responsiveHeight(3)
            }}>
            <TouchableOpacity
              style={modalBtn}
              onPress={() => {
                BackHandler.exitApp();
              }}>
              <Text
                style={[
                  modalBtnText,
                  {
                    fontSize: 18,
                    backgroundColor: Colors.statusBack
                  }
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[modalBtn, { backgroundColor: Colors.genorange }]}
              onPress={() => {
                Linking.openSettings();
              }}>
              <Text
                style={[
                  modalBtnText,
                  {
                    fontSize: 18,
                    color: 'white'
                  }
                ]}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </Screen>
  );
};

export default Splash;
