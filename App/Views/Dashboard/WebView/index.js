// Imports
import {View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Toolbar, Loader} from '@Atoms';
import {WebView as RNWebView} from 'react-native-webview';

// Main functional component
const WebView = (props) => {
  const {url, title} = props.route.params;
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.rootViewStyle}>
      <Toolbar {...props} title={title} />

      {loading && (
        <View style={styles.loaderStyle}>
          <Loader color={styles.loader} />
        </View>
      )}

      <RNWebView onLoadEnd={() => setLoading(false)} source={{uri: url}} />
    </View>
  );
};

// Export
export default WebView;
