import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, FontFamily } from 'Theme';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const Header = props => {
  const {
    leftIcon,
    onLeftPress,
    rightIcon,
    onRightPress,
    title,
    style,
    status,
    drawerButton, // optional prop
    iconLeft,
    drawer // ← make sure to pass this as true only on Dashboard screen
  } = props;

  const navigation = useNavigation();

  const handleLeftPress = () => {
    if (drawer) {
      navigation.dispatch(DrawerActions.openDrawer());
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.leftIcon} onPress={handleLeftPress}>
        <Icon
          name={leftIcon ? leftIcon : drawer ? 'menu' : 'chevron-left'}
          size={25}
          color={Colors.text}
        />
      </TouchableOpacity>

      <View>
        {title && (
          <Text numberOfLines={1} style={[styles.textStyle, style]}>
            {title}
          </Text>
        )}
        {status && <Text style={[styles.statusStyle, style]}>{status}</Text>}
      </View>

      <TouchableOpacity
        disabled={!rightIcon}
        style={[
          styles.leftIcon,
          {
            backgroundColor: rightIcon ? Colors.silver : Colors.transparent
          }
        ]}
        onPress={onRightPress ?? (() => {})}>
        <Icon
          name={rightIcon || 'chevron-right'}
          size={25}
          color={rightIcon ? Colors.text : Colors.transparent}
        />
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
