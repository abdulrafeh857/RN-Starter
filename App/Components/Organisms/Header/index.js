import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, FontFamily } from 'Theme';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Header = props => {
  const {
    leftIcon,
    onLeftPress,
    rightIcon,
    onRightPress,
    title,
    style,
    status,
    drawerButton,
    iconLeft,
    drawer
  } = props;
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      {/* {drawer ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={drawerButton}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Icon name={'menu'} size={25.5} color={Colors.white}></Icon>
        </TouchableOpacity>
      ) : ( */}
      <TouchableOpacity
        style={styles.leftIcon}
        onPress={() => {
          leftIcon === 'menu' ? navigation.openDrawer() : navigation.goBack();
        }}>
        <Icon
          name={leftIcon ? leftIcon : 'chevron-left'}
          size={25}
          color={Colors.text}></Icon>
      </TouchableOpacity>
      {/* )
      } */}

      <View>
        {title && (
          <Text numberOfLines={1} style={[styles.textStyle, style]}>
            {title}
          </Text>
        )}

        {status && <Text style={[styles.statusStyle, style]}>{status}</Text>}
      </View>
      <TouchableOpacity
        disabled={rightIcon ? false : true}
        style={[
          styles.leftIcon,
          {
            backgroundColor: rightIcon ? Colors.silver : Colors.transparent
          }
        ]}
        onPress={onRightPress ? onRightPress : () => {}}>
        <Icon
          name={rightIcon || 'chevron-right'}
          size={25}
          color={rightIcon ? Colors.text : Colors.transparent}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: responsiveWidth(100),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: Colors.foreground
  },
  leftIcon: {
    width: 35,
    height: 35,
    backgroundColor: Colors.silver,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 18,
    fontFamily: FontFamily.Bold,
    color: Colors.text,
    alignSelf: 'center',
    textAlign: 'center'
  },
  statusStyle: {
    fontSize: 15,
    fontFamily: FontFamily.Regular,
    color: Colors.greyText,
    alignSelf: 'center',
    textAlign: 'center'
  }
});
