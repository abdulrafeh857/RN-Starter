import styles from './styles';
import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import getBannersService from 'Services/Banners';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {TouchableRipple} from 'react-native-paper';

const {width} = Dimensions.get('window');

const renderSwiper = (item, parallaxProps) => {
  const banner = item.item;

  return (
    <TouchableRipple
      onPress={() => {
        console.log('Pressed');
      }}
      style={styles.banner}>
      <>
        <ParallaxImage
          style={{resizeMode: 'contain'}}
          containerStyle={styles.imageStyle}
          resizeMode={'contain'}
          source={{uri: banner.image}}
          parallaxFactor={0.75}
          {...parallaxProps}
        />
      </>
    </TouchableRipple>
  );
};

const _Swiper = () => {
  const [banners, setBanners] = useState([{}, {}, {}]);

  useEffect(() => {
    getBannersService().then((response) => {
      setBanners(response.data.results);
    });
  }, []);

  return (
    <Carousel
      data={banners}
      renderItem={renderSwiper}
      sliderWidth={width}
      itemWidth={width - 60}
      hasParallaxImages={true}
      layout="default"
      loop
      autoplay
      autoplayInterval={4000}
    />
  );
};

export default _Swiper;
