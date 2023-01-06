import PropTypes from 'prop-types';
import styles from './styles';
import utils from './utils';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {FontSize, Colors} from 'Theme';
import Card from '../Card';
import * as TEXT from '@Atoms/Text';

const {height} = Dimensions.get('window');

const Section = (props) => {
  const {vendor, count, title, icon, onPress} = props;

  return (
    <View
      style={{
        ...styles.container,
        height: props.vendor ? height * 0.05 + 36 : height * 0.033 + 36,
      }}>
      <Card
        onPress={null}
        style={{
          ...styles.card,
          height: props.vendor ? height * 0.05 + 36 : height * 0.033 + 36,
        }}>
        <View
          style={{
            ...styles.root,
            height: props.vendor ? height * 0.05 : height * 0.033,
          }}>
          <View>
            <TEXT.SubHeading>{title}</TEXT.SubHeading>
            {vendor && (
              <TEXT.Caption>
                {count} {utils.sectionSubTextString}
              </TEXT.Caption>
            )}
          </View>
          <TouchableOpacity
            style={{}}
            activeOpacity={0.9}
            onPress={onPress ? onPress : null}>
            <Icon name={icon} color={Colors.text} size={FontSize.heading} />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

Section.propTypes = {
  vendor: PropTypes.bool,
  title: PropTypes.string,
  count: PropTypes.number,
  icon: PropTypes.string,
  onPress: PropTypes.func,
};

Section.defaultProps = {
  vendor: false,
  title: '',
  count: 0,
  icon: 'options',
  onPress: null,
};

export default Section;

/*
USAGE:

  <Section {...props} />

*/
