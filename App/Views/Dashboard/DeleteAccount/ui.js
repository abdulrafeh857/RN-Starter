// Imports
import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import utils from './utils';
import useService from './service';
import { Input, Button, Toolbar } from '@Atoms';
import { HelperText } from 'react-native-paper';
import { Colors } from 'Theme';

// Main functional component
const ChangePassword = props => {
  const { password, setPassword, error, isLoading, deleteAccount } =
    useService(props);

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
          <HelperText
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 16,
              marginBottom: 10
            }}
            type="info"
            visible={true}>
            Deleting your account is permanent. When you delete your account,
            you won't be able to retrieve the content, information, invoices,
            order history and other user data.
          </HelperText>
          <Input
            leftIcon="key-outline"
            label={utils.inputTitles[0]}
            placeholder="*******"
            value={password}
            secureEntry
            error={passwordError}
            onChangeText={setPassword}
          />
        </View>
      </ScrollView>
      <Button
        loading={isLoading}
        text={utils.bottomButtonString}
        style={{
          bottom: 20,
          position: 'absolute',
          backgroundColor: Colors.redsoft
        }}
        onPress={deleteAccount}
      />
    </View>
  );
};

// Export
export default ChangePassword;
