import React, { useState, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, TextInput, StatusBar, ScrollView, ActivityIndicator, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-simple-toast';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { styles } from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RepairmanSearch = props => {
  const [optionPH, setoptionPH] = useState('Enter Description...');
  const [makepick, setMakepick] = useState('');
  const [makepickOpen, setMakepickOpen] = useState(false);
  const [modelpick, setModelpick] = useState('');
  const [modelpickOpen, setModelpickOpen] = useState(false);
  const [colorpick, setColorpick] = useState('');
  const [colorpickOpen, setColorpickOpen] = useState(false);
  const [repairpick, setRepairpick] = useState('');
  const [repairpickOpen, setRepairpickOpen] = useState(false);
  const [items, setitems] = useState('');
  const [modalvisible, setmodalvisible] = useState(false);
  const [modalvisible111, setModalVisible111] = useState(false);
  const [location, setLocation] = useState();
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [pricePH, setpricePH] = useState('Enter Price');
  const [price, setprice] = useState('');
  const [flag, setFlag] = useState();
  const [description, setDescription] = useState();
  const [loading, isLoading] = useState(false);
  const [UserID, setuserID] = useState('');
  const [notifyListener, setNotifyListener] = useState(null);
  useEffect(() => {
    fetchData();
  }, [lat, long, UserID]);
  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('location');
      setLocation(jsonValue);
      console.log(JSON.parse(jsonValue), 'These are cordinates');
      setLong(JSON.parse(jsonValue).longitude);
      console.log(JSON.parse(jsonValue).longitude, 'This is longitude');
      setLat(JSON.parse(jsonValue).latitude);
      console.log(JSON.parse(jsonValue).latitude, 'This is latitude');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} translucent={false} />
      <View style={styles.mapcontainer}>
        <MapView
          showsCompass={true}
          showsMyLocationButton={true}
          showsTraffic={true}
          showsUserLocation={true}
          rotateEnabled={true}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google Maps
          style={styles.maps}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        />
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            top: '50%',
            width: '80%',
            justifyContent: 'center',
            alignSelf: 'center'
          }}>
          <View style={styles.inputtextview}>
            <TouchableOpacity
              onPress={() => {
                setmodalvisible(!modalvisible);
                // fetchData();
                // getUserID;
              }}
              style={styles.textinput}>
              <Text style={styles.tt1}>What do you want to repair?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
              <FontAwesome5 name={'user-tie'} color={'black'} size={30} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* OtherModal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalvisible}
        onPress={() => {
          setmodalvisible(!modalvisible);
        }}>
        <ScrollView>
          <View
            style={styles.centeredView}
            activeOpacity={1}
            // onPress={() => setmodalvisible(false)}
          >
            <View style={styles.modalView}>
              <TouchableOpacity activeOpacity={1}>
                <View>
                  <View style={{ marginTop: responsiveHeight(2.5) }}>
                    <DropDownPicker
                      listMode="MODAL"
                      searchContainerStyle={{
                        height: responsiveHeight(7),
                        width: responsiveWidth(100),
                        alignSelf: 'center'
                      }}
                      searchPlaceholder="Search..."
                      searchable={true}
                      searchPlaceholderTextColor="grey"
                      zIndex={8000}
                      zIndexInverse={2000}
                      onOpen={() => setMakepick('')}
                      onClose={() => {
                        if (makepick == null) {
                          setMakepick('Select atleast one');
                        }
                      }}
                      items={[
                        { label: 'Plumber', value: 'Plumber' },
                        { label: 'Electrician', value: 'Electrician' },
                        { label: 'Carpenter', value: 'Carpenter' },
                        { label: 'Painter', value: 'Painter' },
                        { label: 'Mechanic', value: 'Mechanic' },
                        { label: 'AC Technician', value: 'AC Technician' },
                        { label: 'Mobile Technician', value: 'Mobile Technician' },
                        { label: 'Laptop Technician', value: 'Laptop Technician' }
                      ]}
                      containerStyle={{
                        height: responsiveHeight(7),
                        width: responsiveWidth(80),
                        alignSelf: 'center'
                      }}
                      placeholder={'Select Service'}
                      style={{
                        borderTopLeftRadius: responsiveWidth(2),
                        borderTopRightRadius: responsiveWidth(2),
                        borderBottomLeftRadius: responsiveWidth(2),
                        borderBottomRightRadius: responsiveWidth(2),
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderColor: '#535edc'
                      }}
                      itemStyle={{
                        justifyContent: 'flex-start'
                      }}
                      labelStyle={{
                        marginLeft: responsiveWidth(1),
                        backgroundColor: '#fff'
                      }}
                      value={items}
                      setValue={setitems}
                      open={makepickOpen}
                      setOpen={setMakepickOpen}
                      arrowColor={'black'}
                      dropDownStyle={{
                        backgroundColor: '#fff',
                        borderWidth: responsiveWidth(1)
                      }}
                      onChangeItem={item => {
                        console.log(item.value, 'This is item value');
                        setMakepick(item.value);
                      }}
                    />
                    {/* <DropDownPicker
                      listMode="MODAL"
                      searchContainerStyle={{
                        height: responsiveHeight(7),
                        width: responsiveWidth(100),
                        alignSelf: 'center'
                      }}
                      searchPlaceholder="Search..."
                      searchable={true}
                      searchPlaceholderTextColor="grey"
                      zIndex={6000}
                      zIndexInverse={4000}
                      onOpen={() => setModelpick('')}
                      onClose={() => {
                        if (modelpick == null) {
                          setModelpick('Select atleast one');
                        }
                      }}
                      items={[
                

                      ]}
                      containerStyle={{
                        height: responsiveHeight(7),
                        width: responsiveWidth(80),
                        alignSelf: 'center',
                        marginTop: responsiveHeight(2.5)
                      }}
                      placeholder={'Phone Model'}
                      style={{
                        borderTopLeftRadius: responsiveWidth(2),
                        borderTopRightRadius: responsiveWidth(2),
                        borderBottomLeftRadius: responsiveWidth(2),
                        borderBottomRightRadius: responsiveWidth(2),
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderColor: '#535edc'
                      }}
                      itemStyle={{
                        justifyContent: 'flex-start'
                      }}
                      labelStyle={{
                        marginLeft: responsiveWidth(1),
                        backgroundColor: '#fff'
                        // borderBottomWidth: responsiveWidth(0.5),
                      }}
                      value={items}
                      open={modelpickOpen}
                      setOpen={setModelpickOpen}
                      arrowColor={'black'}
                      dropDownStyle={{
                        backgroundColor: '#fff',
                        borderWidth: responsiveWidth(1)
                      }}
                      onChangeItem={item => {
                        setModelpick(item.value);
                        setitems(item.value);
                      }}
                    />
                    <DropDownPicker
                      listMode="MODAL"
                      searchContainerStyle={{
                        height: responsiveHeight(7),
                        width: responsiveWidth(100),
                        alignSelf: 'center'
                      }}
                      searchPlaceholder="Search..."
                      searchable={true}
                      searchPlaceholderTextColor="grey"
                      zIndex={4000}
                      zIndexInverse={6000}
                      onOpen={() => setColorpick('')}
                      onClose={() => {
                        if (colorpick == null) {
                          setColorpick('Select atleast one');
                        }
                      }}
                      items={[
                        { label: 'Black', value: 'Black' },
                        { label: 'Red', value: 'Red' },
                        { label: 'White', value: 'White' },
                        { label: 'Blue', value: 'Blue' }
                      ]}
                      containerStyle={{
                        height: responsiveHeight(7),
                        width: responsiveWidth(80),
                        alignSelf: 'center',
                        marginTop: responsiveHeight(2.5)
                      }}
                      placeholder={'Phone Color'}
                      style={{
                        borderTopLeftRadius: responsiveWidth(2),
                        borderTopRightRadius: responsiveWidth(2),
                        borderBottomLeftRadius: responsiveWidth(2),
                        borderBottomRightRadius: responsiveWidth(2),
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderColor: '#535edc'
                      }}
                      itemStyle={{
                        justifyContent: 'flex-start'
                      }}
                      labelStyle={{
                        marginLeft: responsiveWidth(1),
                        backgroundColor: '#fff'
                      }}
                      value={items}
                      open={colorpickOpen}
                      setOpen={setColorpickOpen}
                      arrowColor={'black'}
                      dropDownStyle={{
                        backgroundColor: '#fff',
                        borderWidth: responsiveWidth(1)
                      }}
                      onChangeItem={item => {
                        setColorpick(item.value);
                        setitems(item.value);
                      }}
                    />
                    <DropDownPicker
                      listMode="MODAL"
                      searchContainerStyle={{
                        height: responsiveHeight(7),
                        width: responsiveWidth(100),
                        alignSelf: 'center'
                      }}
                      searchPlaceholder="Search..."
                      searchable={true}
                      searchPlaceholderTextColor="grey"
                      zIndex={2000}
                      zIndexInverse={8000}
                      onOpen={() => setRepairpick('')}
                      onClose={() => {
                        if (repairpick == null) {
                          setRepairpick('Select atleast one');
                        }
                      }}
                      items={[
                        { label: 'Repair', value: 'Repair' },
                        { label: 'Screen Replace', value: 'ScreenReplace' }
                      ]}
                      placeholder={'Reparation Type'}
                      containerStyle={{
                        height: responsiveHeight(7),
                        width: responsiveWidth(80),
                        alignSelf: 'center',
                        marginTop: responsiveHeight(2.5)
                      }}
                      style={{
                        borderTopLeftRadius: responsiveWidth(2),
                        borderTopRightRadius: responsiveWidth(2),
                        borderBottomLeftRadius: responsiveWidth(2),
                        borderBottomRightRadius: responsiveWidth(2),
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderColor: '#535edc'
                      }}
                      itemStyle={{
                        justifyContent: 'flex-start'
                      }}
                      labelStyle={{
                        marginLeft: responsiveWidth(1),
                        backgroundColor: '#fff'
                      }}
                      value={items}
                      open={repairpickOpen}
                      setOpen={setRepairpickOpen}
                      arrowColor={'black'}
                      dropDownStyle={{
                        backgroundColor: '#fff',
                        borderWidth: responsiveWidth(1)
                      }}
                      onChangeItem={item => {
                        setRepairpick(item.value);
                        setitems(item.value);
                      }}
                    /> */}
                  </View>
                  {/* <View style={styles.priceview}>
                    <TextInput
                      maxLength={10}
                      style={{
                        paddingHorizontal: responsiveWidth(3),
                        justifyContent: 'center',
                        color: 'black',
                      }}
                      placeholder={pricePH}
                      keyboardType="numeric"
                      onChangeText={price => setprice(price)}
                      placeholderTextColor="darkgrey"
                      onFocus={() => setpricePH('')}
                    />
                  </View> */}
                  <View style={styles.optionsView}>
                    <View style={styles.optionsTxtInput}>
                      <TextInput
                        multiline={true}
                        numberOfLines={5}
                        style={{
                          textAlignVertical: 'top',
                          paddingVertical: responsiveHeight(2),
                          paddingHorizontal: responsiveHeight(2),
                          color: 'black'
                        }}
                        placeholder={optionPH}
                        onChangeText={description => setDescription(description)}
                        placeholderTextColor="darkgrey"
                        onFocus={() => setoptionPH('')}
                      />
                    </View>
                  </View>
                  <View style={styles.modalBtnView}>
                    <TouchableOpacity style={styles.modalBtn} onPress={() => setmodalvisible(false)}>
                      <Text style={styles.btnTxt}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalBtnColored}
                      onPress={() => {
                        isLoading(true);
                        setTimeout(() => {
                          isLoading(false);
                          setmodalvisible(false);
                          setModalVisible111(false);
                          Toast.show('Request Sent Successfully', Toast.LONG);
                        }, 2000);
                      }}>
                      {loading ? <ActivityIndicator size={20} color={'white'} /> : <Text style={styles.btnTxtWhite}>Send</Text>}
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};
export default RepairmanSearch;
