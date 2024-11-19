import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const MyComponent = props => {
  const { text, onPress } = props;
  return (
    <Animatable.View
      animation={'fadeInDownBig'}
      style={{
        // top: responsiveHeight(5.5),
        elevation: 5,
        shadowColor: '#0384BB',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 1,
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        borderRadius: 8,
        // borderLeftWidth: 5,
        // borderLeftColor: '#0384BB',
        height: responsiveHeight(12),
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '98%'
        }}>
        <Image
          style={{
            marginLeft: responsiveWidth(0),
            height: responsiveWidth(13),
            width: responsiveWidth(13),
            marginBottom: 2
          }}
          source={require('../../assets/images/checked.png')}
        />
        <View style={{ width: responsiveWidth(62) }}>
          <Text
            style={{
              color: 'gray',
              fontSize: responsiveFontSize(2)
              // fontFamily: fontFamily.appTextRegular,
            }}
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            {text}
          </Text>
        </View>
        <View>
          <AntDesign name={'close'} color={'transparent'} size={20} />
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};
