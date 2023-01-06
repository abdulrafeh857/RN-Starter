// Imports
import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Divider, Button, Toolbar} from '@Atoms';
import useService from './service';
import utils from './utils';
import {CardForm} from '@stripe/stripe-react-native';

const AddCardDetails = (props) => {
  const {
    fromCheckout,
    isLoading,
    cardValid,
    onAddCard,
    setCardValid,
  } = useService(props);

  return (
    <View style={styles.rootViewContainerStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />
      <View keyboardShouldPersistTaps={'handled'} style={styles.rootViewStyle}>
        <CardForm
          autofocus
          onFormComplete={({complete}) => setCardValid(complete)}
          style={styles.form}
          cardStyle={styles.cardStyle}
        />
        <Button
          loading={isLoading}
          disabled={!cardValid}
          text={
            !cardValid
              ? 'all fields required'
              : fromCheckout
              ? 'Continue'
              : 'ADD CARD'
          }
          onPress={onAddCard}
        />
      </View>
    </View>
  );
};

// Export
export default AddCardDetails;
