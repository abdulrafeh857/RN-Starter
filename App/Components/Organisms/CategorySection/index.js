// Imports
import { View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Card, CategoryCard as Category } from '@Molecules';
import styles from './styles';
import utils from './utils';
import * as TEXT from '@Atoms/Text';
import getTagsService from 'Services/Tags';
import getVendorsSearchService from 'Services/VendorsSearch';

const CategorySection = props => {
  const search = props.search || false;
  const doNothing = props.doNothing || false;

  const [isLoading, setIsLoading] = useState(null);
  const [tags, setTags] = useState([
    { name: '', image: null },
    { name: '', image: null },
    { name: '', image: null },
    { name: '', image: null },
    { name: '', image: null },
    { name: '', image: null },
    { name: '', image: null },
    { name: '', image: null },
    { name: '', image: null }
  ]);

  const fetchCategoryData = name => {
    getVendorsSearchService(name)
      .then(response => {
        setIsLoading(null);

        if (search)
          props.onFetchData({ results: response.results, name: name });
        else
          props.navigation.navigate('Search', { data: response, name: name });
      })
      .catch(error => {
        setIsLoading(null);
        console.log(error.response);
      });
  };

  const renderCategories = ({ item }) => {
    const { name, image, color } = item;
    return (
      <View
        style={
          search ? styles.search.categoryContainer : styles.categoryContainer
        }>
        <Category
          loading={name === isLoading}
          color={color}
          title={name}
          image={{ uri: image ? image : null }}
          onPress={() => {
            setIsLoading(name);
            fetchCategoryData(name);
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    if (!doNothing)
      getTagsService().then(response => {
        setTags(response.data.results);
      });
  }, []);

  if (search)
    return (
      <View style={styles.search.root}>
        <Card onPress={null} style={styles.search.card}>
          <View style={styles.search.textContainer}>
            <TEXT.SubHeading>{utils.search}</TEXT.SubHeading>
          </View>
          <View style={styles.search.categoryRootContainer}>
            <FlatList
              numColumns={4}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ alignItems: 'center' }}
              renderItem={renderCategories.bind(this)}
              data={tags}
              keyExtractor={item => item.key}
            />
          </View>
        </Card>
      </View>
    );
  else
    return (
      <View style={styles.root}>
        <Card onPress={null} vPad={false} hPad={false} style={styles.card}>
          <View style={styles.categoryRootContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderCategories.bind(this)}
              contentContainerStyle={{ alignItems: 'center', paddingRight: 10 }}
              data={tags}
              keyExtractor={item => item.key}
            />
          </View>
        </Card>
      </View>
    );
};

export default CategorySection;
