import { Text, View, TouchableOpacity, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import Feather from 'react-native-vector-icons/dist/Feather';
import Toast from 'react-native-simple-toast';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const ForgotPassword = props => {
  const [emailPlaceholder, setemailPlaceholder] = useState('Email Address');
  const [email, setEmail] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [loading, isLoading] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} translucent={false} />

      <View style={styles.row}>
        <TouchableOpacity style={styles.backimage} onPress={() => props.navigation.goBack()}>
          <Feather name={'arrow-left'} color={'black'} size={25} />
        </TouchableOpacity>
        <View style={styles.headerview}>
          <Text style={styles.loginHeading}>Forgot Password</Text>
        </View>
      </View>
      <Text style={styles.loginTxt}>{'Please enter your registered email address \nto reset your password...'}</Text>

      <View style={styles.loginview}>
        <View style={styles.email}>
          <TextInput
            style={styles.inputtext}
            placeholder={emailPlaceholder}
            placeholderTextColor={'#949391'}
            onChangeText={email => setEmail(email)}
            onFocus={() => setemailPlaceholder('')}
            onBlur={() => (email === '' ? setemailPlaceholder('Email') : null)}
          />
        </View>
        {!emailerror ? null : <Text style={{ color: 'red', marginLeft: responsiveWidth(6) }}>{emailerror}</Text>}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (email === '') {
            setemailerror('Please enter your email address');
            return;
          }
          isLoading(true);
          setemailerror('');
          setTimeout(() => {
            Toast.show('Password reset link has been sent to your email address', Toast.SHORT);
            setEmail('');
            isLoading(false);
            props.navigation.navigate('Login');
          }, 1800);
        }}>
        {loading ? <ActivityIndicator size="large" color="white" /> : <Text style={styles.logintext}>Send Email</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
