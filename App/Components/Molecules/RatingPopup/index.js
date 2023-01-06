// Imports
import {View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'Theme';
import {Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import utils from './utils';
import Preferences from 'Config/preferences';
import {Loader, Feedback} from '@Atoms';
import addRatingService from 'Services/AddRating';
import StarRating from 'react-native-star-rating';

const preferences = new Preferences();

// Main functional component
const RatingPopup = (props) => {
  const notification = props?.notification || false;
  const url = notification?.data?.url || false;
  const message = notification?.data?.message || false;

  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(4);

  function ratingCompleted(rating) {
    setRating(rating);
    console.log('Rating is: ' + rating);
  }

  const hideDialog = () => setVisible(false);

  const onRate = () => {
    setLoading(true);
    addRatingService(url, rating)
      .then((status) => {
        if (status === 201) {
          preferences.removeNotification().then(() => {
            setLoading(false);
            hideDialog();
            Feedback.simple('Thank you for rating us', 'OK');
          });
        }
      })
      .catch(() => {
        setLoading(false);
        hideDialog();
      });

    setTimeout(() => {
      console.debug('Auto Dismissed.');
      setLoading(false);
      hideDialog();
    }, 10000);
  };

  const onDismiss = () => {
    setLoading(true);
    preferences.removeNotification().then(() => {
      console.debug('Notification has been removed.');
      setLoading(false);
      hideDialog();
    });
  };

  return (
    <View>
      <Portal>
        <Dialog dismissable={false} visible={visible}>
          <Dialog.Title>{message}?</Dialog.Title>
          <Dialog.Content>
            {loading ? (
              <View style={{alignItems: 'center', height: 100}}>
                <Loader color={Colors.primary} />
                <Paragraph>{utils.pleaseWait}</Paragraph>
              </View>
            ) : (
              <StarRating
                emptyStar={'star'}
                emptyStarColor={'#1113'}
                fullStar={'star'}
                halfStar={'star-half'}
                iconSet={'MaterialIcons'}
                maxStars={5}
                selectedStar={ratingCompleted}
                rating={rating}
                fullStarColor={Colors.primary}
                containerStyle={{
                  justifyContent: 'center',
                }}
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={{color: Colors.tintGrey}} onPress={onDismiss}>
              {utils.noThanks}
            </Button>
            <Button labelStyle={{color: Colors.primaryDark}} onPress={onRate}>
              {utils.rate}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

// Export
export default RatingPopup;
