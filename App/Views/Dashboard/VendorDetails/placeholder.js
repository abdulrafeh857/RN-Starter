import React from 'react';
import ContentLoader from 'react-native-easy-content-loader';
import {Divider} from '@Atoms';

const placeholder = () => (
  <>
    <ContentLoader
      active
      aShape="square"
      loading={true}
      title={false}
      pRows={5}
      pWidth={['50%', '100%', '100%', '20%', '100%']}
      pHeight={[20, 10, 10, 12, 1]}
    />
    <Divider />
    <ContentLoader
      active
      aShape="square"
      loading={true}
      title={false}
      pRows={5}
      pWidth={['50%', '100%', '100%', '20%', '100%']}
      pHeight={[20, 10, 10, 12, 1]}
    />
    <Divider />
    <ContentLoader
      active
      aShape="square"
      loading={true}
      title={false}
      pRows={5}
      pWidth={['50%', '100%', '100%', '20%', '100%']}
      pHeight={[20, 10, 10, 12, 1]}
    />
    <Divider />
    <ContentLoader
      active
      aShape="square"
      loading={true}
      title={false}
      pRows={5}
      pWidth={['50%', '100%', '100%', '20%', '100%']}
      pHeight={[20, 10, 10, 12, 1]}
    />
    <Divider />
    <ContentLoader
      active
      aShape="square"
      loading={true}
      title={false}
      pRows={5}
      pWidth={['50%', '100%', '100%', '20%', '100%']}
      pHeight={[20, 10, 10, 12, 1]}
    />
    <Divider />
    <ContentLoader
      active
      aShape="square"
      loading={true}
      title={false}
      pRows={5}
      pWidth={['50%', '100%', '100%', '20%', '100%']}
      pHeight={[20, 10, 10, 12, 1]}
    />
    <Divider />
  </>
);

export default placeholder;
