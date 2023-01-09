// Imports
import { FlatList, View, StatusBar, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { Loader, Screen, Alert } from '@Atoms';
import { CategorySection, Header, LocationInvalid } from '@Organisms';
import {
  Section,
  Swiper,
  VendorCard,
  RatingPopup,
  OngoingOrders
} from '@Molecules';
import Placeholder from './placeholder';
import useService from './service';
import closeToBottom from 'Utils/Common/CloseToBottom';
import { Colors } from 'Theme';

// Main functional component
const Home = props => {
  const {
    vendorData,
    loadingVendors,
    next,
    ongoing,
    notification,
    refreshControl,
    loadMoreVendors
  } = useService();

  function renderVendorCard(item) {
    return <VendorCard data={item} navigation={props.navigation} />;
  }

  let renderLocationInvalid = () => (
    <>
      <Section title="Sorry, we're not there yet" icon={null} />
      <LocationInvalid {...props} />
    </>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />

      <Alert />

      <Screen
        refreshControl={refreshControl}
        scrollEventThrottle={1}
        onScroll={({ nativeEvent }) => {
          closeToBottom(nativeEvent) && loadMoreVendors();
        }}>
        <Header {...props} />

        {notification && <RatingPopup notification={notification} />}

        {loadingVendors ? (
          // Loading State
          <Placeholder {...props} />
        ) : // <Text>wfegrtgnhtrewrghn</Text>
        vendorData?.length === 0 ? (
          // Invalid State
          renderLocationInvalid()
        ) : (
          // Valid State
          <>
            <Swiper {...props} />

            <CategorySection {...props} />

            <OngoingOrders {...props} ongoing={ongoing} />

            <Section title="Takeaways" icon={null} />
            {vendorData && vendorData.length > 0 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.vendorListItemStyle}
                contentContainerStyle={styles.vendorListStyle}
                renderItem={renderVendorCard.bind(this)}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                data={vendorData}
              />
            )}
            {next && (
              <View style={{ paddingVertical: 10 }}>
                <Loader color={Colors.primary} />
              </View>
            )}
          </>
        )}
      </Screen>
    </>
  );
};

// Export
export default Home;
