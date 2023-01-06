/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, Layout, Gutters} from 'Theme';

export const Root = ({style, children}) => {
  return (
    <View
      style={{
        ...Layout.colHCenter,
        ...Gutters.smallHPadding,
        backgroundColor: Colors.background,
        paddingTop: getStatusBarHeight(true),
        ...style,
      }}>
      <StatusBar backgroundColor={Colors.primaryDark} />
      {children}
    </View>
  );
};
