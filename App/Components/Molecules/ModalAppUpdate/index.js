import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
// import {
//   animationIn,
//   animationOut,
//   animationOutTiming,
//   animationInTiming
// } from 'Components/Templates/ModalAnimation';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors, FontFamily } from 'Theme';
// import { SignInButton } from '@Molecules';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Button';

const ModalAppUpdate = props => {
  const { onBackdropPress, onBackButtonPress, isVisible, onUpdatePress, onCancelPress } = props;
  return (
    <ReactNativeModal
      isVisible={isVisible}
      // animationOut={animationOut}
      // animationInTiming={animationOutTiming}
      // animationOutTiming={animationInTiming}
      // animationIn={animationIn}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}
      backdropOpacity={0.41}>
      <View style={styles.container}>
        {/* <View
          style={{
            flexDirection: 'row'
          }}>
          <Image style={styles.image} resizeMethod="resize" resizeMode="contain" source={require('@Images/iclerk.gif')} />
          <Icon
            name={'close'}
            size={28}
            style={{
              position: 'absolute',
              left: 170,
              top: 21,
              zIndex: 100
            }}
            color={Colors.transparent}
            onPress={onCancelPress}></Icon>
        </View> */}
        <Icon name={'alert-circle-outline'} size={28} color={Colors.forgot}></Icon>
        <Text style={styles.modalMidText}>
          Dear User, you are using an older version of the app. Please update the app in order to get excellent user experience.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(65),
            alignSelf: 'center',
            marginTop: responsiveHeight(3)
          }}>
          <TouchableOpacity
            style={styles.modalBtn}
            onPress={() => {
              BackHandler.exitApp();
            }}>
            <Text
              style={[
                styles.modalBtnText,
                {
                  fontSize: 18,
                  backgroundColor: Colors.statusBack
                }
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalBtn, { backgroundColor: Colors.genorange }]}
            onPress={() => {
              onUpdatePress();
            }}>
            <Text
              style={[
                styles.modalBtnText,
                {
                  fontSize: 18,
                  color: 'white'
                }
              ]}>
              Update App
            </Text>
          </TouchableOpacity>
        </View>

        {/* <Button
          onPress={onUpdatePress}
          // style={styles.button}
          text={'Update App'}
          tStyle={{ color: Colors.genorange }}></Button>
        <Button
          onPress={onCancelPress}
          // style={[
          //   // styles.button,
          //   {
          //     // backgroundColor: Colors.logocolor
          //   }
          // ]}
          text={'Cancel'}
          tStyle={{ color: Colors.buttonColor }}></Button> */}
      </View>
    </ReactNativeModal>
  );
};

export default ModalAppUpdate;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(93),
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: Colors.foreground,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  image: {
    height: responsiveHeight(10),
    width: responsiveWidth(30)
  },
  modalMidText: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: FontFamily.SFRegular,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
    marginHorizontal: 10
  },
  modalHeadText: {
    fontSize: 24,
    color: Colors.text,
    fontFamily: FontFamily.SFBold,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(2)
  },
  button: {
    width: responsiveWidth(80),
    borderRadius: 13
  },
  modalBtnText: {
    fontSize: 18,
    color: Colors.text,
    fontFamily: FontFamily.SemiBold,
    textAlign: 'center'
    // marginLeft: 10
  },
  modalBtn: {
    width: responsiveWidth(30),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.2,
    borderColor: Colors.greyText,
    borderRadius: 8,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1)
  }
});
