// Imports
import {CheckBox} from 'react-native-elements';
import {Colors, FontSize} from 'Theme';
import {FlatList, ScrollView, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ProductHeader as ProductHeaderCard} from '@Molecules';
import styles from './styles';
import * as TEXT from '@Atoms/Text';
import {Divider, Button, Toolbar} from '@Atoms';
import useService from './service';

// Main functional component
const ProductDetails = (props) => {
  const {
    isLoading,
    edit,
    data,
    quantity,
    sides,
    removeAndAddToBasket,
    selectSide,
    addToBasket,
    setQuantity,
    isButtonEnabled,
    groupSides,
  } = useService(props);

  function renderSideItems(modifier, group) {
    const isChecked = sides?.includes(modifier.id);
    const {type} = group;
    const isRadio = type === 'RADIO';
    let limit = group.limit;
    let limitInvalid = limit === null || limit === 0;

    let limitReached =
      groupSides.filter((g) => g.groupId === group.id).length >= limit;

    let disabledCheckbox =
      limitReached && !isChecked && !isRadio && !limitInvalid;

    return (
      <View style={styles.sides.rootViewStyle}>
        <View
          style={{
            ...styles.sides.leftViewStyle,
            opacity: disabledCheckbox ? 0.6 : 1,
          }}>
          <CheckBox
            activeOpacity={0.9}
            fontFamily="SofiaPro"
            disabled={disabledCheckbox}
            textStyle={{
              fontSize: 13,
              lineHeight: 13,
              fontWeight: 'normal',
            }}
            containerStyle={styles.sides.checkBoxContainerStyle}
            checkedIcon={
              <Icon
                name={isRadio ? 'radio-button-checked' : 'check-box'}
                color={Colors.primary}
                size={FontSize.title}
              />
            }
            uncheckedIcon={
              <Icon
                name={
                  isRadio ? 'radio-button-unchecked' : 'check-box-outline-blank'
                }
                color={Colors.tintGrey}
                size={FontSize.title}
              />
            }
            title={modifier.name}
            checked={isChecked}
            onPress={() => selectSide(type, group, modifier, isChecked)}
          />
        </View>
        <View style={styles.sides.textPriceStyle}>
          <TEXT.Caption myStyle={styles.sides.text}>
            {modifier.price === '0.00' ? 'Free' : '£' + modifier.price}
          </TEXT.Caption>
        </View>
      </View>
    );
  }

  function renderSides({item}) {
    const hasModifiers = item.modifiers.length > 0;
    const isRadio = item.type === 'RADIO';
    const isRequired = item.required;
    let limit = item.limit;
    let limitInvalid = limit === null || limit === 0;

    if (hasModifiers)
      return (
        <>
          <View style={styles.section.rootViewStyle}>
            <TEXT.SubHeading>
              {item.name}
              <TEXT.SubHeading myStyle={{lineHeight: 18, fontSize: 14}}>
                {isRadio && isRequired
                  ? '  (required)'
                  : isRadio && !isRequired
                  ? '  (optional)'
                  : !isRadio && isRequired
                  ? '  (required)'
                  : '  (optional)'}
              </TEXT.SubHeading>
            </TEXT.SubHeading>
            {!isRadio && (
              <TEXT.Caption
                myStyle={{
                  lineHeight: 18,
                  color: '#111',
                  paddingTop: 3,
                }}>
                {limitInvalid ? 'Choose any' : 'Choose max '}
                <TEXT.Caption
                  myStyle={{
                    color: '#111',
                    fontWeight: 'bold',
                  }}>
                  {limitInvalid ? '' : limit}
                </TEXT.Caption>
                {' option(s)'}
              </TEXT.Caption>
            )}
          </View>
          {item?.modifiers?.map((modifier) => renderSideItems(modifier, item))}
        </>
      );
    else return null;
  }

  return (
    <View style={styles.rootViewStyle}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootScrollViewContainerStyle}>
        <Toolbar {...props} title={data?.title} cross />

        <ProductHeaderCard data={data} />
        <Divider />

        {data?.modifier_groups?.length > 0 && (
          <>
            <FlatList
              contentContainerStyle={styles.sides.rootContainerStyle}
              renderItem={renderSides.bind()}
              data={data?.modifier_groups}
              keyExtractor={(item) => item.key}
            />
            <Divider />
          </>
        )}

        <View style={styles.quantity.rootViewStyle}>
          <TouchableOpacity
            onPress={() => {
              if (quantity > 1) {
                console.debug('Decrease quantity.');
                setQuantity(quantity - 1);
              }
            }}
            activeOpacity={0.9}
            style={styles.quantity.buttonStyle}>
            <Icon name={'remove'} color={'#fff'} size={FontSize.title} />
          </TouchableOpacity>
          <TEXT.Caption myStyle={{fontSize: 18, lineHeight: 18}}>
            {quantity}
          </TEXT.Caption>
          <TouchableOpacity
            onPress={() => {
              console.debug('Increase quantity.');
              setQuantity(quantity + 1);
            }}
            activeOpacity={0.9}
            style={styles.quantity.buttonStyle}>
            <Icon name={'add'} color={'#fff'} size={FontSize.title} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Button
        loading={isLoading}
        disabled={!isButtonEnabled}
        text={
          !isButtonEnabled
            ? 'Select Required Sides'
            : edit
            ? `Update Item`
            : `ADD Item TO BASKET`
        }
        onPress={edit ? removeAndAddToBasket : addToBasket}
        style={{
          bottom: 10,
        }}
      />
    </View>
  );
};

// Export
export default ProductDetails;
