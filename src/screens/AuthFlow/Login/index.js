import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Feather from 'react-native-vector-icons/dist/Feather';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogIn = props => {
  const [emailPlaceholder, setemailPlaceholder] = useState('Email Address');
  const [passwordPlaceholder, setpasswordPlaceholder] = useState('Password');
  const [email, setemail] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [password, setpassword] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [loading, isLoading] = useState();

  const onLogin = () => {
    isLoading(true);
    setTimeout(async () => {
      if (email.toLowerCase() == 'customer@test.com' && password.toLowerCase() == 'customer') {
        await AsyncStorage.setItem('user', email?.toLowerCase());
        props.navigation.navigate('Customer');
        Toast.show('Login Successfully', Toast.SHORT);
      } else if (email.toLowerCase() == 'repairman@test.com' && password.toLowerCase() == 'repairman') {
        Toast.show('Login Successfully', Toast.SHORT);
        await AsyncStorage.setItem('user', email?.toLowerCase());
        props.navigation.navigate('Repairman');
      } else {
        Toast.show('Invalid email or password', Toast.SHORT);
      }
      isLoading(false);
    }, 1800);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} translucent={false} />

      <View style={styles.row}>
        <TouchableOpacity style={styles.backimage} onPress={() => props.navigation.goBack()}>
          <Feather name={'arrow-left'} color={'black'} size={25} />
        </TouchableOpacity>
        <View style={styles.headerview}>
          <Text style={styles.loginHeading}>Login</Text>
        </View>
      </View>
      <Text style={styles.loginTxt}>{'Please enter your registered email address \nand pasword to continue...'}</Text>
      <View style={styles.loginview}>
        <View style={styles.email}>
          <TextInput
            style={styles.inputtext}
            placeholder={emailPlaceholder}
            placeholderTextColor={'#949391'}
            onChangeText={email => setemail(email)}
            onFocus={() => setemailPlaceholder('')}
            onBlur={() => (email === '' ? setemailPlaceholder('Email') : null)}
          />
        </View>
        {!emailerror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{emailerror}</Text>}
        <View style={styles.password}>
          <TextInput
            style={styles.inputtext}
            placeholder={passwordPlaceholder}
            placeholderTextColor={'#949391'}
            secureTextEntry={true}
            onChangeText={password => setpassword(password)}
            onFocus={() => setpasswordPlaceholder('')}
            onBlur={() => (password === '' ? setpasswordPlaceholder('Password') : null)}
          />
        </View>
        {!passworderror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{passworderror}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onLogin();
          }}>
          {loading ? <ActivityIndicator size="large" color="white" /> : <Text style={styles.logintext}>Login</Text>}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.forgetp}
        onPress={() => {
          props.navigation.navigate('ForgotPassword');
        }}>
        <Text>Forget password?</Text>
      </TouchableOpacity>
      <View style={styles.iconview}>
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => {
            Toast.show('Coming Soon...', Toast.SHORT);
          }}>
          <View style={styles.iconviewBtn}>
            <AntDesign name={'google'} color={'#278be8'} size={20} style={styles.icon} />
          </View>
          <Text style={styles.Socialtext}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Toast.show('Coming Soon...', Toast.SHORT);
          }}
          style={styles.socialBtn}>
          <View style={styles.iconviewBtn}>
            <AntDesign name={'facebook-square'} color={'#278be8'} size={20} style={styles.icon} />
          </View>
          <View>
            <Text style={styles.Socialtext}>Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LogIn;
