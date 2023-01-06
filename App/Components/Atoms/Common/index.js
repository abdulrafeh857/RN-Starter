// Imports
import {StyleSheet} from 'react-native';

/* -------------------------------- Paddings -------------------------------- */
export const p = StyleSheet.create({
  vPad: 18,
  hPad: 8,
});

/* --------------------------------- Heights -------------------------------- */
export const h = StyleSheet.create({
  divider: 8,
});

/* --------------------------------- Margins -------------------------------- */
export const m = StyleSheet.create({});

/* --------------------------------- Shadow -------------------------------- */
export const shadow = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
