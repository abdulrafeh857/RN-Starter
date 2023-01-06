// Imports
import {Image, ScrollView, View} from 'react-native';
import React, {useEffect} from 'react';
import {FontSize} from 'Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import utils from './utils';
import * as TEXT from '@Atoms/Text';

// Main functional component
const SignupLogin = (props) => {
  const {fromDash} = props.route.params;

  useEffect(() => {
    props.navigation.setOptions({
      title: utils.ScreenTitle,
    });
  });

  return (
    <View style={styles.rootViewStyle}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootScrollViewContainerStyle}>
        <View style={styles.imageContainerStyle}>
          <Image
            style={styles.imageStyle}
            resizeMode={'contain'}
            resizeMethod="resize"
            source={utils.image}
          />
        </View>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <View style={styles.tips.rootViewStyle}>
            <TEXT.Heading>{utils.ScreenTitle}</TEXT.Heading>
            <TEXT.Caption>{utils.pp}</TEXT.Caption>
          </View>
          <TouchableOpacity
            onPress={() => {
              const {navigate} = props.navigation;
              console.debug('Continue using email.');
              navigate('LoginEmail', {fromDash: fromDash});
            }}
            style={styles.item.rootViewStyle}>
            <Icon name={'mail'} color={'grey'} size={FontSize.title} />
            <TEXT.Normal myStyle={{marginLeft: 15}}>{utils.email}</TEXT.Normal>
          </TouchableOpacity>

          <TouchableOpacity
            disabled
            style={{
              ...styles.item.rootViewStyle,
              opacity: 0.7,
              justifyContent: 'space-between',
            }}>
            <View style={styles.soonContainer}>
              <Icon
                name={'logo-facebook'}
                color={'grey'}
                size={FontSize.title}
              />
              <TEXT.Normal myStyle={styles.textLeft}>
                {utils.facebook}
              </TEXT.Normal>
            </View>
            <TEXT.Caption myStyle={styles.textRight}>
              {utils.comingSoon}
            </TEXT.Caption>
          </TouchableOpacity>

          <View style={{height: 8}} />
        </View>
      </ScrollView>
    </View>
  );
};

// Export
export default SignupLogin;
