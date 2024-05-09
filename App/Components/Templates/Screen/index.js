import { ScrollView, View, SafeAreaView, StatusBar } from 'react-native';
import useStyles from './styles';
import React from 'react';
import { Colors } from 'Theme';

const Screen = props => {
  const { children } = props;

  const { root, rootScroll } = useStyles();

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />

      <SafeAreaView
        style={{
          backgroundColor: Colors.primary
        }}
      />

      <ScrollView
        {...props}
        keyboardShouldPersistTaps={'handled'}
        contentInsetAdjustmentBehavior="automatic"
        style={rootScroll}>
        <View style={root}>{children}</View>
      </ScrollView>
    </>
  );
};

export default Screen;
