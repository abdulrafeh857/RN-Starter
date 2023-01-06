import React from 'react';
import {Dimensions} from 'react-native';
import ContentLoader from 'react-native-easy-content-loader';
import {CategorySection} from '@Organisms';

const {width, height} = Dimensions.get('window');

const placeholder = (props) => (
  <>
    <ContentLoader
      active
      loading={true}
      title={false}
      pRows={1}
      pWidth={['100%']}
      pHeight={[height * 0.233]}
    />
    <CategorySection doNothing {...props} />
    <ContentLoader
      active
      loading={true}
      title={false}
      pRows={1}
      pWidth={[width]}
      pHeight={[height * 0.075]}
      containerStyles={{marginLeft: -10}}
    />
    <ContentLoader
      active
      loading={true}
      title={false}
      pRows={1}
      pWidth={['100%']}
      pHeight={[height * 0.225]}
    />
    <ContentLoader
      active
      avatar
      reverse
      title={false}
      aShape="square"
      loading={true}
      containerStyles={{alignItems: 'center'}}
      pRows={3}
      pWidth={['50%']}
      pHeight={[15]}
    />
    <ContentLoader
      active
      loading={true}
      title={false}
      pRows={1}
      pWidth={['100%']}
      pHeight={[height * 0.225]}
    />
    <ContentLoader
      active
      avatar
      reverse
      title={false}
      aShape="square"
      loading={true}
      containerStyles={{alignItems: 'center'}}
      pRows={3}
      pWidth={['50%']}
      pHeight={[15]}
    />
    <ContentLoader
      active
      loading={true}
      title={false}
      pRows={1}
      pWidth={['100%']}
      pHeight={[height * 0.225]}
    />
    <ContentLoader
      active
      avatar
      reverse
      title={false}
      aShape="square"
      loading={true}
      containerStyles={{alignItems: 'center'}}
      pRows={3}
      pWidth={['50%']}
      pHeight={[15]}
    />
  </>
);

export default placeholder;
