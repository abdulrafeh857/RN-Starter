import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import { Screen } from 'Components/Templates';
import { Header, Pusher } from 'Components/Organisms';
import useStyles from './style';
import useService from './service';
import { Colors, CardShadowLow } from 'Theme';
import * as Progress from 'react-native-progress';
import { StatsView, StatsViewSmall } from 'Components/Molecules';
import {
  responsiveHeight,
  responsiveWidth
} from 'react-native-responsive-dimensions';
import ReactNativeModal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSendLocInterval } from 'Components/Atoms';
import moment from 'moment';

import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { setWarnings } from 'Store/Redux/Warnings';
import Async from 'Store/Async';
import { useNavigation } from '@react-navigation/native';

const Dashboard = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {} = useSendLocInterval();
  const {
    timeView,
    timeViewHalf,
    halfMain,
    headText,
    timeText,
    progressText,
    topText,
    verticalLine,
    smallStatsView,
    mainModalView,
    modalBtnText,
    modalBtn,
    horizontalLine,
    flatlistStyle,
    statsView,
    dotView,
    value,
    title,
    mainModalLocView,
    locTitle,
    locAdd,
    modalLocBtn
  } = useStyles();
  const {
    status,
    formatTimeProg,
    time,
    modalVisible,
    setModalVisible,
    openDialer,
    dashboardDetailsData,

    genId,
    name,
    dashboardData,
    loader,
    warnings,
    warnModal,
    setWarnModal,
    warn,
    setWarn,
    event,
    driLoc,
    currTime,
    navigateToMap,
    locModal,
    setLocModal,
    openAppleMaps,
    address,
    setAddress,
    openWaze,
    gentStatusUpdate,
    dataFormated,
    eventModal,
    setEventModal,
    eventVal,
    setEventVal
  } = useService(props);

  const renderSmallItem = ({ item, index }) => {
    return (
      <>
        <View style={smallStatsView}>
          <StatsViewSmall
            status={item?.value}
            title={item?.description}
            color={item.indicator}
            // status={item?.value === 'ok' || item?.value === 'OK' ? true : item?.value === 'error' || item?.value === 'ERROR' ? false : null}
            image={{ uri: item?.logo }}></StatsViewSmall>
        </View>
        {/* {index == 2 || index == 5 ? null : <View style={[verticalLine, { marginLeft: -2 }]} />} */}
        {/* <View style={[verticalLine,{marginLeft:-2}]} /> */}
      </>
    );
  };
  let subArr = [];
  let arr = Object?.values(dashboardData).flat();
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i]?.description === 'Fuel' ||
      arr[i]?.description === 'Service' ||
      arr[i]?.description === 'Status' ||
      arr[i]?.description === 'Battery' ||
      arr[i]?.description === 'Motor Sensor' ||
      arr[i]?.description === 'Oil Sensor'
    ) {
      subArr.push(arr[i]);
    }
  }
  return (
    <Screen>
      <Header
        rightIcon={'lifebuoy'}
        drawer={true}
        onRightPress={() => setModalVisible(true)}
        leftIcon={'menu'}
        title={name}
        status={genId}></Header>
      <View style={{ alignSelf: 'center' }}>
        <Text style={[title, { color: Colors.text }]}>{currTime}</Text>
      </View>
      <View
        style={[
          timeView,
          {
            paddingVertical: responsiveWidth(4)
          }
        ]}>
        <View>
          <Text style={headText}>Active From</Text>
          <Text style={timeText}>
            {moment(time).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </View>
      </View>
      <View style={halfMain}>
        <View style={[timeViewHalf, { height: responsiveHeight(21) }]}>
          <Progress.Circle
            style={{
              backgroundColor: Colors.light
            }}
            thickness={6}
            showsText={true}
            formatText={formatTimeProg}
            animated={true}
            size={120}
            progress={1}
            unfilledColor={Colors.primary + '50'}
            color={
              status == 'Running'
                ? Colors.success
                : status == 'Offline'
                ? Colors.genorange
                : status == 'Error'
                ? Colors.redsoft
                : Colors.primary
            }
            borderColor={Colors.silver}
            direction={'counter-clockwise'}
            textStyle={progressText}></Progress.Circle>
        </View>
        <View style={[timeViewHalf, { height: responsiveHeight(21) }]}>
          <View
            style={{
              borderRadius: 10,
              // padding: 10,
              backgroundColor: Colors.foreground
            }}>
            <View>
              <FlatList
                numColumns={3}
                style={{
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: Colors.foreground
                }}
                data={subArr}
                renderItem={renderSmallItem}></FlatList>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          flatlistStyle,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(1.7),
            paddingVertical: responsiveHeight(1.5)
          }
        ]}>
        <TouchableOpacity
          disabled={eventVal != '' ? false : true}
          onPress={() => {
            setEventModal(true);
            // setWarn(warn);
          }}>
          <View style={[statsView, { width: responsiveWidth(25) }]}>
            <View
              style={[
                dotView,
                {
                  backgroundColor:
                    (eventVal != '' &&
                      eventVal != null &&
                      eventVal != undefined &&
                      eventVal != 'null' &&
                      eventVal != 'undefined' &&
                      event === 'WARNING') ||
                    event === 'SEVERE WARNING'
                      ? Colors.primary
                      : event === 'ERROR'
                      ? Colors.red
                      : Colors.warning
                }
              ]}></View>
            <Icon
              name={'alert-outline'}
              size={46}
              color={
                (eventVal != '' &&
                  eventVal != null &&
                  eventVal != undefined &&
                  eventVal != 'null' &&
                  eventVal != 'undefined' &&
                  event === 'WARNING') ||
                event === 'SEVERE WARNING'
                  ? Colors.primary
                  : event === 'ERROR'
                  ? Colors.red
                  : Colors.warning
              }></Icon>
            <Text
              style={[
                title,
                {
                  color:
                    (eventVal != '' &&
                      eventVal != null &&
                      eventVal != undefined &&
                      eventVal != 'null' &&
                      eventVal != 'undefined' &&
                      event === 'WARNING') ||
                    event === 'SEVERE WARNING'
                      ? Colors.primary
                      : event === 'ERROR'
                      ? Colors.red
                      : Colors.warning
                }
              ]}>
              Event
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={
            event === 'WARNING' || event === 'SEVERE WARNING' ? false : true
          }
          onPress={() => {
            setWarnModal(true);
            // setWarn(warn);
          }}>
          <View style={[statsView, { width: responsiveWidth(25) }]}>
            <View
              style={[
                dotView,
                {
                  backgroundColor:
                    event === 'WARNING' || event === 'SEVERE WARNING'
                      ? Colors.primary
                      : Colors.greyText
                }
              ]}></View>
            <Icon
              name={'alert-outline'}
              size={46}
              color={
                event === 'WARNING' || event === 'SEVERE WARNING'
                  ? Colors.primary
                  : Colors.text
              }></Icon>
            <Text
              style={[
                title,
                {
                  color:
                    event === 'WARNING' || event === 'SEVERE WARNING'
                      ? Colors.primary
                      : Colors.text
                }
              ]}>
              Warning
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={event === 'ERROR' ? false : true}
          onPress={() => {
            setWarnModal(true);
            // setWarn(warn);
          }}>
          <View style={[statsView, { width: responsiveWidth(25) }]}>
            <View
              style={[
                dotView,
                {
                  backgroundColor:
                    event === 'ERROR' ? Colors.red : Colors.greyText
                }
              ]}></View>
            <Icon
              name={'close-circle-outline'}
              size={46}
              color={event === 'ERROR' ? Colors.red : Colors.greyText}></Icon>
            <Text
              style={[
                title,
                {
                  color: event === 'ERROR' ? Colors.red : Colors.greyText
                }
              ]}>
              Error
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {Object.keys(dashboardData).length > 1 ? (
        dashboardData &&
        Object?.entries(dashboardData).map((main, index) => {
          let key = main[0];

          let arr = [];
          if (main[1]?.length > 0) {
            return (
              <View>
                <Text style={topText}>{key}</Text>
                <FlatList
                  numColumns={3}
                  style={flatlistStyle}
                  columnWrapperStyle={{
                    justifyContent: 'space-between'
                  }}
                  data={main[1]}
                  // renderItem={renderItem}
                  renderItem={({ item, index }) => {
                    return item.description === 'Warning' ||
                      item.description === 'Error' ? null : ( // </TouchableOpacity> //   </View> //       }}></StatsView> //         width: main[1].length > 2 && index == 3 && index == 4 ? responsiveWidth(25) : responsiveWidth(35) //       style={{ //       }} //             : Colors.text //             ? Colors.redsoft //           ((item?.description === 'ERROR' || item.name != 'error') && item?.description === 'Warning') || item.name != 'warning' //         color: //       titleStyle={{ //       image={{ uri: item?.logo }} //       title={item?.description} //       value={'--'} //       } //           : null //           ? false //         (item?.description === ('ERROR' || item.name != 'error') && item?.description === 'Warning') || item.name != 'warning' //       status={ //     <StatsView //     }}> //       paddingHorizontal: responsiveWidth(1.7) //       paddingVertical: responsiveHeight(1.5), //     style={{ //   <View //   }}> //     setWarn(item?.name); //     setWarnModal(true); //   onPress={() => { //   } //     (item?.description === ('ERROR' || item.name != 'error') && item?.description === 'Warning') || item.name != 'warning' ? false : true //   disabled={ // <TouchableOpacity
                      <View
                        style={{
                          paddingVertical: responsiveHeight(1.5),
                          paddingHorizontal: responsiveWidth(1.7)
                        }}>
                        <StatsView
                          name={item?.name}
                          onPress={() => {
                            console.log('\n\n\n\n pressed', item);
                            // navigateToMap(item?.value);
                            setAddress(item);
                            setLocModal(true);
                          }}
                          status={
                            item.name === 'Driver Location' ||
                            item.name === 'Genset Location'
                              ? driLoc
                              : item?.value
                          }
                          value={item?.value != null ? item?.value : '--'}
                          title={item?.description}
                          color={item?.indicator}
                          image={{ uri: item?.logo }}
                          style={{
                            width:
                              main[1].length > 2
                                ? responsiveWidth(25)
                                : responsiveWidth(35)
                          }}></StatsView>
                      </View>
                    );
                  }}></FlatList>
              </View>
            );
          }
        })
      ) : (
        <View style={{ height: responsiveHeight(40) }}>
          <Text style={topText}>No Features Available</Text>
        </View>
      )}

      {/* <TouchableOpacity
        onPress={() => {
          console.log('\n\n nc', parseFloat('n.c.'));
        }}>
        <Text>TEST</Text>
      </TouchableOpacity> */}
      <View style={{ height: 100 }}></View>
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
              openDialer();
            }}>
            <Icon
              name="phone-outgoing-outline"
              size={21}
              color={Colors.text}></Icon>
            <Text style={modalBtnText}>Call Genmark</Text>
          </TouchableOpacity>
          <View style={horizontalLine}></View>
          <TouchableOpacity
            style={modalBtn}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('ServiceLocations', {
                data: {
                  id: '0'
                },
                feature: dataFormated
              });
            }}>
            <Icon
              name="map-marker-outline"
              size={21}
              color={Colors.text}></Icon>
            <Text style={modalBtnText}>Service Locations</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        style={{
          // justifyContent: 'flex-start',
          // marginTop: responsiveWidth(20)
          alignSelf: 'center'
        }}
        isVisible={warnModal}
        backdropOpacity={0.1}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onBackButtonPress={() => setWarnModal(false)}
        onBackdropPress={() => setWarnModal(false)}
        animationInTiming={20}
        animationOutTiming={20}>
        <View style={mainModalView}>
          <View style={horizontalLine}></View>

          <Text style={modalBtnText}>{warn}</Text>
          <View style={horizontalLine}></View>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        style={{
          // justifyContent: 'flex-start',
          // marginTop: responsiveWidth(20)
          alignSelf: 'center'
        }}
        isVisible={eventModal}
        backdropOpacity={0.1}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onBackButtonPress={() => setEventModal(false)}
        onBackdropPress={() => setEventModal(false)}
        animationInTiming={20}
        animationOutTiming={20}>
        <View style={mainModalView}>
          <View style={horizontalLine}></View>

          <Text style={modalBtnText}>{eventVal}</Text>
          <View style={horizontalLine}></View>
        </View>
      </ReactNativeModal>
      <ActivityIndicator
        animating={loader || !dashboardDetailsData}
        color={Colors.primary}
        size={80}
        style={{
          position: 'absolute',
          left: responsiveWidth(38),
          top: responsiveHeight(38)
        }}
      />
      <ReactNativeModal
        // style={{
        //   // justifyContent: 'flex-end',
        //   backgroundColor: Colors.white,
        //   height: responsiveHeight(30),
        //   borderRadius: 10,
        //   alignSelf: 'center'
        //   // marginBottom: responsiveHeight(5)
        // }}
        isVisible={locModal}
        onBackButtonPress={() => setLocModal(false)}
        onBackdropPress={() => setLocModal(false)}
        animationInTiming={220}
        animationOutTiming={120}>
        <View
          style={[
            mainModalLocView,
            {
              backgroundColor: Colors.white,
              width:
                Platform.OS === 'android'
                  ? responsiveWidth(65)
                  : responsiveWidth(85)
            }
          ]}>
          <Text style={locTitle}>Open with</Text>

          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              width:
                Platform.OS === 'android'
                  ? responsiveWidth(55)
                  : responsiveWidth(75),
              alignItems: 'center',
              marginTop: responsiveHeight(1)
            }}>
            {Platform.OS === 'android' ? (
              <>
                <TouchableOpacity
                  // style={modalLocBtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    setLocModal(false);
                    openWaze(address?.value);
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
                    setLocModal(false);
                    navigateToMap(address?.value);
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
                    setLocModal(false);
                    openAppleMaps(address?.value);
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
                    setLocModal(false);
                    openWaze(address?.value);
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
                    setLocModal(false);
                    navigateToMap(address?.value);
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
    </Screen>
  );
};

export default Dashboard;
