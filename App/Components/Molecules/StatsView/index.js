import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CardShadowLow, Colors, FontFamily } from 'Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgUri } from 'react-native-svg';
import { Image } from 'react-native';
import { set } from 'react-native-reanimated';
const StatsView = props => {
  const { status, title, value, icon, image, imageStyle, iconColor, titleStyle, onPress, valueStyle, style, numberOfCards = 3, name, color } = props;
  // console.log('status/name', status, name);
  const [indClr, setIndClr] = useState('');
  const indicator = () => {
    if (title === 'Fuel') {
      let status1 = parseInt(status);
      if (status1 >= 25) {
        setIndClr('success');
      } else if (status1 < 25 && status1 > 10) {
        setIndClr('warning');
      } else if (status1 <= 10 || status1 == 'n.c') {
        setIndClr('danger');
      } else {
        setIndClr('grey');
      }
    } else if (title === 'Battery') {
      let status1 = parseInt(status);
      if (status1 > 11.6 && status1 < 18.2) {
        setIndClr('success');
      } else if ((status1 <= 11.6 && status1 >= 11.2) || (status1 >= 18.2 && status1 <= 19)) {
        setIndClr('warning');
      } else if (status1 < 11.2 || status1 > 19) {
        setIndClr('danger');
      } else {
        setIndClr('grey');
      }
    } else if (title === 'Speed') {
      let status1 = parseInt(status);
      if (status1 > 50) {
        setIndClr('success');
      } else if (status1 < 50 && status1 > 25) {
        setIndClr('warning');
      } else if (status1 == 0.0) {
        setIndClr('danger');
      } else {
        setIndClr('grey');
      }
    } else if (title === 'ICs') {
      if (status == 'ok' || status == 'OK' || status == 'Ok') {
        setIndClr('success');
      } else {
        setIndClr('text');
      }
    } else if (title === 'Frequency') {
      let status1 = parseInt(status);
      if (status1 >= 31 && status1 <= 56) {
        setIndClr('success');
      } else if (status1 < 31 || status1 > 56) {
        setIndClr('danger');
      }
    } else if (title === 'Motor Sensor') {
      if (status === 'MOTOR TEMPERATURE TOO HIGH' || status == 'error' || status == 'ERROR' || status == 'Error') {
        setIndClr('danger');
      } else if (status === 'MOTOR TEMPERATURE' || status == 'ok' || status == 'OK' || status == 'Ok') {
        setIndClr('success');
      }
    } else if (title === 'Oil Sensor') {
      if (status === 'OIL PRESSURE TOO LOW' || status == 'error' || status == 'ERROR' || status == 'Error') {
        setIndClr('danger');
      } else if (status === 'OIL PRESSURE' || status == 'ok' || status == 'OK' || status == 'Ok') {
        setIndClr('success');
      }
    } else if (title === 'TU3') {
      let status1 = parseInt(status);
      if (status1 > 26) {
        setIndClr('danger');
      } else if (status1 < 26) {
        setIndClr('success');
      } else {
        setIndClr('grey');
      }
    } else if (title === 'TU5') {
      let status1 = parseInt(status);
      if (status1 > 26) {
        setIndClr('danger');
      } else if (status1 < 26) {
        setIndClr('success');
      } else {
        setIndClr('grey');
      }
    } else if (title === 'TU15') {
      let status1 = parseInt(status);
      if (status1 > 26) {
        setIndClr('danger');
      } else if (status1 < 26) {
        setIndClr('success');
      } else {
        setIndClr('grey');
      }
    } else if (title === 'Phase L1L2') {
      let status1 = parseInt(status);
      if (status1 > 280 && status1 < 450) {
        setIndClr('success');
      } else if (status1 > 450 || status1 < 280) {
        setIndClr('danger');
      }
    } else if (title === 'Phase L2L3') {
      let status1 = parseInt(status);
      if (status1 > 280 && status1 < 450) {
        setIndClr('success');
      } else if (status1 > 450 || status1 < 280) {
        setIndClr('danger');
      }
    } else if (title === 'Phase L3L1') {
      let status1 = parseInt(status);
      if (status1 > 280 && status1 < 450) {
        setIndClr('success');
      } else if (status1 > 450 || status1 < 280) {
        setIndClr('danger');
      }
    } else if (title === 'Service') {
      if (status === 'ok') {
        setIndClr('success');
      } else if (status === 'required') {
        setIndClr('warning');
      } else {
        null;
      }
    } else if (title === 'RSSI') {
      let status1 = parseInt(status);
      if (status1 < 0) {
        setIndClr('success');
      } else if (status1 > 0) {
        setIndClr('danger');
      } else {
        setIndClr('grey');
      }
    } else if (title === 'Controller')
      if (status === 'ok' || status === 'OK' || status === 'Ok' || status === 'on' || status === 'ON' || status === 'On') {
        setIndClr('success');
      } else if (status === 'error' || status === 'ERROR' || status === 'Error') {
        setIndClr('danger');
      } else {
        setIndClr('grey');
      }
    else if (name === 'Driver Location' || name === 'Genset Location' || name === 'latitude') {
      console.log('asastatus', status, name);
      if (status === '1') {
        setIndClr('success');
      } else {
        setIndClr('danger');
      }
    }
  };
  useEffect(() => {
    indicator(status);
  }, [status]);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={title === 'Driver Location' || title === 'Genset Location' ? false : true}
      style={[
        styles.statsView,
        {
          // width: numberOfCards == 3 ? responsiveWidth(25) : responsiveWidth(35)
        },
        style
      ]}>
      {typeof status != undefined ? (
        <View
          style={[
            styles.dotView,
            {
              backgroundColor: color
              // indClr === 'success' ? Colors.success : indClr === 'warning' ? Colors.warning : indClr === 'danger' ? Colors.redsoft : Colors.greyText
              // backgroundColor:
              //   status == true || status === 'ok' || status === 'OK' || status === 'Ok'
              //     ? Colors.success
              //     : status == 'ERROR' || status == 'error' || status == false
              //     ? Colors.redsoft
              //     : Colors.greyText
            }
          ]}></View>
      ) : null}
      {icon && <Icon name={icon} size={46} color={iconColor ? iconColor : Colors.primary}></Icon>}

      {image && (
        <Image
          source={image}
          // uri={image}
          height={responsiveHeight(5)}
          width={responsiveWidth(16)}
          resizeMode={'contain'}
          // style={[
          //   {
          //     width: responsiveWidth(16),
          //     height: responsiveHeight(5),
          //     alignSelf: 'center'
          //   },
          //   imageStyle
          //]}
        ></Image>
      )}

      <Text style={[styles.value, valueStyle]}>{value}</Text>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default StatsView;

const styles = StyleSheet.create({
  statsView: {
    paddingVertical: 2,
    width: responsiveWidth(25),
    minHeight: responsiveHeight(12.5),
    backgroundColor: Colors.foreground,
    borderRadius: 10,
    // paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    // height:responsiveHeight(15),
    ...CardShadowLow
  },
  title: {
    fontSize: 14,
    color: Colors.greyText,
    fontFamily: FontFamily.Regular,
    alignSelf: 'center',
    textAlign: 'center'
  },
  value: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: FontFamily.Bold,
    alignSelf: 'center',
    textAlign: 'center'
    // paddingVertical:4
    // maxWidth: responsiveWidth(23)
    // position: 'absolute'
  },
  dotView: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 10,
    left: 8
  }
});
