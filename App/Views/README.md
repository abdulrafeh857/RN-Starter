# Sample View Snippet

## index.js

```
//? ------------------------------------------------------------------------- */
//?                                  index.js                                 */
//? ------------------------------------------------------------------------- */

/* ----------------------------- Regular Imports ---------------------------- */
import {
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* ------------------------------- Components ------------------------------- */
import UnderDevelopment from 'Components/UnderDevelopment';

/* ---------------------------------- Hooks --------------------------------- */
import React, {useEffect, useState} from 'react';
import {useSelector, batch, useDispatch} from 'react-redux';

/* ---------------------------------- Theme --------------------------------- */
import {Colors, Gutters, FontSize, Layout, Common, Fonts} from 'Theme';

/* --------------------------------- Helpers -------------------------------- */
import utils from './utils';
import styles from './styles';

/* ------------------------------- Dimensions ------------------------------- */
const {width, height} = Dimensions.get('window');

//? ----------------------- Main Functional Component ----------------------- */
const Component = (props) => {
  /* -------------------------------- Variables ------------------------------- */
  const count = 0;

  /* ---------------------------- De-structure props -------------------------- */
  const {} = props;

  /* ---------------------------------- State --------------------------------- */
  const [state, setState] = useState({});

  /* -------------------------------- Dispatch -------------------------------- */
  const dispatch = useDispatch();

  /* -------------------------------- Selectors ------------------------------- */
  const {selector} = useSelector((state) => state.Selector);

  /* ------------------------------ Side Effects ------------------------------ */
  useEffect(() => {}, []);

  /* -------------------------------- Functions ------------------------------- */
  function execute() {}

  /* ------------------------------- return JSX ------------------------------- */
  return (
    <View style={styles.rootViewContainerStyle}>
      <ScrollView contentContainerStyle={styles.rootViewStyle}></ScrollView>
    </View>
  );
};

//? -------------------------------- Export --------------------------------- */
export default Component;
```

## utils.js

```
//? ------------------------------------------------------------------------- */
//?                                 utils.js                                  */
//? ------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */
import {Dimensions} from 'react-native';
import {Colors, Gutters, FontSize, Layout, Metrics, Fonts} from 'Theme';

/* ------------------------------- Dimensions ------------------------------- */
const {width, height} = Dimensions.get('window');

//? ----------------------------- Utils Object ------------------------------ */
const utils = {};

//? -------------------------------- Export --------------------------------- */
export default utils;
```

## styles.js

```
//? ------------------------------------------------------------------------- */
//?                                 styles.js                                 */
//? ------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */
import {Dimensions} from 'react-native';
import {Colors, Gutters, FontSize, Layout, Common, Fonts} from 'Theme';

/* ------------------------------- Dimensions ------------------------------- */
const {width, height} = Dimensions.get('window');

//? ----------------------------- Styles Object ----------------------------- */
const styles = {
  rootViewContainerStyle: {flex: 1},
  rootViewStyle: {
    paddingBottom: '1%',
    backgroundColor: Colors.background,
  },
};


//? -------------------------------- Export --------------------------------- */
export default styles;
```