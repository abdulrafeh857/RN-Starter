import React from 'react';
import useService from './service';
import useStyles from './styles';
import { Screen } from '@Templates';
import { Header } from 'Components/Organisms';
import { BackHandler, Linking, Text, TextInput, View } from 'react-native';
import { Button, FlashMessage, TInput } from 'Components/Molecules';
import { Colors } from 'Theme';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import ReactNativeModal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const Splash = props => {
  const IsLoggedIn = useSelector(state => state.IsLoggedIn?.data);
  console.log('\n\n\n IsLoggedIn', IsLoggedIn);
  const {
    driverName,
    setDriverName,
    companyName,
    setCompanyName,
    data,
    driverData,
    setDriverData,
    loaderBtn,
    setLoaderBtn,
    modalVisible,
    setModalVisible,
    getUserPermission,
    phone,
    setPhone
  } = useService(props);
  const { text, mainModalView, modalBtn, modalBtnText } = useStyles();

  return (
    <Screen>
      <Header leftIcon={'close'} title={'Details'}></Header>

      <Text style={text}>Please provide below details</Text>
      {/* <TextInput
        style={{
          width: responsiveWidth(80),
          backgroundColor: 'red'
        }}
        value={driverName}
        onChangeText={setDriverName}></TextInput> */}
      <TInput
        placeholder="Driver Name"
        leftIcon={'account-tie-outline'}
        rightIcon={driverName && 'close'}
        onRightPress={() => setDriverName('')}
        value={driverName}
        onChangeText={setDriverName}></TInput>
      <TInput
        placeholder="Phone Number"
        keyboardType="numeric"
        leftIcon={'account-tie-outline'}
        rightIcon={phone && 'close'}
        onRightPress={() => setPhone('')}
        value={phone}
        onChangeText={setPhone}></TInput>

      <TInput editable={false} placeholder="Company Name" leftIcon={'office-building'} value={data?.customer?.company} onChangeText={setCompanyName}></TInput>
      <View
        style={{
          width: '100%',
          height: 980,
          backgroundColor: Colors.transparent
        }}></View>
      <Button
        icon={'arrow-right'}
        // disabled={loaderBtn}
        onPress={() => {
          if (driverName === '' || phone === '') {
            // Toast.show('Please enter driver name and phone number first');
            FlashMessage({
              message: 'Error',
              description: 'Please enter driver name and phone number first',
              type: 'danger'
            });
          } else {
            props.navigation.navigate('DeviceDetails', {
              data: data,
              name: driverName,
              phone: phone
            });
          }
        }}>
        <Text>Continue</Text>
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
