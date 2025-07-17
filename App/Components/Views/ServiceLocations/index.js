import { FlatList, Image, Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View, BackHandler, TextInput } from 'react-native';
import React, { useRef } from 'react';
import { Header, Pusher } from 'Components/Organisms';
import useService from './service';
import useStyles from './style';
import ReactNativeModal from 'react-native-modal';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors, FontFamily } from 'Theme';
import Pin from '@Images/pin.png';
import Pins from '@Images/pin-s.png';
import Pina from '@Images/GenOpen.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FAB } from 'react-native-paper';
import { Button, FlashMessage } from 'Components/Molecules';
import { Linking } from 'react-native';
import { useSendLocInterval } from 'Components/Atoms';
import Async from 'Store/Async';
import { setIsLoggedIn } from 'Store/Redux/IsLoggedIn';
import { useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { Toast } from 'react-native-toast-notifications';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setWarnings } from 'Store/Redux/Warnings';
import { color } from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';
const ServiceLocations = props => {
  const {} = useSendLocInterval();
  const dispatch = useDispatch();
  const data = props?.route?.params?.data;
  const feature = props?.route?.params?.feature;

  console.log('\n\n\n feature from QR', feature);
  const { mainModalView, modalBtnText, modalBtn, map, fab, mainModalLocView, locTitle, locAdd, modalLocBtn, modalLocBtnText, mainMapModalView, modalMapBtn } =
    useStyles();
  const {
    modalVisible,
    setModalVisible,
    openDialer,
    mapRef,
    serviceLocations,
    setServiceLocations,
    selectedServiceLocation,
    setSelectedServiceLocation,
    modalLocationVisible,
    setModalLocationVisible,
    makeModalInVisible,
    navigateToMap,
    locData,
    setLat,
    setLon,
    openAppleMaps,
    appleModal,
    setAppleModal,
    openWaze,
    modalMapVisible,
    setModalMapVisible,
    nearLon,
    nearLat,
    name,
    genId,
    sendEmails,
    flag,
    setFlag,
    driName,
    setDriName,
    dataLocation,
    warnings,
    conEmail,
    setConEmail
  } = useService();

  const renderItem = ({ item, index }) => {
    console.log('\n\n\n item:::', item);
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[locAdd, { width: responsiveWidth(24) }]}>{item?.label}</Text>
        <Text style={locAdd}>{item?.start_time} - </Text>
        <Text style={locAdd}>{item?.end_time}</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.white}
        barStyle={Platform.select({
          ios: 'dark-content',
          android: 'dark-content'
        })}
      />
      <SafeAreaView
        style={{
          backgroundColor: Colors.white
        }}></SafeAreaView>

      <Header
        // rightIcon={'lifebuoy'}
        // onRightPress={() => setModalVisible(true)}
        title={data && data.id === '1' ? '' : name}
        status={data && data.id === '1' ? '' : genId}
        onLeftPress={async () => {
          if (data && data.id === '1') {
            props.navigation.navigate('QrScan');
            dispatch(setIsLoggedIn(false));
            await Async.setItem(Async.Item.IsLoggedIn, false);
          } else {
            props.navigation.navigate('Dashboard', { data: warnings });
            console.log('\n\n\n\n warningsss:: warnd::', warnings);
            dispatch(setWarnings(warnings));
          }
          console.log('\n\n\n pressed');
        }}></Header>
      <KeyboardAwareScrollView>
        <View>
          <MapView
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            ref={mapRef}
            style={map}
            mapType={'standard'}
            showsUserLocation={true}
            showsPointsOfInterest={true}
            showsMyLocationButton={false}
            showsCompass={true}
            showsTraffic={true}
            showsScale={true}
            loadingEnabled={false}
            scrollDuringRotateOrZoomEnabled={true}
            loadingBackgroundColor={'transparent'}
            onMapReady={() => {
              console.log('\n\n\n in map ready');
              // animateToCurrentLocation();
            }}
            region={{
              latitude: nearLat,
              longitude: nearLon,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}>
            {serviceLocations.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: parseFloat(marker?.location?.lat),
                    longitude: parseFloat(marker?.location?.lon)
                  }}
                  // pinColor={marker.flag === true ? 'green' : 'red'}
                  onPress={() => {
                    console.log('\n\n marker pressed == ', marker);
                    let arr = [...serviceLocations];
                    arr.forEach(element => {
                      element.selected = false;
                    });
                    arr[index].selected = true;
                    setLat(marker?.location?.lat);
                    setLon(marker?.location?.lon);
                    locData(marker?.location?.lat, marker?.location?.lon);
                    setSelectedServiceLocation(marker);
                    setServiceLocations(arr);
                    setModalLocationVisible(true);
                  }}>
                  <Image
                    source={marker.flag === true ? Pina : marker?.selected == true ? Pins : Pin}
                    resizeMode="contain"
                    style={{
                      height: responsiveHeight(10),
                      width: responsiveWidth(10)
                    }}></Image>
                </Marker>
              );
            })}
          </MapView>
        </View>

        {/* <Image
                source={
                  marker?.selected == true
                    ? require('@Images/pin-s.png')
                    : require('@Images/pin.png')
                }
                style={{
                  width: responsiveHeight(12),
                  height: responsiveWidth(12)
                }}
                resizeMode="contain"></Image> */}

        <ReactNativeModal
          style={{
            justifyContent: 'center',
            marginBottom: responsiveWidth(20)
          }}
          isVisible={modalLocationVisible}
          backdropOpacity={0}
          coverScreen={true}
          animationIn={'fadeInLeft'}
          animationOut={'fadeOutRight'}
          onBackButtonPress={() => makeModalInVisible()}
          onBackdropPress={() => makeModalInVisible()}
          animationInTiming={220}
          animationOutTiming={120}>
          <View style={mainModalLocView}>
            {flag === false ? (
              <>
                <View
                  style={{
                    flexDirection: 'row'
                  }}>
                  <Text
                    style={[
                      locTitle,
                      {
                        width: responsiveWidth(50)
                      }
                    ]}>
                    {selectedServiceLocation?.station_name}
                  </Text>

                  <Image
                    source={selectedServiceLocation.flag === true ? require('@Images/OPEN.png') : require('@Images/CLOSE.png')}
                    style={{
                      width: responsiveHeight(8),
                      height: responsiveWidth(8),
                      marginLeft: responsiveWidth(8)
                    }}
                    resizeMode="contain"></Image>
                </View>

                {/* <TouchableOpacity 
onPress={()=>{
 // let arr=[...selectedServiceLocation?.opening_hours]
 // for(let i=0;i<arr.length;i++){
 //   // console.log('\n\n\n\n arr iss',arr
 //   if(arr[i].label==currentDay)
 //   console.log('\n\n\n\n todays day iss::',arr[i].end_time)
 // }
}}

><Text>CHECK</Text></TouchableOpacity> */}
                <Text style={locAdd}>{selectedServiceLocation?.location?.display_name}</Text>
                <Text style={locAdd}>{selectedServiceLocation?.phone}</Text>
                <Text style={locAdd}>Status : {selectedServiceLocation?.status}</Text>

                <FlatList data={selectedServiceLocation?.opening_hours} renderItem={renderItem}></FlatList>

                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: responsiveWidth(75),
                    alignItems: 'center'
                  }}>
                  {/* <TouchableOpacity
   style={modalLocBtn}
   activeOpacity={0.8}
   onPress={() => {
     openWhatsApp();
   }}>
   <Icon name="whatsapp" size={30} color={Colors.success}></Icon>
 </TouchableOpacity> */}
                  <TouchableOpacity
                    style={modalLocBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                      makeModalInVisible();
                      openDialer(selectedServiceLocation?.phone);
                    }}>
                    <Icon name="phone" size={21} color={Colors.text}></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalLocBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                      if (Object.keys(dataLocation).length < 1) {
                        FlashMessage({
                          message: 'Error',
                          description: 'Cannot acces your location, please try again later.',
                          type: 'danger'
                        });
                      } else {
                        if (data?.id === '1') {
                          setFlag(true);
                        } else {
                          setModalLocationVisible(false);
                          setTimeout(() => {
                            setConEmail(true);
                          }, 1200);
                          // sendEmails(name, { id: '0' });
                          // makeModalInVisible();
                        }
                      }
                      console.log('\n\n\n\n currLocation?.address::', JSON.stringify(dataLocation?.display_name));

                      // openMessage(selectedServiceLocation?.phone);
                      // openDialer(selectedServiceLocation?.phone);
                    }}>
                    <Icon name="email" size={21} color={Colors.text}></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalLocBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                      setModalLocationVisible(false);
                      console.log('\n\n\n\n selectedServiceLocation?.location?.lat::', selectedServiceLocation?.location);
                      setTimeout(() => {
                        setAppleModal(true);
                      }, 800);
                      // }
                    }}>
                    <Icon name="map-marker" size={21} color={Colors.text}></Icon>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View>
                <TouchableOpacity
                  style={{
                    height: responsiveHeight(5),
                    width: responsiveWidth(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                    borderColor: Colors.forgot,
                    borderWidth: 0.1
                  }}
                  onPress={() => {
                    setFlag(false);
                    setDriName('');
                  }}>
                  <Icon name="chevron-left" size={21} color={Colors.text}></Icon>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    marginTop: responsiveHeight(2),
                    fontFamily: FontFamily.SemiBold
                  }}>
                  Enter Driver name
                </Text>
                <TextInput
                  style={{
                    width: responsiveWidth(75),
                    borderColor: Colors.forgot,
                    borderWidth: 0.4,
                    borderRadius: 5,
                    marginTop: responsiveHeight(2),
                    height: responsiveHeight(5),
                    paddingLeft: responsiveWidth(2),
                    fontSize: responsiveFontSize(2)
                  }}
                  placeholder="Enter name"
                  value={driName}
                  onChangeText={setDriName}></TextInput>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(75),
                    backgroundColor: Colors.genorange,
                    alignSelf: 'center',
                    borderRadius: 10,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: responsiveHeight(2)
                  }}
                  onPress={() => {
                    if (driName === '') {
                      FlashMessage({
                        message: 'Error',
                        description: 'Please enter driver name',
                        type: 'danger'
                      });
                    } else {
                      // console.log('\n\n\n name::',name)
                      sendEmails(driName, { id: '1' });
                      makeModalInVisible();
                    }
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: FontFamily.SemiBold,
                      color: Colors.foreground
                    }}>
                    Send Email
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ReactNativeModal>
        <ReactNativeModal
          style={{
            justifyContent: 'flex-end'
            // marginBottom: responsiveHeight(5)
          }}
          isVisible={appleModal}
          backdropOpacity={0}
          coverScreen={true}
          animationIn={'fadeInLeft'}
          animationOut={'fadeOutRight'}
          onBackButtonPress={() => setAppleModal(false)}
          onBackdropPress={() => setAppleModal(false)}
          animationInTiming={220}
          animationOutTiming={120}>
          <View
            style={[
              mainModalLocView,
              {
                width: Platform.OS === 'android' ? responsiveWidth(65) : responsiveWidth(85)
              }
            ]}>
            <Text style={locTitle}>Open with</Text>

            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: Platform.OS === 'android' ? responsiveWidth(55) : responsiveWidth(75),
                alignItems: 'center',
                marginTop: responsiveHeight(1)
              }}>
              {Platform.OS === 'android' ? (
                <>
                  <TouchableOpacity
                    // style={modalLocBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                      setAppleModal(false);
                      openWaze();
                      // openDialer(selectedServiceLocation?.phone);
                    }}>
                    <View>
                      <Image
                        source={require('@Images/logoWaze.png')}
                        style={{
                          width: responsiveHeight(12),
                          height: responsiveWidth(12)
                        }}
                        resizeMode="contain"></Image>
                      <Text
                        style={[
                          locAdd,
                          {
                            marginTop: responsiveHeight(1),
                            alignSelf: 'center'
                          }
                        ]}>
                        Waze
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // style={modalLocBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                      // console.log('\n\n\n\n lats to google::',`${selectedServiceLocation?.lat},${selectedServiceLocation?.lng}`)
                      setAppleModal(false);
                      navigateToMap();
                    }}>
                    <View>
                      <Image
                        source={require('@Images/logoGoogle.png')}
                        style={{
                          width: responsiveHeight(12),
                          height: responsiveWidth(12)
                        }}
                        resizeMode="contain"></Image>
                      <Text
                        style={[
                          locAdd,
                          {
                            marginTop: responsiveHeight(1),
                            alignSelf: 'center'
                          }
                        ]}>
                        Google Maps
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    // style={modalLocBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                      setAppleModal(false);
                      openAppleMaps();
                    }}>
                    <View>
                      <Image
                        source={require('@Images/logoApple.png')}
                        style={{
                          width: responsiveHeight(12),
                          height: responsiveWidth(12)
                        }}
                        resizeMode="contain"></Image>
                      <Text
                        style={[
                          locAdd,
                          {
                            marginTop: responsiveHeight(1),
                            alignSelf: 'center'
                          }
                        ]}>
                        Apple Maps
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // style={modalLocBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                      setAppleModal(false);
                      openWaze();
                      // openDialer(selectedServiceLocation?.phone);
                    }}>
                    <View>
                      <Image
                        source={require('@Images/logoWaze.png')}
                        style={{
                          width: responsiveHeight(12),
                          height: responsiveWidth(12)
                        }}
                        resizeMode="contain"></Image>
                      <Text
                        style={[
                          locAdd,
                          {
                            marginTop: responsiveHeight(1),
                            alignSelf: 'center'
                          }
                        ]}>
                        Waze
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // style={modalLocBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                      // console.log('\n\n\n\n lats to google::',`${selectedServiceLocation?.lat},${selectedServiceLocation?.lng}`)
                      setAppleModal(false);
                      navigateToMap();
                    }}>
                    <View>
                      <Image
                        source={require('@Images/logoGoogle.png')}
                        style={{
                          width: responsiveHeight(12),
                          height: responsiveWidth(12)
                        }}
                        resizeMode="contain"></Image>
                      <Text
                        style={[
                          locAdd,
                          {
                            marginTop: responsiveHeight(1),
                            alignSelf: 'center'
                          }
                        ]}>
                        Google Maps
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ReactNativeModal>
        <ReactNativeModal
          style={{
            justifyContent: 'flex-start',
            marginTop: responsiveWidth(20)
          }}
          isVisible={modalVisible}
          backdropOpacity={0.1}
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          animationInTiming={20}
          animationOutTiming={20}>
          <View style={mainModalView}>
            <TouchableOpacity
              style={modalBtn}
              onPress={() => {
                setModalVisible(false);

                openDialer();
              }}>
              <Icon name="phone-outgoing-outline" size={21} color={Colors.text}></Icon>
              <Text style={modalBtnText}>Call Genmark</Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
        <ReactNativeModal
          isVisible={modalMapVisible}
          backdropOpacity={0.1}
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          onBackButtonPress={() => setModalMapVisible(false)}
          onBackdropPress={() => setModalMapVisible(false)}
          animationInTiming={20}
          animationOutTiming={20}>
          <View style={mainMapModalView}>
            <Text style={modalBtnText}>
              Location access is required for the app's functionality,else the app will not work. Please enable location services from the settings.
            </Text>
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
                style={[modalMapBtn, { backgroundColor: Colors.genorange }]}
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
        <ReactNativeModal
          isVisible={conEmail}
          backdropOpacity={0.1}
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          // onBackButtonPress={() => setModalPermission(false)}
          // onBackdropPress={() => setModalPermission(false)}
          animationInTiming={20}
          animationOutTiming={20}>
          <View style={mainMapModalView}>
            <Text style={modalBtnText}>Are you sure you want to send email to {selectedServiceLocation?.station_name}</Text>
            <View style={{ flexDirection: 'row', width: responsiveScreenWidth(70), alignSelf: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={[modalMapBtn, { width: responsiveWidth(30), marginTop: responsiveHeight(1) }]}
                onPress={() => {
                  setConEmail(false);
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
                  sendEmails(name, { id: '0' }, feature);
                  setConEmail(false);
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
      </KeyboardAwareScrollView>
      {/* <ActivityIndicator animating={loader} color={Colors.primary} size={80} style={{position:'absolute',left:responsiveWidth(38),top:responsiveHeight(38)}}/> */}
    </>
  );
};

export default ServiceLocations;
