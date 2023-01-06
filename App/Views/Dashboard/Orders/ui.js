// Imports
import {Colors, Layout} from 'Theme';
import {Dimensions, ScrollView, Image, View, FlatList} from 'react-native';
import React from 'react';
import styles from './styles';
import * as TEXT from '@Atoms/Text';
import {OrderCard} from '@Molecules';
import Placeholder from './placeholder';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import useService from './service';
import closeToBottom from 'Utils/Common/CloseToBottom';
import {Loader, Toolbar} from '@Atoms';
import utils from './utils';

const {width, height} = Dimensions.get('window');

const Invalid = ({name}) => (
  <View style={styles.rootViewStyle}>
    <ScrollView contentContainerStyle={styles.rootScrollViewStyle}>
      <View style={{height: height * 0.75, ...Layout.center}}>
        <Image
          resizeMode={'contain'}
          resizeMethod="resize"
          source={require('@Images/no-orders.png')}
        />
        <TEXT.Heading myStyle={styles.invalidText}>
          No {name} orders!
        </TEXT.Heading>
        <TEXT.Caption myStyle={styles.invalidCaption}>
          Pull down to refresh
        </TEXT.Caption>
      </View>
    </ScrollView>
  </View>
);

// Main functional component
const Orders = (props) => {
  const {
    ongoing,
    completed,
    cancelled,
    routes,
    index,
    loadingOrders,
    refreshControl,
    next,
    loadMoreOrders,
    setIndex,
  } = useService(props);

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        pressColor="#45bee233"
        contentContainerStyle={{flex: 1}}
        indicatorStyle={{backgroundColor: Colors.primary}}
        activeColor={Colors.primary}
        inactiveColor={'#3f3f3f88'}
        style={{
          backgroundColor: Colors.foreground,
          elevation: 0,
          borderWidth: 0,
        }}
        labelStyle={{
          fontFamily: 'SofiaPro-Bold',
        }}
      />
    );
  };

  const Pending = () => {
    return (
      <ScrollView
        refreshControl={refreshControl}
        scrollEventThrottle={1}
        onScroll={({nativeEvent}) => {
          closeToBottom(nativeEvent) && loadMoreOrders();
        }}
        contentContainerStyle={styles.rootScrollViewStyle}>
        {ongoing?.length < 1 ? (
          <Invalid name="Pending" />
        ) : (
          <>
            <FlatList
              data={ongoing}
              renderItem={({item}) => renderOrders(item, true)}
              keyExtractor={(item) => item.number}
            />
            {next && (
              <View style={{paddingVertical: 10}}>
                <Loader color={Colors.primary} />
              </View>
            )}
          </>
        )}
      </ScrollView>
    );
  };

  const Completed = () => {
    return (
      <ScrollView
        refreshControl={refreshControl}
        scrollEventThrottle={1}
        onScroll={({nativeEvent}) => {
          closeToBottom(nativeEvent) && loadMoreOrders();
        }}
        contentContainerStyle={styles.rootScrollViewStyle}>
        {completed?.length < 1 ? (
          <Invalid name="Completed" />
        ) : (
          <>
            <FlatList
              data={completed}
              renderItem={({item}) => renderOrders(item)}
              keyExtractor={(item) => item.number}
            />
            {next && (
              <View style={{paddingVertical: 10}}>
                <Loader color={Colors.primary} />
              </View>
            )}
          </>
        )}
      </ScrollView>
    );
  };

  const Cancelled = () => {
    return (
      <ScrollView
        refreshControl={refreshControl}
        scrollEventThrottle={1}
        onScroll={({nativeEvent}) => {
          closeToBottom(nativeEvent) && loadMoreOrders();
        }}
        contentContainerStyle={styles.rootScrollViewStyle}>
        {cancelled?.length < 1 ? (
          <Invalid name="Cancelled" />
        ) : (
          <>
            <FlatList
              data={cancelled}
              renderItem={({item}) => renderOrders(item)}
              keyExtractor={(item) => item.number}
            />
            {next && (
              <View style={{paddingVertical: 10}}>
                <Loader color={Colors.primary} />
              </View>
            )}
          </>
        )}
      </ScrollView>
    );
  };

  const renderScene = SceneMap({
    ongoing: Pending,
    completed: Completed,
    cancelled: Cancelled,
  });

  function renderOrders(item, pending) {
    return <OrderCard {...props} pending={pending} item={item} />;
  }

  return (
    <View style={styles.rootViewStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} />

      {loadingOrders ? (
        <Placeholder />
      ) : (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{
            width,
            height,
          }}
        />
      )}
    </View>
  );
};

// Export
export default Orders;
