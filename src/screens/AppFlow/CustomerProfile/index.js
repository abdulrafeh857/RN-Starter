import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StatusBar, TextInput, View, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Micons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating-new';
import Toast from 'react-native-simple-toast';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = props => {
  const [firstnamePH, setfirstnamePH] = useState('John');
  const [surnamePH, setsurnamePH] = useState('Doe');
  const [emailPH, setemailPH] = useState('customerr@test.com');
  const [phonePH, setphonePH] = useState('Phone Number');
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setitems] = useState('');
  const [rating, setRating] = useState();
  const [starCount, setStarCount] = useState(5);
  const [firstname, setfirstname] = useState('');
  const [firstnameerror, setfirstnameerror] = useState('');
  const [surname, setsurname] = useState('');
  const [surnameerror, setsurnameerror] = useState('');
  const [email, setemail] = useState('customer@test.com');
  const [emailerror, setemailerror] = useState('');
  const [Phonenumber, setphonenumber] = useState('123456789');
  const [Phonenumbererror, setphonenumbererror] = useState('');
  const [ProfileImage, setProfileImage] = useState();
  const [userDetails, setuserDetails] = useState();
  const [isloading, setisLoading] = useState(true);
  const [givenname, setGivenname] = useState('');
  const [familyname, setFamilyname] = useState('');
  const [fixedemail, setFixedemail] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }, []);
  const _onLogout = () => {
    props.navigation.navigate('Welcome');
    AsyncStorage.removeItem('user');
  };
  if (isloading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size={'large'} color="blue" />
      </View>
    );
  }

  const saveOption = () => {
    setisLoading(true);
    setTimeout(() => {
      Toast.show('Profile Saved Successfully', Toast.SHORT);
      setisLoading(false);
      props.navigation.goBack();
    }, 1500);
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} translucent={false} />

      <View>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backbutton}>
          <Micons name={'arrow-left'} color={'black'} size={25} />
        </TouchableOpacity>
        <View style={styles.firstview}>
          <View style={styles.imageview}>
            {ProfileImage ? (
              <ImageBackground style={styles.image} source={{ uri: ProfileImage }} imageStyle={{ borderRadius: responsiveWidth(10) }}>
                <TouchableOpacity style={styles.addicon} onPress={() => {}}>
                  <Micons name={'plus'} color={'#535edc'} size={18} />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                style={styles.image}
                source={require('../../../assets/images/image2.jpg')}
                imageStyle={{
                  borderRadius: responsiveWidth(10)
                }}>
                <TouchableOpacity
                  style={styles.addicon}
                  onPress={() => {
                    // SelectProfileImage();
                  }}>
                  <Micons name={'plus'} color={'#535edc'} size={18} />
                </TouchableOpacity>
              </ImageBackground>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: responsiveWidth(8)
            }}>
            <StarRating disabled={false} maxStars={5} rating={starCount} selectedStar={rating} style={{}} fullStarColor={'#e5d100'} starSize={16} />
            <View
              style={{
                marginLeft: responsiveWidth(3),
                justifyContent: 'center'
              }}>
              <Text style={{ fontSize: 12 }}>5.0 Rating</Text>
            </View>
          </View>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.nameTxt}>
            {givenname} {familyname}
          </Text>
          <Text style={styles.emailTxt}>{fixedemail}</Text>
        </View>
        <View style={styles.hairline} />
        <View style={{ marginTop: responsiveHeight(2) }}>
          <View style={styles.txtInputView}>
            <TextInput
              placeholder={firstnamePH}
              style={styles.textinput}
              placeholderTextColor="black"
              onChangeText={firstname => setfirstname(firstname)}
              value={firstname}
              onFocus={() => setfirstnamePH('')}
              onBlur={() => (firstname === '' ? setfirstnamePH('First Name') : null)}
            />
          </View>
          {!firstnameerror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{firstnameerror}</Text>}
          <View style={styles.txtInputView}>
            <TextInput
              style={styles.textinput}
              placeholder={surnamePH}
              placeholderTextColor="black"
              onChangeText={surname => setsurname(surname)}
              value={surname}
              onFocus={() => setsurnamePH('')}
              onBlur={() => (surname === '' ? setsurnamePH('Surname') : null)}
            />
          </View>
          {!surnameerror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{surnameerror}</Text>}
          <View style={styles.txtInputView}>
            <TextInput
              style={styles.textinput}
              placeholder={phonePH}
              value={Phonenumber}
              placeholderTextColor="black"
              onChangeText={Phonenumber => setphonenumber(Phonenumber)}
              keyboardType="phone-pad"
              onFocus={() => setphonePH('')}
              onBlur={() => (Phonenumber === '' ? setphonePH('Phone Number') : null)}
            />
          </View>
          {!Phonenumbererror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{Phonenumbererror}</Text>}
          <View style={styles.txtInputView}>
            <TextInput
              style={styles.textinput}
              placeholder={emailPH}
              placeholderTextColor="black"
              onChangeText={email => setemail(email)}
              value={email}
              onFocus={() => setemailPH('')}
              onBlur={() => (email === '' ? setemailPH('Email Address') : null)}
            />
          </View>
          {!emailerror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{emailerror}</Text>}
        </View>

        <TouchableOpacity onPress={() => saveOption()} style={styles.btnsSave}>
          <Text style={styles.saveTxt}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            _onLogout();
          }}
          style={styles.btnsSave1}>
          <Text style={styles.saveTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Profile;
