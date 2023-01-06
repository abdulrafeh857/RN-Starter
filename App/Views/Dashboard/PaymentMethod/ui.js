// Imports
import {ScrollView, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontSize, Colors} from 'Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import utils from './utils';
import * as TEXT from '@Atoms/Text';
import useService from './service';
import {Divider, Loader, Toolbar} from '@Atoms';
import {TouchableRipple} from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/Ionicons';
import SwipeableFlatList from 'react-native-swipeable-list';

// Main functional component
const PaymentMethod = (props) => {
  const {navigation} = props;

  const {
    cards,
    fromCheckout,
    isLoading,
    paymentMethod,
    selectCard,
    onDelete,
  } = useService(props);

  function renderButtons({item}) {
    return (
      <View style={styles.buttonRoot}>
        <TouchableRipple
          onPress={() => onDelete(item)}
          style={styles.deleteButtonRoot}>
          <TEXT.Caption myStyle={{color: 'white'}}>DELETE</TEXT.Caption>
        </TouchableRipple>
      </View>
    );
  }

  function renderPaymentList({item}) {
    const selected = item.id === paymentMethod?.id;

    return (
      <TouchableRipple
        onPress={() => selectCard(item)}
        style={{...styles.paymentMethodCard.rootViewStyle}}>
        <View style={styles.paymentMethodCard.containerStyle}>
          <Icon name={'credit-card'} color={Colors.text} size={25} />
          <View style={styles.paymentMethodCard.centerViewStyle}>
            <TEXT.Title myStyle={styles.paymentMethodCard.brand}>
              {item?.card?.brand?.slice(0, 1).toUpperCase() +
                item?.card?.brand?.slice(1, item?.card?.brand?.length)}
            </TEXT.Title>
            <TEXT.SubHeading myStyle={styles.paymentMethodCard.number}>
              {item?.billing_details?.name}
            </TEXT.SubHeading>
            <TEXT.SubHeading myStyle={styles.paymentMethodCard.number}>
              {utils.paymentCardData.number + item?.card?.last4}
            </TEXT.SubHeading>
          </View>
          <View style={styles.paymentMethodCard.rightViewStyle}>
            <TEXT.Caption myStyle={styles.paymentMethodCard.expiry}>
              Expiry: {item?.card?.exp_month + '/' + item?.card?.exp_year}
            </TEXT.Caption>
            <Icon1
              name={selected ? 'radio-button-on' : 'radio-button-off'}
              size={16}
              color={Colors.primary}
              style={styles.paymentMethodCard.icon}
            />
          </View>
        </View>
      </TouchableRipple>
    );
  }

  return (
    <View style={styles.rootViewContainerStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootViewStyle}>
        <Divider />
        {isLoading ? (
          <View style={styles.noCard}>
            <Loader color={Colors.primary} />
            <TEXT.Caption myStyle={{color: Colors.primary, marginTop: 15}}>
              Fetching data...
            </TEXT.Caption>
          </View>
        ) : cards && cards.length > 0 ? (
          // cards.map(renderPaymentList.bind(this))
          <SwipeableFlatList
            contentContainerStyle={{flexGrow: 1}}
            renderItem={renderPaymentList}
            data={cards}
            maxSwipeDistance={75}
            ItemSeparatorComponent={() => <View style={{height: 5}} />}
            renderQuickActions={(item) => renderButtons(item)}
            keyExtractor={(item) => item.index}
          />
        ) : (
          <View style={styles.noCard}>
            <Icon name={'credit-card'} color={'#7777'} size={50} />
            <TEXT.Caption>No cards added!</TEXT.Caption>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddCardDetails', {
            fromCheckout: fromCheckout,
          });
        }}
        activeOpacity={0.9}
        style={styles.fab}>
        <Icon name={'add'} color={'#fff'} size={FontSize.title} />
      </TouchableOpacity>
    </View>
  );
};

// Export
export default PaymentMethod;
