import FastImage from 'react-native-fast-image';
import React from 'react';

const _FastImage = (props) => {
  const {style, uri, contain} = props;

  return (
    <FastImage
      style={[style]}
      source={{
        uri: uri,
        headers: {},
        priority: FastImage.priority.normal,
      }}
      resizeMode={
        contain ? FastImage.resizeMode.contain : FastImage.resizeMode.cover
      }
    />
  );
};

export default _FastImage;
