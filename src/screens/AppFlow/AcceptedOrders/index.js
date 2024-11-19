import React, { useEffect, useState } from 'react';
import { Platform, Text, View, ScrollView, TouchableOpacity, Modal, FlatList, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Feather from 'react-native-vector-icons/dist/Feather';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { styles } from './style';
import moment from 'moment';
const AcceptedOrders = props => {
  const [modalvisible111, setModalVisible111] = useState(false);
  const [flag, setFlag] = useState();
  const [pricePH, setpricePH] = useState('Enter Price');
  const [price, setprice] = useState('');
  const [orderID, setOrderID] = useState('');
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
    }
  ]);
  const [items, setItems] = useState('');
  const [isloading, setIsloading] = useState(true);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1500);
  }, []);
  if (isloading == true) {
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
        <View style={styles.logout}>
          <TouchableOpacity style={styles.backimage} onPress={() => props.navigation.goBack()}>
            <Feather name={'arrow-left'} color={'black'} size={20} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: responsiveHeight(2.5),
            marginBottom: responsiveHeight(2)
          }}>
          <Text style={styles.repairTxt}>Orders</Text>
        </View>
      </View>
      <FlatList
        data={myorders}
        ListEmptyComponent={<Text style={{ alignSelf: 'center', marginTop: responsiveHeight(40) }}>No Accepted Orders</Text>}
        renderItem={({ item }) => (
          <View style={styles.mainFlatListView}>
            <TouchableOpacity
              style={styles.Modalbackground}
              activeOpacity={0.5}
              onPress={() => {
                setItems(item);
                setOrderID(item.id);
                setModalVisible111(!modalvisible111);
                console.log(item);
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
                  provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
                  style={styles.map}
                  // liteMode
                  region={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                  }}
                />
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
        onPress={() => {}}>
        <ScrollView>
          <TouchableOpacity style={styles.centeredView11} activeOpacity={1} onPress={() => setModalVisible111(false)}>
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
                    <Text style={styles.nameTxt11}>Jon Doe</Text>
                  </View>
                  <View style={styles.subInfoContainer11}>
                    <Text style={styles.namelbl11}>Geographical Position</Text>
                    <Text style={styles.nameTxt11}>City Name - 5 KM</Text>
                  </View>
                  <View style={styles.modalmapcontainer11}>
                    <MapView
                      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
                      style={styles.modalmap11}
                      region={{
                        latitude: parseFloat(items.latitude),
                        longitude: parseFloat(items.longitude),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                      }}></MapView>
                  </View>
                  <View style={styles.details11}>
                    <View>
                      <Text style={styles.jobType11}>Phone to Repair</Text>
                      <Text style={styles.reparationType11}>Reparation Type</Text>
                      <TouchableOpacity onPress={() => setFlag(!flag)}>
                        <Text style={styles.text5}>Details</Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.price11}
                      onChangeText={price => setprice(price)}
                      placeholder={pricePH}
                      keyboardType="numeric"
                      placeholderTextColor={'#949391'}
                      value={'$' + items.price}
                      onFocus={() => setpricePH('')}
                      editable={false}
                    />
                  </View>
                  {flag ? (
                    <View style={styles.detailsContainer11}>
                      <Text style={styles.detailTxt11}>{items.description}</Text>
                    </View>
                  ) : null}

                  <View style={styles.buttonContainer11}>
                    <TouchableOpacity style={styles.btnAccept11} onPress={() => setModalVisible111(false)}>
                      <Text style={styles.acceptTxt11}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};
export default AcceptedOrders;
