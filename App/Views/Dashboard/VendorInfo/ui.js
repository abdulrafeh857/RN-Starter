// Imports
import {Colors} from 'Theme';
import {ScrollView, View, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as TEXT from '@Atoms/Text';
import styles from './styles';
import utils from './utils';
import {Divider, Toolbar} from '@Atoms';
import {DataTable} from 'react-native-paper';

// Main functional component
const VendorInfo = (props) => {
  const item = props.route.params.item;

  const getDay = (day) => {
    switch (day) {
      case 1:
        return 'Monday';
        break;
      case 2:
        return 'Tuesday';
        break;
      case 3:
        return 'Wednesday';
        break;
      case 4:
        return 'Thursday';
        break;
      case 5:
        return 'Friday';
        break;
      case 6:
        return 'Saturday';
        break;
      case 7:
        return 'Sunday';
        break;
    }
  };

  return (
    <View style={styles.rootViewContainerStyle}>
      <Toolbar {...props} title={utils.ScreenTitle} cross />

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootViewStyle}>
        <Divider />
        <View style={styles.root}>
          <TEXT.SubHeading>{utils.hours}</TEXT.SubHeading>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Days</DataTable.Title>
              <DataTable.Title numeric>Timings</DataTable.Title>
            </DataTable.Header>

            {item?.hours?.map((hour) => {
              let start = hour.start.substring(0, hour.start.length - 3);
              let end = hour.end.substring(0, hour.end.length - 3);

              if (parseFloat(end) > 11) {
                end =
                  parseFloat(end) -
                  12 +
                  end.substring(2, hour.end.length - 3) +
                  ' pm';
              } else {
                end += ' am';
              }

              if (parseFloat(start) > 11) {
                start =
                  parseFloat(start) -
                  12 +
                  start.substring(2, hour.start.length - 3) +
                  ' pm';
              } else {
                start += ' am';
              }

              return (
                <DataTable.Row>
                  <DataTable.Cell>
                    <TEXT.Normal
                      myStyle={{
                        color:
                          new Date().getDay() === hour.weekday
                            ? Colors.primary
                            : Colors.text,
                      }}>
                      {getDay(hour.weekday)}
                    </TEXT.Normal>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <TEXT.Normal
                      myStyle={{
                        color:
                          new Date().getDay() === hour.weekday
                            ? Colors.primary
                            : Colors.text,
                      }}>
                      {start} - {end}
                    </TEXT.Normal>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
        <Divider />
        <View style={styles.root}>
          <TEXT.SubHeading>
            {utils.hygieneTitle} ({item.hygieneRating}/5)
          </TEXT.SubHeading>
          <TEXT.Caption myStyle={styles.padTop}>
            {item.hygieneDescription}
          </TEXT.Caption>
        </View>
        <Divider />
        <View style={styles.root}>
          <TEXT.SubHeading>{utils.allergensTitle}</TEXT.SubHeading>
          <TEXT.Caption myStyle={styles.padTop}>{item.question}</TEXT.Caption>
          <View style={styles.row}>
            <Icon name="phone" size={14} color={Colors.primaryDark} />
            <TEXT.Normal myStyle={styles.padColored}>
              {utils.allergensContact} {item.phone}
            </TEXT.Normal>
          </View>
        </View>
        <Divider />
        <View style={styles.root}>
          <TEXT.SubHeading>{utils.moreTitle}</TEXT.SubHeading>
          <TEXT.Caption myStyle={styles.padTop}>
            {item.description}
          </TEXT.Caption>
        </View>
        <Divider />
        <View style={styles.root}>
          <TEXT.SubHeading>{utils.notesTitle}</TEXT.SubHeading>
          <TEXT.Caption myStyle={styles.padTop}>{item.notes}</TEXT.Caption>
        </View>
      </ScrollView>
    </View>
  );
};

// Export
export default VendorInfo;
