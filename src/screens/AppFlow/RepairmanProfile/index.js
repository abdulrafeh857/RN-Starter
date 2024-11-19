import React, { useEffect, useState } from 'react';
import { Platform, Text, View, ScrollView, TouchableOpacity, Modal, FlatList, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as geolib from 'geolib';
import { styles } from './style';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { MyComponent } from '../../../components/Notification/index.js';

const RepairmanProfile = props => {
  const [modalvisible111, setModalVisible111] = useState(false);
  const [flag, setFlag] = useState();
  const [pricePH, setpricePH] = useState('Enter Price');
  const [price, setprice] = useState('');
  const [fcmtoken, setFcmtoken] = useState('');
  const [RepairmanFirstName, setRepairmanFirstName] = useState('Repair');
  const [RepairmanLastName, setRepairmanLastName] = useState('man');
  const [orderID, setOrderID] = useState('1');
  const [RepairmanID, setRepairmanID] = useState('1');
  const [myorders, setMyorders] = useState([
    {
      id: '1',
      CustomerName: 'John Doe',
      latitude: '33.6844',
      longitude: '73.0479',
      reparation: 'Screen Repair',
      description: 'Screen is broken',
      price: '100',
      phoneMake: 'Samsung',
      phoneModel: 'S20',
      creationDate: '2021-07-29T10:00:00.000Z'
    },
    {
      id: '2',
      CustomerName: 'Jane Doe',
      latitude: '33.6844',
      longitude: '73.0479',
      reparation: 'Battery Replacement',
      description: 'Battery is not working',
      price: '50',
      phoneMake: 'Apple',
      phoneModel: 'Iphone 12',
      creationDate: '2021-07-29T10:00:00.000Z'
    },
    {
      id: '3',
      CustomerName: 'John Doe',
      latitude: '33.6844',
      longitude: '73.0479',
      reparation: 'Charging Port Repair',
      description: 'Charging port is not working',
      price: '30',
      phoneMake: 'Apple',
      phoneModel: 'Iphone 12',
      creationDate: '2021-07-29T10:00:00.000Z'
    },
    {
      id: '4',
      CustomerName: 'Jane Doe',
      latitude: '33.6844',
      longitude: '73.0479',
      reparation: 'Board Repair',
      description: 'Phone is not turning on',
      price: '250',
      phoneMake: 'Infinix',
      phoneModel: 'Note 10 Pro',
      creationDate: '2021-07-29T10:00:00.000Z'
    },
    {
      id: '5',
      CustomerName: 'John Doe',
      latitude: '33.6844',
      longitude: '73.0479',
      reparation: 'Speaker Repair',
      description: 'Speaker is not working',
      price: '60',
      phoneMake: 'Vivo',
      phoneModel: 'V21',
      creationDate: '2021-07-29T10:00:00.000Z'
    }
  ]);
  const [items, setItems] = useState('');
  const [isloading, setIsloading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [distance, setDistance] = useState(null);
  const [notify, setNotify] = useState(false);
  const [newOrderModal, setNewOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState([]);
  const [newOrderDistance, setNewOrderDistance] = useState(0);
  const [allOrderslength, setAllOrdersLength] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1500);
  }, []);
  if (isloading) {
    return (
      <View>
        <ActivityIndicator
          size={'large'}
          color={'blue'}
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: responsiveHeight(50)
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} translucent={false} />
      <View style={styles.row}>
        <View
          style={{
            marginTop: responsiveHeight(2.5),
            marginBottom: responsiveHeight(2)
          }}>
          <Text style={styles.repairTxt}>Repairs</Text>
        </View>
      </View>
      <FlatList
        // initialNumToRender={4}
        data={myorders}
        ListEmptyComponent={<Text style={{ alignSelf: 'center', marginTop: responsiveHeight(40) }}>No Orders NearBy You</Text>}
        renderItem={({ item }) => (
          <View style={styles.mainFlatListView}>
            <TouchableOpacity
              style={styles.Modalbackground}
              activeOpacity={0.5}
              onPress={async () => {
                setItems(item);
                setOrderID(item.id);
                setModalVisible111(!modalvisible111);
                const RMlocation = await AsyncStorage.getItem('location');
                setDistance(
                  geolib.getDistance(
                    {
                      latitude: parseFloat(item.latitude),
                      longitude: parseFloat(item.longitude)
                    },
                    {
                      latitude: JSON.parse(RMlocation).latitude,
                      longitude: JSON.parse(RMlocation).longitude
                    }
                  ) / 1000
                );
              }}>
              <View style={styles.Modalheader}>
                <Text style={styles.dateTxt}>{moment(item.creationDate).format('DD-MM-YYYY')}</Text>
                <Text style={styles.priceTxt}>
                  {' '}
                  {'Price: $'}
                  {item.price}
                </Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.titletext}>{item.reparation}</Text>
              </View>
              <View style={styles.subtitle}>
                <Text style={styles.subtitletext}>{item.description}</Text>
              </View>
              <View style={styles.mapcontainer}>
                <MapView
                  scrollEnabled={false}
                  provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
                  style={styles.map}
                  // liteMode
                  region={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                  }}>
                  <Marker
                    coordinate={{
                      latitude: parseFloat(item.latitude),
                      longitude: parseFloat(item.longitude)
                    }}>
                    <Icon type={'ionicon'} name={'location'} color={'blue'} size={responsiveFontSize(3)} />
                  </Marker>
                </MapView>
              </View>
              {/* PriceModal */}
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        // animationType="slide"
        transparent={true}
        visible={modalvisible111}
        onPress={() => {
          //setModalVisible(!modalVisible);
        }}>
        <ScrollView>
          <View
            style={styles.centeredView11}
            activeOpacity={1}
            // onPress={() => setModalVisible111(false)}
          >
            <View
              style={[
                styles.modalView,
                {
                  height: flag ? responsiveHeight(86) : responsiveHeight(79)
                }
              ]}>
              <TouchableOpacity activeOpacity={1}>
                <View style={styles.container211}>
                  <View style={styles.infoContainer11}>
                    <Text style={styles.namelbl11}>Customer Name</Text>
                    <Text style={styles.nameTxt11}>{items.CustomerName}</Text>
                  </View>
                  <View style={styles.subInfoContainer11}>
                    <Text style={styles.namelbl11}>Geographical Position</Text>
                    <Text style={styles.nameTxt11}>City Name - {distance} KM</Text>
                  </View>
                  <View style={styles.modalmapcontainer11}>
                    <MapView
                      scrollEnabled={false}
                      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
                      style={styles.modalmap11}
                      region={{
                        latitude: parseFloat(items.latitude),
                        longitude: parseFloat(items.longitude),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                      }}>
                      <Marker
                        coordinate={{
                          latitude: parseFloat(items.latitude),
                          longitude: parseFloat(items.longitude)
                        }}>
                        <Icon type={'ionicon'} name={'location'} color={'blue'} size={responsiveFontSize(3)} />
                      </Marker>
                    </MapView>
                  </View>
                  <View style={styles.details11}>
                    <View>
                      <Text style={styles.jobType11}>
                        {items.phoneMake} {items.phoneModel}
                      </Text>
                      <Text style={styles.reparationType11}>{items.reparation}</Text>
                      <TouchableOpacity onPress={() => setFlag(!flag)}>
                        <Text style={styles.text5}>Details</Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.price11}
                      onChangeText={val => setprice(val)}
                      placeholder={'Enter Price'}
                      keyboardType="numeric"
                      placeholderTextColor={'#949391'}
                      value={price}
                      //   onFocus={() => setpricePH('')}
                    />
                  </View>
                  {flag ? (
                    <View style={styles.detailsContainer11}>
                      <Text style={styles.detailTxt11}>{items.description}</Text>
                    </View>
                  ) : null}

                  <View style={styles.buttonContainer11}>
                    <TouchableOpacity
                      style={styles.btnRefuse11}
                      onPress={() => {
                        setModalVisible111(false);
                        setprice('');
                        setAllOrdersLength(myorders.length);

                        // notification();
                      }}>
                      <Text style={styles.refuseTxt11}>Refuse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnAccept11}
                      onPress={() => {
                        setLoader(true);
                        setAllOrdersLength(myorders.length);
                      }}>
                      {loader ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.acceptTxt11}>Accept</Text>}
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
      {/* NewOrder modal */}
      <Modal
        transparent={true}
        visible={newOrderModal}
        onPress={() => {
          //setModalVisible(!modalVisible);
        }}>
        <ScrollView>
          <View
            style={styles.centeredView11}
            activeOpacity={1}
            // onPress={() => setNewOrderModal(false)}
          >
            <View
              style={[
                styles.modalView,
                {
                  height: flag ? responsiveHeight(86) : responsiveHeight(79)
                }
              ]}>
              <TouchableOpacity activeOpacity={1}>
                <View style={styles.container211}>
                  <View style={styles.infoContainer11}>
                    <Text style={styles.namelbl11}>Customer Name</Text>
                    <Text style={styles.nameTxt11}>{newOrder.CustomerName}</Text>
                  </View>
                  <View style={styles.subInfoContainer11}>
                    <Text style={styles.namelbl11}>Geographical Position</Text>
                    <Text style={styles.nameTxt11}>City Name - {newOrderDistance} KM</Text>
                  </View>
                  <View style={styles.modalmapcontainer11}>
                    <MapView
                      scrollEnabled={false}
                      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
                      style={styles.modalmap11}
                      region={{
                        latitude: parseFloat(newOrder.latitude),
                        longitude: parseFloat(newOrder.longitude),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                      }}>
                      <Marker
                        coordinate={{
                          latitude: parseFloat(newOrder.latitude),
                          longitude: parseFloat(newOrder.longitude)
                        }}>
                        <Icon type={'ionicon'} name={'location'} color={'blue'} size={responsiveFontSize(3)} />
                      </Marker>
                    </MapView>
                  </View>
                  <View style={styles.details11}>
                    <View>
                      <Text style={styles.jobType11}>
                        {newOrder.phoneMake} {newOrder.phoneModel}
                      </Text>
                      <Text style={styles.reparationType11}>{newOrder.reparation}</Text>
                      <TouchableOpacity onPress={() => setFlag(!flag)}>
                        <Text style={styles.text5}>Details</Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.price11}
                      onChangeText={val => setprice(val)}
                      placeholder={'Enter Price'}
                      keyboardType="numeric"
                      placeholderTextColor={'#949391'}
                      value={price}
                      onFocus={() => setpricePH('')}
                    />
                  </View>
                  {flag ? (
                    <View style={styles.detailsContainer11}>
                      <Text style={styles.detailTxt11}>{newOrder.description}</Text>
                    </View>
                  ) : null}

                  <View style={styles.buttonContainer11}>
                    <TouchableOpacity
                      style={styles.btnRefuse11}
                      onPress={() => {
                        setNewOrderModal(false);
                        setprice('');
                        setAllOrdersLength(myorders.length);
                        // notification();
                      }}>
                      <Text style={styles.refuseTxt11}>Refuse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnAccept11}
                      onPress={() => {
                        setOrderID(newOrder.id);
                        setItems(newOrder);
                        setLoader(true);
                        setAllOrdersLength(myorders.length);
                        // setTimeout(() => {
                        //   setNotify(false);
                        // }, 3000);
                      }}>
                      {loader ? <ActivityIndicator size={'small'} color={'white'} /> : <Text style={styles.acceptTxt11}>Accept</Text>}
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
      {notify ? (
        <MyComponent
          text={'New Order For You'}
          onPress={() => {
            setNewOrderModal(true);
            setItems(newOrder);
            setOrderID(newOrder.id);
          }}
        />
      ) : null}
    </View>
  );
};
export default RepairmanProfile;
