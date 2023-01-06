/**
 * This file contains all application's style relative to fonts
 */
import {StyleSheet} from 'react-native';
import {FontSize, Colors} from './Variables';

export default StyleSheet.create({
  heading: {
    fontSize: FontSize.heading,
    fontWeight: 'bold',
    color: Colors.text,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subTitle: {
    fontSize: FontSize.subTitle,
    color: Colors.text,
  },
  body: {
    fontSize: FontSize.body,
    color: Colors.text,
  },
  caption: {
    fontSize: FontSize.caption,
    color: Colors.text,
  },
  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
});
