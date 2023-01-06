import React from 'react';
import ContentLoader from 'react-native-easy-content-loader';
import {Dimensions} from 'react-native';
import {Divider} from '@Atoms';

const {width} = Dimensions.get('window');

const placeholder = () => (
  <>
    <ContentLoader
      active
      aShape="square"
      containerStyles={{alignItems: 'center'}}
      loading={true}
      title={false}
      pRows={1}
      pWidth={[width]}
      containerStyles={{marginLeft: -10}}
      pHeight={[50]}
    />
    <ContentLoader
      active
      aShape="square"
      containerStyles={{alignItems: 'center'}}
      loading={true}
      title={false}
      pRows={1}
      pWidth={['100%']}
      pHeight={[120]}
    />
    <Divider />
    <ContentLoader
      active
      aShape="square"
      containerStyles={{alignItems: 'center'}}
      loading={true}
      title={false}
      pRows={1}
      pWidth={['100%']}
      pHeight={[120]}
    />
    <Divider />
    <ContentLoader
      active
      aShape="square"
      containerStyles={{alignItems: 'center'}}
      loading={true}
      title={false}
      pRows={1}
      pWidth={['100%']}
      pHeight={[120]}
    />
    <Divider />
    <ContentLoader
      active
      aShape="square"
      containerStyles={{alignItems: 'center'}}
      loading={true}
      title={false}
      pRows={1}
      pWidth={['100%']}
      pHeight={[120]}
    />
    <Divider />
    <ContentLoader
      active
      aShape="square"
      containerStyles={{alignItems: 'center'}}
      loading={true}
      title={false}
      pRows={1}
      pWidth={['100%']}
      pHeight={[120]}
    />
    <Divider />
    <Divider />
  </>
);

export default placeholder;
