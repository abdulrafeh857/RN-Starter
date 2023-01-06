// Imports
import {Colors} from 'Theme';
import {Dimensions, Image, View, SafeAreaView} from 'react-native';
import {VendorHeader as VendorHeaderCard, ProductHCard} from '@Molecules';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import SectionList from 'react-native-tabs-section-list';
import * as TEXT from '@Atoms/Text';
import {Divider, FloatingButton, SearchToolbar} from '@Atoms';
import Placeholder from './placeholder';
import ContentLoader from 'react-native-easy-content-loader';
import useService from './service';
import StripHtml from 'Utils/Common/StripHtml';
import {TouchableRipple} from 'react-native-paper';

const {width} = Dimensions.get('window');

// Main functional component
const VendorDetails = (props) => {
  const {data, isLoading, basket, item, searchCatalogue} = useService(props);

  const scrollViewRef = useRef();

  const isOpen = item.isActive;

  function renderProductCard(item) {
    return <ProductHCard item={item} {...props} disabled={!isOpen} />;
  }

  const headerComponent = () => {
    return (
      <View>
        <VendorHeaderCard {...props} item={item} />
        <TouchableRipple
          onPress={() => props.navigation.navigate('VendorInfo', {item: item})}
          style={styles.description.root}>
          <>
            <View style={styles.description.top}>
              <View style={styles.description.left}>
                <Icon name="info-outline" color={'#7777'} size={22} />
                <TEXT.SubHeading myStyle={styles.description.heading}>
                  ABOUT {item.name.toUpperCase()}
                  {'\n'}
                  <TEXT.Caption myStyle={styles.description.caption}>
                    Delivery hours, hygiene rating, allergens
                  </TEXT.Caption>
                </TEXT.SubHeading>
              </View>
              <View style={styles.description.right}>
                <Icon
                  name={'keyboard-arrow-right'}
                  color={Colors.primary}
                  size={24}
                />
              </View>
            </View>

            <Divider height={3} />
          </>
        </TouchableRipple>

        {isLoading && <Placeholder />}
      </View>
    );
  };

  const tabBar = (props) => {
    let bgColor = props.isActive ? Colors.primary : 'transparent';
    let activeColor = props.isActive ? '#fff' : '#9e9e9e';

    return (
      <View style={styles.tabContainer}>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: bgColor,
          }}>
          <TEXT.SubHeading
            myStyle={{
              ...styles.tabBarTitle,
              color: activeColor,
            }}>
            {props.title}
          </TEXT.SubHeading>
        </View>
      </View>
    );
  };

  const sectionHeader = ({section}) => {
    return (
      <>
        <View style={styles.sectionRoot}>
          <TEXT.Heading myStyle={styles.sectionText}>
            {section.title}
          </TEXT.Heading>
          {section.description.length > 0 && (
            <TEXT.Caption myStyle={styles.sectionCaption}>
              {StripHtml(section.description)}
            </TEXT.Caption>
          )}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.rootViewStyle}>
      <View style={styles.rootViewStyle}>
        <SearchToolbar
          placeholder={item.name}
          onBackPress={() => props.navigation.navigate('Home')}
          onChangeText={(text) => searchCatalogue(text)}
          {...props}
        />
        <View style={styles.container}>
          {(data?.length < 0 || isLoading) && (
            <ContentLoader
              active
              loading={true}
              pRows={1}
              title={false}
              pWidth={[width]}
              pHeight={[40]}
              containerStyles={{marginLeft: -10, marginTop: -5}}
            />
          )}
          {data?.length > 0 || isLoading ? (
            <SectionList
              ref={scrollViewRef}
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={styles.rootScrollStyle}
              initialNumToRender={150}
              windowSize={7}
              maxToRenderPerBatch={150}
              removeClippedSubviews={false}
              stickySectionHeadersEnabled={true}
              sections={data}
              tabBarStyle={styles.tabBar}
              ListHeaderComponent={headerComponent}
              renderTab={tabBar}
              renderSectionHeader={sectionHeader}
              renderItem={renderProductCard}
              onScrollToIndexFailed={() =>
                scrollViewRef?.current?.sectionList?.current?._wrapperListRef?._listRef?._scrollRef?.scrollToEnd()
              }
            />
          ) : (
            <View>
              <VendorHeaderCard item={item} />
              <View style={styles.errRoot}>
                <View style={styles.errChild}>
                  <Image
                    resizeMode={'contain'}
                    resizeMethod="resize"
                    source={require('@Images/no-orders.png')}
                  />
                  <TEXT.Heading style={styles.errText}>
                    No Products found!
                  </TEXT.Heading>
                </View>
              </View>
            </View>
          )}
        </View>
        {basket?.lines?.length > 0 && (
          <FloatingButton
            loading={isLoading}
            onPress={() => {
              const {navigate} = props.navigation;
              console.debug('Navigate to Basket.');
              navigate('Cart');
            }}
            text={'VIEW BASKET'}
            price={parseFloat(basket?.totalInTax)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

// Export
export default VendorDetails;
