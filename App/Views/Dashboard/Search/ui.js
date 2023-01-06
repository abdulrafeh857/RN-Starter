// Imports
import {FlatList, ScrollView, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {Colors, FontSize} from 'Theme';
import * as TEXT from '@Atoms/Text';
import {VendorCard} from '@Molecules';
import useService from './service';
import {CategorySection} from '@Organisms';
import {SearchToolbar} from '@Atoms';

// Main functional component
const Search = (props) => {
  const {filterData, data, searchString, onFetchData} = useService(props);

  const autoFocus = props.route.params?.autoFocus || false;

  function renderVendorCard(item) {
    return <VendorCard data={item} navigation={props.navigation} />;
  }

  return (
    <View style={styles.rootViewStyle}>
      <SearchToolbar
        placeholder="Search Restaurants"
        autoFocus={autoFocus}
        onChangeText={(text) => filterData(text)}
        {...props}
      />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.rootScrollContainerStyle}>
        {data && data.length > 0 ? (
          <View style={styles.section.root}>
            <View style={styles.section.child}>
              <View>
                <TEXT.SubHeading>Restaurants</TEXT.SubHeading>
                <TEXT.Caption>{data.length} results found</TEXT.Caption>
              </View>
              {/* Currently hidden */}
              {process.env.NODE_ENV !== 'production' && (
                <TouchableOpacity activeOpacity={0.9}>
                  <Icon1
                    name={'options'}
                    color={Colors.text}
                    size={FontSize.heading}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.noSearchRoot}>
            <View style={styles.topSectionContainerStyle}>
              {data !== null ? (
                <>
                  <TEXT.Caption>
                    We couldn't find anything for "{searchString}"
                  </TEXT.Caption>
                  <TEXT.Caption>Try a different search</TEXT.Caption>
                </>
              ) : (
                <>
                  <TEXT.Caption>Start typing to search</TEXT.Caption>
                  <TEXT.Caption>or</TEXT.Caption>
                </>
              )}
            </View>
            <View style={styles.browseCategoryRoot}>
              <CategorySection
                onFetchData={onFetchData}
                search={true}
                {...props}
              />
            </View>
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.vendorCard.contentContainerStyle}
          renderItem={renderVendorCard.bind(this)}
          data={data}
          keyExtractor={(item) => item.key}
        />
      </ScrollView>
    </View>
  );
};

// Export
export default Search;
