// Imports
import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import utils from './utils';
import useService from './service';
import {Input, Button, Toolbar} from '@Atoms';
import {HelperText} from 'react-native-paper';

// Main functional component
const ChangePassword = (props) => {
  const {
    password,
    setPassword,
    newPassword,
    setNewPassword,
    repeatPassword,
    setRepeatPassword,
    error,
    isLoading,
    updateDetails,
  } = useService(props);

  let passwordError =
    error && error.code === 'oldPassword' && '* ' + error.message;

  let newPasswordError =
    error && error.code === 'newPassword' && '* ' + error.message;

  let repeatPasswordError =
    error && error.code === 'repeatPassword' && '* ' + error.message;

  return (
    <View style={styles.rootViewStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootScrollViewStyle}>
        <View style={styles.rootInputContainerStyle}>
          <Input
            leftIcon="key-outline"
            label={utils.inputTitles[0]}
            placeholder="*******"
            value={password}
            secureEntry
            error={passwordError}
            onChangeText={setPassword}
          />
          <Input
            leftIcon="key-outline"
            label={utils.inputTitles[1]}
            placeholder="*******"
            secureEntry
            value={newPassword}
            error={newPasswordError}
            onChangeText={setNewPassword}
          />
          <Input
            leftIcon="key-outline"
            label={utils.inputTitles[2]}
            placeholder="*******"
            secureEntry
            value={repeatPassword}
            error={repeatPasswordError}
            onChangeText={setRepeatPassword}
          />
          <HelperText style={{alignSelf: 'center'}} type="info" visible={true}>
            Password must be at least 8 characters.
          </HelperText>
        </View>
      </ScrollView>
      <Button
        loading={isLoading}
        text={utils.bottomButtonString}
        style={{bottom: 20, position: 'absolute'}}
        onPress={updateDetails}
      />
    </View>
  );
};

// Export
export default ChangePassword;
