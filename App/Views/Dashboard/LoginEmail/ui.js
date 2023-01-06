// Imports
import React from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import utils from './utils';
import styles from './styles';
import * as TEXT from '@Atoms/Text';
import {Button, Input, Toolbar} from '@Atoms';
import {Colors} from 'Theme';
import useService from './service';
import {TouchableRipple} from 'react-native-paper';

// Main functional component
const LoginEmail = (props) => {
  const {
    isLoading,
    isLoading1,
    eye,
    error,
    username,
    checked,
    storedUser,
    fromDash,
    setChecked,
    setEye,
    setUsername,
    setPassword,
    verifyLogin,
  } = useService(props);

  let usernameError =
    error && error.code === 'username' && '* ' + error.message;

  let passwordError =
    error && error.code === 'password' && '* ' + error.message;

  let invalidError = error && error.code === 'invalid' && '* ' + error.message;

  return (
    <View style={styles.rootViewStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootScrollViewContainerStyle}>
        <View style={styles.welcome.root}>
          <TEXT.Heading myStyle={styles.welcome.text}>
            Hello Again!
          </TEXT.Heading>
          <TEXT.Normal myStyle={styles.welcome.subtext}>
            Welcome back
          </TEXT.Normal>
        </View>

        <View style={styles.inputContainerStyle}>
          <Input
            placeholder="Johndoe@gmail.com"
            label="Email Address"
            leftIcon="email-outline"
            value={username}
            keyboardType="email-address"
            error={usernameError}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <Input
            placeholder="********"
            label="Password"
            leftIcon="key-outline"
            rightIcon={eye ? 'eye-off' : 'eye'}
            secureEntry={eye}
            error={
              passwordError
                ? passwordError
                : invalidError
                ? invalidError
                : false
            }
            onChangeText={setPassword}
            rightIconClick={() => {
              setEye(!eye);
            }}
          />
        </View>
        <View style={styles.fc}>
          <View style={styles.checkBoxContainerStyle} />
          {/* <CheckBox
            activeOpacity={0.9}
            textStyle={styles.checkBoxText}
            fontFamily="SofiaPro"
            containerStyle={styles.checkBoxContainerStyle}
            checkedIcon={
              <Ionicon
                name={'checkmark-circle-outline'}
                color={Colors.primary}
                size={20}
              />
            }
            uncheckedIcon={
              <Ionicon
                name={'ellipse-outline'}
                color={Colors.tintGrey}
                size={20}
              />
            }
            title={'Remember me'}
            checked={checked}
            onPress={() => {
              setChecked(!checked);
            }}
          /> */}
          <TouchableRipple
            style={{padding: 6}}
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            <>
              <TEXT.Caption>{utils.fc}</TEXT.Caption>
            </>
          </TouchableRipple>
        </View>

        <Button
          loading={isLoading}
          text="Log in"
          style={{marginTop: 20}}
          onPress={() => verifyLogin()}
        />
        {/* {storedUser && (
          <Button
            loading={isLoading1}
            text={`Log in as ${storedUser.username}`}
            style={{marginVertical: 20}}
            onPress={() => verifyLogin(storedUser)}
          />
        )} */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.signUpContainer}
          onPress={() => {
            const {navigate} = props.navigation;
            console.debug('Navigate to Sign Up.');
            navigate('Register', {fromDash: fromDash});
          }}>
          <TEXT.Caption>Don't have an account?</TEXT.Caption>
          <TEXT.Heading
            myStyle={{
              color: Colors.primaryDark,
              fontSize: 12,
              lineHeight: 12,
              paddingTop: 5,
            }}>
            {utils.signUpButtonString}
          </TEXT.Heading>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Export
export default LoginEmail;
