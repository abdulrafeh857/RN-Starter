// Imports
import {View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Colors, Layout} from 'Theme';
import * as TEXT from '@Atoms/Text';
import {TouchableRipple} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import {FastImage} from '@Atoms';

// Main functional component
const VendorCard = (props) => {
  const {item} = props.data;
  const {navigate} = props.navigation;
  let tag = '';
  item.tags.map((t) => (tag += t.name + ', '))[0];

  let closedMessage = 'Closed';

  let closedDay = item?.hours?.filter(
    (t) => t.weekday === new Date().getDay(),
  )[0];

  if (!closedDay) {
    closedDay = item?.opening_hours?.filter(
      (t) => t.weekday === new Date().getDay(),
    )[0];
  }

  let start = closedDay?.start?.substring(0, closedDay?.start?.length - 3);

  if (parseFloat(start) > 11) {
    start =
      parseFloat(start) -
      12 +
      start.substring(2, closedDay.start.length - 3) +
      ' pm';
  } else {
    start += ' am';
  }

  let closedTimings;

  if (start.length < 10) {
    closedTimings = '\nOpens at: ' + start;
  }

  let vendorActive = item.isActive ? item.isActive : item.is_active;

  return (
    <TouchableRipple
      disabled={!vendorActive}
      onPress={() => {
        navigate('VendorDetails', {item: item});
      }}
      style={{
        ...styles.rootViewStyle,
        opacity: vendorActive ? 1 : 0.8,
      }}>
      <>
        <View style={styles.imageContainerStyle}>
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              borderTopRightRadius: 6,
              borderTopLeftRadius: 6,
              backgroundColor: '#555d',
              zIndex: vendorActive ? 0 : 1,
            }}
          />
          {!vendorActive && (
            <View
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                borderRadius: 6,
                zIndex: 1,
                ...Layout.center,
              }}>
              <TEXT.Heading
                myStyle={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 20,
                  lineHeight: 20,
                }}>
                {closedMessage}
                {closedTimings}
              </TEXT.Heading>
            </View>
          )}
          <FastImage uri={item.image} style={styles.imageStyle} />
        </View>
        <View style={styles.textRootContainerStyle}>
          <View style={styles.textContainerStyle}>
            <TEXT.SubHeading>{item?.name}</TEXT.SubHeading>
            <TEXT.Caption>{tag.substring(0, tag.length - 2)}</TEXT.Caption>
            <View
              style={{
                marginTop: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <StarRating
                disabled
                emptyStar={'star'}
                emptyStarColor={'#1113'}
                fullStar={'star'}
                halfStar={'star-half'}
                iconSet={'MaterialIcons'}
                maxStars={5}
                starSize={14}
                rating={item.rating}
                fullStarColor={Colors.primary}
              />
              <TEXT.Caption> {item.totalRatings}</TEXT.Caption>
              <TEXT.Caption>
                {'   '}•{'   '}
              </TEXT.Caption>
              <TEXT.Caption>
                {item?.distanceFormatted ||
                  item?.distance_formatted ||
                  item?.distance + ' miles'}{' '}
                away
              </TEXT.Caption>
            </View>
          </View>
          <View style={styles.estTimeContainerView}>
            <TEXT.Time>
              {item.avgTime || item.avg_time}-{item.maxTime || item.max_time}
            </TEXT.Time>
            <TEXT.Title myStyle={{marginTop: 5}}>min</TEXT.Title>
          </View>
        </View>
      </>
    </TouchableRipple>
  );
};

// Export
export default VendorCard;
