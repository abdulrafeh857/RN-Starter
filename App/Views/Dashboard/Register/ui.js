// Imports
import {CheckBox} from 'react-native-elements';
import {Colors} from 'Theme';
import React from 'react';
import {ScrollView, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import utils from './utils';
import * as TEXT from '@Atoms/Text';
import {Feedback, Button, Input, Toolbar} from '@Atoms';
import useService from './service';
import {Button as PaperButton} from 'react-native-paper';

const Register = (props) => {
  const {
    checked,
    isLoading,
    eye,
    error,
    setEye,
    setChecked,
    setFirstName,
    setLastName,
    setPhone,
    setPassword1,
    setPassword2,
    setEmail,
    registerUser,
  } = useService(props);

  let firstNameError =
    error && error.code === 'first_name' && '* ' + error.message;

  let lastNameError =
    error && error.code === 'last_name' && '* ' + error.message;

  let emailError = error && error.code === 'email' && '* ' + error.message;

  let password1Error =
    error && error.code === 'password1' && '* ' + error.message;

  let password2Error =
    error && error.code === 'password2' && '* ' + error.message;

  let nonFieldErrors =
    error && error.code === 'non_field_errors' && '* ' + error.message;

  return (
    <View style={styles.rootViewStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="interactive"
        contentContainerStyle={styles.rootScrollViewStyle}>
        <View style={styles.welcome.root}>
          <TEXT.Heading myStyle={styles.welcome.text}>
            {utils.helloText}
          </TEXT.Heading>
          <TEXT.Normal myStyle={styles.welcome.subtext}>
            {utils.getStartedString}
          </TEXT.Normal>
        </View>
        <Input
          placeholder="John"
          label="First Name"
          onChangeText={setFirstName}
          error={firstNameError}
          leftIcon={'account-outline'}
        />
        <Input
          placeholder="Doe"
          label="Last Name"
          onChangeText={setLastName}
          error={lastNameError}
          leftIcon={'account-outline'}
        />
        <Input
          label="Email Address"
          placeholder="Johndoe@gmail.com"
          keyboardType="email-address"
          onChangeText={setEmail}
          error={emailError}
          leftIcon={'email-outline'}
        />
        <Input
          label="Phone Number"
          placeholder="+44 7700 900678"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          // error={emailError}
          leftIcon={'phone-outline'}
        />
        <Input
          label="Password"
          placeholder="********"
          secureEntry={eye}
          rightIcon={eye ? 'eye-off' : 'eye'}
          onChangeText={setPassword1}
          leftIcon={'key-outline'}
          rightIconClick={() => {
            setEye(!eye);
          }}
          error={password1Error}
        />
        <Input
          secureEntry={eye}
          label="Confirm Password"
          placeholder="********"
          rightIcon={eye ? 'eye-off' : 'eye'}
          onChangeText={setPassword2}
          leftIcon={'key-outline'}
          rightIconClick={() => {
            setEye(!eye);
          }}
          error={password2Error || nonFieldErrors}
        />
        <TEXT.Caption myStyle={{marginLeft: 20}}>
          {utils.passwordTipString}
        </TEXT.Caption>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            activeOpacity={0.9}
            textStyle={styles.checkBoxText}
            containerStyle={styles.checkBoxContainerStyle}
            fontFamily="SofiaPro"
            checkedIcon={
              <Icon name={'check-circle'} color={Colors.primary} size={20} />
            }
            uncheckedIcon={
              <Icon
                name={'radio-button-unchecked'}
                color={Colors.tintGrey}
                size={20}
              />
            }
            checked={checked}
            onPress={() => {
              setChecked(!checked);
              if (!checked) console.debug('Terms and Conditions checked.');
              else console.debug('Terms and Conditions unchecked.');
            }}
          />
          <TEXT.Caption myStyle={{marginLeft: -20}}>
            {utils.agreementString}
          </TEXT.Caption>
          <PaperButton
            compact
            onPress={() => props.navigation.navigate('WebView', utils.TnCs)}
            style={{marginLeft: -3}}
            labelStyle={styles.termsAndConditionsLabelStyle}>
            {utils.termsAndConditionsString}
          </PaperButton>
        </View>
        <Button
          loading={isLoading}
          text="Sign Up"
          style={{marginVertical: 10}}
          onPress={() => {
            if (checked) {
              registerUser();
            } else {
              Feedback.error(
                'You need to accept the Drop Terms and Conditions in order to continue',
                'OK',
              );
            }
          }}
        />
      </ScrollView>
    </View>
  );
};

// Export
export default Register;
