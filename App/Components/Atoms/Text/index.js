import {Text} from 'react-native';
import React from 'react';
import {Colors} from 'Theme';

const Heading = (props) => {
  const {children, myStyle} = props;
  return (
    <Text
      style={{
        fontFamily: 'SofiaPro-Bold',
        color: '#3f3f3f',
        fontSize: 22,
        lineHeight: 22,
        ...myStyle,
      }}
      {...props}>
      {children}
    </Text>
  );
};

const SubHeading = (props) => {
  const {children, myStyle} = props;
  return (
    <Text
      style={{
        fontFamily: 'SofiaPro-SemiBold',
        color: '#3f3f3f',
        fontSize: 18,
        lineHeight: 18,
        ...myStyle,
      }}
      {...props}>
      {children}
    </Text>
  );
};

const Title = (props) => {
  const {children, myStyle} = props;
  return (
    <Text
      style={{
        fontFamily: 'SofiaPro',
        color: '#3f3f3f',
        fontSize: 18,
        lineHeight: 18,
        ...myStyle,
      }}
      {...props}>
      {children}
    </Text>
  );
};

const Price = (props) => {
  const {children, myStyle} = props;
  return (
    <Text
      style={{
        fontFamily: 'SofiaPro',
        color: Colors.primary,
        fontSize: 17,
        lineHeight: 17,
        ...myStyle,
      }}
      {...props}>
      £{children}
    </Text>
  );
};

const Normal = (props) => {
  const {children, myStyle} = props;
  return (
    <Text
      style={{
        fontFamily: 'SofiaPro',
        fontSize: 15,
        lineHeight: 15,
        color: '#3f3f3f',
        ...myStyle,
      }}
      {...props}>
      {children}
    </Text>
  );
};

const Time = (props) => {
  const {children, myStyle} = props;
  return (
    <Text
      style={{
        fontFamily: 'SofiaPro',
        fontSize: 18,
        lineHeight: 18,
        color: Colors.primary,
        ...myStyle,
      }}
      {...props}>
      {children}
    </Text>
  );
};

const Caption = (props) => {
  const {children, myStyle} = props;
  return (
    <Text
      style={{
        fontFamily: 'SofiaPro-Light',
        color: '#1119',
        fontSize: 15,
        lineHeight: 15,
        ...myStyle,
      }}
      {...props}>
      {children}
    </Text>
  );
};

export {Price, Caption, Heading, SubHeading, Title, Time, Normal};
