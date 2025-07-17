import { ScrollView, View, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import useStyles from './styles';
import React, { Fragment } from 'react';
import { Colors } from 'Theme';

const Screen = props => {
  const { children, topColor, nestedScrollEnabled, backgroundColor, rootStyle, refreshing = false, onRefresh } = props;

  const { root, rootScroll } = useStyles();

  return (
    <Fragment>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: topColor || Colors.foreground
        }}
      />
      <StatusBar backgroundColor={topColor || Colors.foreground} hidden={false} barStyle={topColor ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.transparent }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={nestedScrollEnabled}
          keyboardShouldPersistTaps={'handled'}
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundColor ? { ...rootScroll, backgroundColor } : rootScroll}
          refreshControl={refreshing ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : null}>
          <View style={[root, { ...rootStyle }]}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default Screen;
