import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, TouchableOpacity, StatusBar, TextInput, View, ActivityIndicator } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { styles } from './style';
import Toast from 'react-native-simple-toast';

const CustomerRegistration = props => {
  const [firstnamePH, setfirstnamePH] = useState('First Name');
  const [lastnamePH, setlastnamePH] = useState('Last Name');
  const [emailPH, setemailPH] = useState('Email Address');
  const [passwordPH, setpasswordPH] = useState('Password');
  const [confirmPasswordPH, setconfirmPasswordPH] = useState('Confirm Password');
  const [phonePH, setphonePH] = useState('Phone Number');
  const [firstname, setfirstname] = useState('');
  const [firstnameerror, setfirstnameerror] = useState('');
  const [lastname, setlastname] = useState('');
  const [lastnameerror, setlastnameerror] = useState('');
  const [email, setemail] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [password, setpassword] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [confirmpassworderror, setconfirmpassworderror] = useState('');
  const [Phonenumber, setphonenumber] = useState('');
  const [Phonenumbererror, setphonenumbererror] = useState('');
  const [loading, isLoading] = useState(false);

  const _onLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} translucent={false} />
      <View style={styles.Infoview}>
        <Text style={styles.mainTxt}>Customer Registration</Text>
        <Text style={styles.mainSubTxt}>{'please fill in the form below to register \nyourself as a customer...'}</Text>
      </View>
      <View style={styles.viewInput}>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.txtInput}
            placeholder={firstnamePH}
            placeholderTextColor="black"
            onChangeText={firstname => setfirstname(firstname)}
            onFocus={() => setfirstnamePH('')}
            onBlur={() => (firstname === '' ? setfirstnamePH('First Name') : null)}
          />
        </View>
        {!firstnameerror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{firstnameerror}</Text>}
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.txtInput}
            placeholder={lastnamePH}
            placeholderTextColor="black"
            onChangeText={lastname => setlastname(lastname)}
            onFocus={() => setlastnamePH('')}
            onBlur={() => (lastname === '' ? setlastnamePH('Last Name') : null)}
          />
        </View>
        {!lastnameerror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{lastnameerror}</Text>}
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.txtInput}
            placeholder={emailPH}
            placeholderTextColor="black"
            onChangeText={email => setemail(email)}
            onFocus={() => setemailPH('')}
            onBlur={() => (email === '' ? setemailPH('Email Address') : null)}
          />
        </View>
        {!emailerror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{emailerror}</Text>}
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.txtInput}
            placeholder={passwordPH}
            placeholderTextColor="black"
            onChangeText={password => setpassword(password)}
            secureTextEntry={true}
            onFocus={() => setpasswordPH('')}
            onBlur={() => (password === '' ? setpasswordPH('Password') : null)}
          />
        </View>
        {!passworderror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{passworderror}</Text>}
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.txtInput}
            placeholder={confirmPasswordPH}
            placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={confirmpassword => setconfirmpassword(confirmpassword)}
            onFocus={() => setconfirmPasswordPH('')}
            onBlur={() => (confirmpassword === '' ? setconfirmPasswordPH('Confirm Password') : null)}
          />
        </View>
        {!confirmpassworderror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{confirmpassworderror}</Text>}
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={styles.txtInput}
            placeholder={phonePH}
            placeholderTextColor="black"
            onChangeText={Phonenumber => setphonenumber(Phonenumber)}
            keyboardType="phone-pad"
            onFocus={() => setphonePH('')}
            onBlur={() => (Phonenumber === '' ? setphonePH('Phone Number') : null)}
          />
        </View>
        {!Phonenumbererror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{Phonenumbererror}</Text>}
      </View>
      <View
        style={{
          marginTop: responsiveHeight(1),
          marginLeft: responsiveWidth(6)
        }}>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => {
            if (firstname === '') {
              setfirstnameerror('Please enter your first name');
              return;
            }
            if (lastname === '') {
              setlastnameerror('Please enter your last name');
              return;
            }
            if (email === '') {
              setemailerror('Please enter your email address');
              return;
            }
            if (password === '') {
              setpassworderror('Please enter your password');
              return;
            }
            if (confirmpassword === '') {
              setconfirmpassworderror('Please enter your confirm password');
              return;
            }
            if (Phonenumber === '') {
              setphonenumbererror('Please enter your phone number');
              return;
            }
            if (password !== confirmpassword) {
              setconfirmpassworderror('Password and confirm password does not match');
              return;
            }
            isLoading(true);
            setfirstnameerror('');
            setlastnameerror('');
            setemailerror('');
            setpassworderror('');
            setconfirmpassworderror('');
            setphonenumbererror('');
            setTimeout(() => {
              Toast.show('Account has been registered successfully. You can now login to your account...', Toast.LONG);
              props.navigation.navigate('Login');
              isLoading(false);
            }, 1800);
          }}>
          {loading ? <ActivityIndicator size="large" color="white" /> : <Text style={styles.txtBtn}>Register Account</Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.endText}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            _onLogin();
          }}>
          <Text style={styles.loginTxt}> Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default CustomerRegistration;
