import * as React from 'react';
import {Appbar} from 'react-native-paper';
import styles from './styles';
import {Colors} from 'Theme';
import {isIos} from 'Platform';
import {CommonActions} from '@react-navigation/native';

const Toolbar = (props) => {
  const {title, navigate, reset, params, cross} = props;

  const {navigation, route} = props;

  let _title = title || route?.name;

  let _backOnPress = () => {
    if (navigate) {
      navigation.navigate(navigate, params);
    } else if (reset) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: reset, params: params}],
        }),
      );
    } else {
      navigation.pop();
    }
  };

  let color = Colors.text;
  const leftArrow = isIos ? 'chevron-left' : 'arrow-left';

  return (
    <Appbar.Header style={styles.root}>
      <Appbar.Action
        style={{zIndex: 1}}
        size={isIos ? 28 : 24}
        icon={cross ? 'close' : leftArrow}
        color={color}
        onPress={_backOnPress}
      />
      <Appbar.Content
        titleStyle={styles.title}
        color={color}
        title={_title}
        style={isIos && styles.container}
      />
    </Appbar.Header>
  );
};

export default Toolbar;

/* 
Usage: 

<Toolbar
  {...props}
  title="Home Screen"
  navigate="SelectLocation"
  params={{}}
  reset="SelectLocation"
  cross
/>

*/
