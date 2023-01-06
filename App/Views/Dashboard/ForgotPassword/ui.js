// Imports
import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import utils from './utils';
import useService from './service';
import {Input, Button, Toolbar} from '@Atoms';
import * as TEXT from '@Atoms/Text';

// Main functional component
const ChangePassword = (props) => {
  const {
    email,
    setEmail,
    error,
    success,
    isLoading,
    resetPassword,
  } = useService(props);

  return (
    <View style={styles.rootViewStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootScrollViewStyle}>
        <View style={styles.rootInputContainerStyle}>
          <Input
            leftIcon="email-outline"
            label={utils.inputTitles[0]}
            placeholder="Johndoe@gmail.com"
            value={email}
            error={error && '* ' + error}
            onChangeText={setEmail}
          />
        </View>
        {success && (
          <View style={styles.success}>
            <TEXT.Caption myStyle={{textAlign: 'justify'}}>
              The Reset Password email has been sent successfully.{'\n'}
              Follow the instructions in the email to reset your password.
            </TEXT.Caption>
          </View>
        )}
      </ScrollView>
      <Button
        loading={isLoading}
        text={utils.bottomButtonString}
        style={{bottom: 20, position: 'absolute'}}
        onPress={resetPassword}
      />
    </View>
  );
};

// Export
export default ChangePassword;
