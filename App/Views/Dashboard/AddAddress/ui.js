import {ScrollView, View} from 'react-native';
import React from 'react';
import styles from './styles';
import utils from './utils';
import * as TEXT from '@Atoms/Text';
import {Button, Input, Toolbar} from '@Atoms';
import useService from './service';

const AddAddress = (props) => {
  const {
    setName,
    location,
    isLoading,
    addAddress,
    line1,
    setLine1,
    line2,
    setLine2,
  } = useService(props);

  return (
    <View style={styles.rootViewContainerStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootViewStyle}>
        <View style={styles.inputTextContainerStyle}>
          <Input
            placeholder="Home, Work etc"
            label={utils.TitlesData[1].title}
            onChangeText={setName}
            leftIcon="bookmark-outline"
          />
          <Input
            placeholder="Address"
            label={utils.TitlesData[0].title}
            leftIcon="map-marker-outline"
            onChangeText={setLine1}
            value={line1}
          />
          <Input
            placeholder="Address"
            label={utils.TitlesData[3].title}
            leftIcon="map-marker-outline"
            onChangeText={setLine2}
            value={line2}
          />
          <Input
            placeholder="Postal Code"
            label={utils.TitlesData[2].title}
            disabled
            leftIcon="map-marker-outline"
            value={location.postcode}
          />
        </View>
        <TEXT.Caption myStyle={{marginTop: 10, alignSelf: 'center'}}>
          {utils.infoTextString}
        </TEXT.Caption>
      </ScrollView>
      <Button
        loading={isLoading}
        text={utils.bottomButtonTextString}
        style={{bottom: 20}}
        onPress={addAddress}
      />
    </View>
  );
};

export default AddAddress;
