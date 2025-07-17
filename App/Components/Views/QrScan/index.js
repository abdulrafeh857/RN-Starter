import React from 'react';
import useService from './service';
import useStyles from './styles';
import { Platform, Text, TouchableOpacity, Image, View, Linking, BackHandler } from 'react-native';
import { Screen } from '@Templates';
import { Header, Pusher } from 'Components/Organisms';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Colors, FontFamily } from 'Theme';
import { Button, FlashMessage } from 'Components/Molecules';
import { useDispatch, useSelector } from 'react-redux';
import { setDashboardDetails } from 'Store/Redux/DashboardDetails';
import { ActivityIndicator } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { setGensetId } from 'Store/Redux/GensetId';
import { setIsLoggedIn } from 'Store/Redux/IsLoggedIn';
import Async from 'Store/Async';
import { Button as PaperButton } from 'react-native-paper';
import ReactNativeModal from 'react-native-modal';

const QrScan = props => {
  const data = {
    id: '1'
  };
  const {
    flag,
    setFlag,
    loader,
    setLoader,
    getDriverAccount,
    setID,
    scanFlag,
    setScanFlag,

    modalMapVisible,

    modalCamVisible,
    setModalCamVisible,
    modalPermission,
    driverPermission,
    setDriverPermission,
    driverData,
    getUserPermission,

    setModalMapVisible,
    setModalPermission
  } = useService(props);
  const IsLoggedIn = useSelector(state => state.IsLoggedIn?.data);

  const { text, qrContainer, image, imageView, button, mainMapModalView, modalLocBtnText, modalBtnText, modalMapBtn, modalLocBtn } = useStyles();

  const dispatch = useDispatch();

  return (
    <Screen>
      <Header
        rightIcon={scanFlag === false ? null : 'reload'}
        onRightPress={() => {
          setFlag(!flag);
        }}
        onLeftPress={() => {
          console.log('\n\n\n\n scan flag', scanFlag);
          scanFlag === true ? setScanFlag(false) : props.navigation.navigate('Splash');
        }}
        title={scanFlag === false ? 'Connect Genset' : 'Add Device'}></Header>
      {scanFlag === false ? (
        <View>
          <View style={imageView}>
            <Image style={image} resizeMode="contain" source={require('@Images/logo.png')}></Image>
          </View>
          <TouchableOpacity
            style={{
              width: responsiveWidth(80),
              backgroundColor: Colors.genorange,
              alignSelf: 'center',
              borderRadius: 10,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(5)
            }}
            onPress={() => {
              setScanFlag(true);
              setFlag(!flag);
              console.log('\n\n\n pressed scanflag ,flag', scanFlag, flag);
              //
            }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: FontFamily.SemiBold,
                color: Colors.foreground
              }}>
              Connect Genset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: responsiveWidth(80),
              backgroundColor: Colors.genorange,
              alignSelf: 'center',
              borderRadius: 10,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveHeight(5)
            }}
            onPress={async () => {
              // dispatch(setIsLoggedIn(true));

              // await Async.setItem(Async.Item.IsLoggedIn, true);
              // props.navigation.navigate('ServiceLocations',{data:id});
              props.navigation.navigate('ServiceLocations', { data: data });
              console.log('\n\n\n data in qr', data);
            }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: FontFamily.SemiBold,
                color: Colors.foreground
              }}>
              Service Station
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={text}>The QR code wil be selected automatically when it’s positioned with in the guidelines</Text>
          <Icon
            name={'qr-code-scanner'}
            size={290}
            color={Colors.text + '45'}
            style={{
              position: 'absolute',
              top: Platform.OS == 'ios' ? 160 : 120,
              alignSelf: 'center',
              zIndex: 100
            }}></Icon>
          <Icons
            onPress={() => {
              setFlag(!flag);
              setLoader(false);
            }}
            name={'reload'}
            size={60}
            color={Colors.white}
            style={{
              position: 'absolute',
              top: Platform.OS == 'ios' ? 275 : 240,
              alignSelf: 'center',
              zIndex: 100
            }}></Icons>
          {process.env.NODE_ENV == 'development' ? (
            <TouchableOpacity
              onPress={async () => {
                let batchId = 'TLTG 500955-8';
                getDriverAccount(batchId);
                await Async.setItem(Async.Item.batchId, batchId);
                dispatch(setGensetId(batchId));
                setID(batchId);
              }}>
              <Text>Scan me </Text>
            </TouchableOpacity>
          ) : null}
          <QRCodeScanner
            key={flag}
            containerStyle={qrContainer}
            topViewStyle={{ flex: 0 }}
            bottomViewStyle={{ flex: 0 }}
            cameraStyle={{
              overflow: 'hidden'
            }}
            onRead={async e => {
              if (e.data) {
                console.log('\n\n\n data frm qr::', e);
                setLoader(true);
                // props.navigation.navigate('DriverDetails', { data: e?.data });

                let str = "'genset_id': ";
                let batchId = e?.data
                  .split(str)
                  .pop()
                  .split(',' || '}')[0]
                  .replace('}', '')
                  .replaceAll("'", '');
                console.log('\n\n\n  DATA FROM QR == ', batchId);
                getDriverAccount(batchId);
                await Async.setItem(Async.Item.batchId, batchId);

                dispatch(setGensetId(batchId));
                setID(batchId);
              } else {
                FlashMessage({
                  message: 'Error',
                  description: 'Please scan valid QR code',
                  type: 'danger'
                });
              }
            }}
            flashMode={0}
          />

          <ActivityIndicator
            animating={loader}
            color={Colors.primary}
            size={80}
            style={{
              position: 'absolute',
              left: responsiveWidth(38),
              top: responsiveHeight(38)
            }}
          />
        </View>
      )}
      <ReactNativeModal
        isVisible={modalMapVisible}
        backdropOpacity={0.1}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onBackButtonPress={() => BackHandler.exitApp()}
        onBackdropPress={() => BackHandler.exitApp()}
        animationInTiming={20}
        animationOutTiming={20}>
        <View style={mainMapModalView}>
          <Text style={modalBtnText}>Location access is required ,else the app will not work. Please enable location services from the settings.</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: responsiveWidth(65),
              alignSelf: 'center',
              marginTop: responsiveHeight(3)
            }}>
            <TouchableOpacity
              style={modalMapBtn}
              onPress={() => {
                setModalMapVisible(false);
                // BackHandler.exitApp();
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
              style={[modalMapBtn, { backgroundColor: Colors.genorange }]}
              onPress={() => {
                setModalMapVisible(false);
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
      <ReactNativeModal
        isVisible={modalCamVisible}
        backdropOpacity={0.1}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onBackButtonPress={() => setModalCamVisible(false)}
        onBackdropPress={() => setModalCamVisible(false)}
        animationInTiming={20}
        animationOutTiming={20}>
        <View style={mainMapModalView}>
          <Text style={modalBtnText}>Camera access is required. Please enable Camera services from the settings.</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: responsiveWidth(65),
              alignSelf: 'center',
              marginTop: responsiveHeight(3)
            }}>
            <TouchableOpacity
              style={modalMapBtn}
              onPress={() => {
                setModalCamVisible(false);
                // BackHandler.exitApp();
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
              style={[modalMapBtn, { backgroundColor: Colors.genorange }]}
              onPress={() => {
                setModalCamVisible(false);

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
      <ReactNativeModal
        isVisible={modalPermission}
        backdropOpacity={0.1}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onBackButtonPress={() => {
          setModalPermission(false);
          setTimeout(() => {
            setModalMapVisible(true);
          }, 1000);
        }}
        onBackdropPress={() => {
          setModalPermission(false);
          setTimeout(() => {
            setModalMapVisible(true);
          }, 1000);
        }}
        animationInTiming={20}
        animationOutTiming={20}>
        <View style={mainMapModalView}>
          <Text style={[modalBtnText, { fontSize: responsiveFontSize(2) }]}>Note</Text>
          <Text style={modalBtnText}>
            Please allow the location permission as it is required for app's functionality or else,the app will not work properly.
          </Text>
          {/* <TouchableOpacity
            style={[modalMapBtn, { backgroundColor: Colors.genorange, width: responsiveWidth(70), marginTop: responsiveHeight(1) }]}
            onPress={() => {
              setModalPermission(false);
              Linking.openSettings();
              // getUserPermission();
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
          </TouchableOpacity> */}
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={driverPermission}
        backdropOpacity={0.1}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        // onBackButtonPress={() => setModalPermission(false)}
        // onBackdropPress={() => setModalPermission(false)}
        animationInTiming={20}
        animationOutTiming={20}>
        <View style={mainMapModalView}>
          <Text style={modalBtnText}>If you log in on this genset, the driver currently logged in will be logged out</Text>
          <View style={{ flexDirection: 'row', width: responsiveScreenWidth(70), alignSelf: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={[modalMapBtn, { width: responsiveWidth(30), marginTop: responsiveHeight(1) }]}
              onPress={() => {
                setDriverPermission(false);
              }}>
              <Text
                style={[
                  modalBtnText,
                  {
                    fontSize: 18,
                    color: Colors.genorange
                  }
                ]}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[modalMapBtn, { backgroundColor: Colors.genorange, width: responsiveWidth(30), marginTop: responsiveHeight(1) }]}
              onPress={async () => {
                setDriverPermission(false);

                dispatch(setDashboardDetails(driverData));
                await Async.setItem(Async.Item.dashData, driverData);
                console.log('\n\n\n\n data from add in yess btn::', driverData.driver);
                props.navigation.navigate('DriverDetails', { data: driverData });
              }}>
              <Text
                style={[
                  modalBtnText,
                  {
                    fontSize: 18,
                    color: 'white'
                  }
                ]}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </Screen>
  );
};

export default QrScan;
