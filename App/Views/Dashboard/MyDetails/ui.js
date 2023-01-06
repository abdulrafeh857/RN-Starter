// Imports
import {Input, Toolbar, Button} from '@Atoms';
import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import utils from './utils';
import useService from './service';

// Main functional component
const MyDetails = (props) => {
  const {
    isLoading,
    email,
    setEmail,
    firstName,
    setFirstName,
    phoneNumber,
    setPhoneNumber,
    lastName,
    setLastName,
    updateDetails,
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
            disabled
            placeholder="Johndoe@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            leftIcon="account-outline"
            label={utils.inputTitles[1]}
            placeholder="John"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Input
            leftIcon="account-outline"
            label={utils.inputTitles[2]}
            placeholder="Doe"
            value={lastName}
            onChangeText={setLastName}
          />
          <Input
            leftIcon="phone"
            label={utils.inputTitles[3]}
            placeholder="+44 1234567890"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
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
export default MyDetails;
