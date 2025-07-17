import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CardShadowLow, Colors, FontFamily } from 'Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgUri } from 'react-native-svg';

const StatsViewSmall = props => {
  const { status, image, imageStyle, title, color } = props;
  const [indClr, setIndClr] = useState('');
  const indicator = () => {
    if (title === 'Fuel') {
      let status1 = parseInt(status);
      if (status1 >= 25) {
        setIndClr('success');
      } else if (status1 < 25 && status1 > 10) {
        setIndClr('warning');
      } else if (status1 <= 10) {
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
    } else if (title === 'Service') {
      if (status === 'ok') {
        setIndClr('success');
      } else if (status === 'required') {
        setIndClr('warning');
      } else {
        null;
      }
    }
  };
  useEffect(() => {
    indicator(status);
  }, [status]);

  return (
    <View style={{ width: responsiveWidth(10), height: responsiveHeight(6) }}>
      {typeof status != 'undefined' && (
        <View
          style={[
            styles.dotView,
            {
              backgroundColor: color

              // status == true ? Colors.success : status == false ? Colors.redsoft : Colors.greyText
            }
          ]}></View>
      )}
      {/* indClr === 'success' ? Colors.success : indClr === 'warning' ? Colors.warning : indClr === 'danger' ? Colors.redsoft : Colors.greyText */}

      {image && (
        <Image
          source={image}
          // uri={image}
          height={responsiveHeight(2.5)}
          width={responsiveWidth(10)}
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
    </View>
  );
};
export default StatsViewSmall;
const styles = StyleSheet.create({
  statsView: {
    paddingVertical: 5,
    width: responsiveWidth(25),
    backgroundColor: Colors.foreground,
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...CardShadowLow
  },
  title: {
    fontSize: 15,
    color: Colors.greyText,
    fontFamily: FontFamily.Regular,
    alignSelf: 'center',
    textAlign: 'center'
  },
  value: {
    fontSize: 17,
    color: Colors.text,
    fontFamily: FontFamily.Bold,
    position: 'absolute',
    top: 24
  },
  dotView: {
    width: 9,
    height: 9,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: 'absolute',
    zIndex: 100,
    left: -0,
    top: -0
  }
});
