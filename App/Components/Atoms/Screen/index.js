import {ScrollView, View, SafeAreaView} from 'react-native';
import styles from './styles';
import React from 'react';

const Screen = (props) => {
  const {children, bottom, top} = props;

  return (
    <ScrollView
      {...props}
      keyboardShouldPersistTaps={'handled'}
      contentInsetAdjustmentBehavior="automatic"
      style={{
        ...styles.rootScroll,
        paddingBottom: bottom ? bottom : 0,
        paddingTop: top ? top : 0,
      }}>
      <SafeAreaView>
        <View style={styles.root}>{children}</View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Screen;
