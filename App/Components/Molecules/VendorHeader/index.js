// Imports
import {View} from 'react-native';
import React from 'react';
import {Colors} from 'Theme';
import styles from './styles';
import * as TEXT from '@Atoms/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import {FastImage} from '@Atoms';

// Main functional component
const VendorHeaderCard = (props) => {
  const {item} = props;

  let tag = '';
  item.tags.map((t) => (tag += t.name + ', '))[0];

  return (
    <View style={styles.rootViewStyle}>
      <View style={styles.imageContainerStyle}>
        <FastImage uri={item.image} style={styles.imageStyle} />
      </View>
      <View style={styles.textRootContainerStyle}>
        <View style={styles.textContainerStyle}>
          <TEXT.Heading myStyle={{marginTop: 2}}>{item?.name}</TEXT.Heading>
          <TEXT.Caption myStyle={{marginTop: 4}}>
            {tag.substring(0, tag.length - 2)}
          </TEXT.Caption>
          <View style={styles.viewStyle}>
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
          <View style={styles.viewStyle}>
            <Icon name={'location-on'} color={Colors.tintGrey} size={16} />
            <TEXT.Caption> {item?.address?.place}</TEXT.Caption>
          </View>
        </View>
        <View style={styles.estTimeContainerView}>
          <TEXT.Time>
            {item.avgTime} - {item.maxTime}
          </TEXT.Time>
          <TEXT.Title myStyle={{marginTop: 5}}>min</TEXT.Title>
        </View>
      </View>
    </View>
  );
};

// Export
export default VendorHeaderCard;
