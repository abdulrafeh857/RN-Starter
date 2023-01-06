// Imports
import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {TouchableRipple} from 'react-native-paper';
import * as TEXT from '@Atoms/Text';
import * as Animatable from 'react-native-animatable';

const OngoingOrders = (props) => {
  const {ongoing} = props;

  if (ongoing > 0)
    return (
      <View style={styles.root}>
        <View style={styles.card}>
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            style={styles.left}>
            <TEXT.Heading myStyle={styles.ongoingText}>{ongoing}</TEXT.Heading>
          </Animatable.View>
          <View style={styles.center}>
            <TEXT.SubHeading myStyle={styles.centerText}>
              You have {ongoing} pending Orders
            </TEXT.SubHeading>
          </View>
          <TouchableRipple
            onPress={() => props.navigation.navigate('Orders')}
            style={styles.right}>
            <TEXT.SubHeading myStyle={styles.buttonText}>
              Track now!
            </TEXT.SubHeading>
          </TouchableRipple>
        </View>
      </View>
    );
  else return null;
};

// Export
export default OngoingOrders;
