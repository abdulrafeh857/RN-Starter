import 'react-native';
import React from 'react';
import * as Text from './index';
import renderer from 'react-test-renderer';
import {Colors} from 'Theme';

describe('Text Heading Component', () => {
  let mock = {
    text: 'This is a test string',
    style: {
      fontFamily: 'SofiaPro-Bold',
      color: '#3f3f3f',
      fontSize: 22,
      lineHeight: 22,
    },
    myStyle: {
      color: 'green',
    },
  };

  let instance = renderer
    .create(<TEXT.Heading>{mock.text}</TEXT.Heading>)
    .toJSON();

  it('renders correctly', () => {
    expect(instance.type).toBeTruthy();
    expect(instance.props).toBeTruthy();
    expect(instance.children).toBeTruthy();
  });

  it('renders text', () => {
    expect(instance.children[0]).toBe(mock.text);
  });

  it('has styles', () => {
    expect(instance.props.style).toMatchObject(mock.style);
  });

  it('accepts custom styles', () => {
    let instance = renderer
      .create(<TEXT.Heading myStyle={mock.myStyle}>{mock.text}</TEXT.Heading>)
      .toJSON();
    expect(instance.props.myStyle).toMatchObject(mock.myStyle);
  });
});

describe('Text SubHeading Component', () => {
  let mock = {
    text: 'This is a test string',
    style: {
      fontFamily: 'SofiaPro-SemiBold',
      color: '#3f3f3f',
      fontSize: 18,
      lineHeight: 18,
    },
    myStyle: {
      color: 'green',
    },
  };

  let instance = renderer
    .create(<TEXT.SubHeading>{mock.text}</TEXT.SubHeading>)
    .toJSON();

  it('renders correctly', () => {
    expect(instance.type).toBeTruthy();
    expect(instance.props).toBeTruthy();
    expect(instance.children).toBeTruthy();
  });

  it('renders text', () => {
    expect(instance.children[0]).toBe(mock.text);
  });

  it('has styles', () => {
    expect(instance.props.style).toMatchObject(mock.style);
  });

  it('accepts custom styles', () => {
    let instance = renderer
      .create(
        <TEXT.SubHeading myStyle={mock.myStyle}>{mock.text}</TEXT.SubHeading>,
      )
      .toJSON();
    expect(instance.props.myStyle).toMatchObject(mock.myStyle);
  });
});

describe('Text Title Component', () => {
  let mock = {
    text: 'This is a test string',
    style: {
      fontFamily: 'SofiaPro',
      color: '#3f3f3f',
      fontSize: 18,
      lineHeight: 18,
    },
    myStyle: {
      color: 'green',
    },
  };

  let instance = renderer.create(<TEXT.Title>{mock.text}</TEXT.Title>).toJSON();

  it('renders correctly', () => {
    expect(instance.type).toBeTruthy();
    expect(instance.props).toBeTruthy();
    expect(instance.children).toBeTruthy();
  });

  it('renders text', () => {
    expect(instance.children[0]).toBe(mock.text);
  });

  it('has styles', () => {
    expect(instance.props.style).toMatchObject(mock.style);
  });

  it('accepts custom styles', () => {
    let instance = renderer
      .create(<TEXT.Title myStyle={mock.myStyle}>{mock.text}</TEXT.Title>)
      .toJSON();
    expect(instance.props.myStyle).toMatchObject(mock.myStyle);
  });
});

describe('Text Price Component', () => {
  let mock = {
    text: '10.15',
    style: {
      fontFamily: 'SofiaPro',
      color: Colors.primary,
      fontSize: 17,
      lineHeight: 17,
    },
    myStyle: {
      color: 'green',
    },
  };

  let instance = renderer.create(<TEXT.Price>{mock.text}</TEXT.Price>).toJSON();

  it('renders correctly', () => {
    expect(instance.type).toBeTruthy();
    expect(instance.props).toBeTruthy();
    expect(instance.children).toBeTruthy();
  });

  it('renders text', () => {
    expect(instance.children[0] + instance.children[1]).toBe('£' + mock.text);
  });

  it('has styles', () => {
    expect(instance.props.style).toMatchObject(mock.style);
  });

  it('accepts custom styles', () => {
    let instance = renderer
      .create(<TEXT.Price myStyle={mock.myStyle}>{mock.text}</TEXT.Price>)
      .toJSON();
    expect(instance.props.myStyle).toMatchObject(mock.myStyle);
  });
});

describe('Text Normal Component', () => {
  let mock = {
    text: 'This is a test string',
    style: {
      fontFamily: 'SofiaPro',
      fontSize: 15,
      lineHeight: 15,
      color: '#3f3f3f',
    },
    myStyle: {
      color: 'green',
    },
  };

  let instance = renderer
    .create(<TEXT.Normal>{mock.text}</TEXT.Normal>)
    .toJSON();

  it('renders correctly', () => {
    expect(instance.type).toBeTruthy();
    expect(instance.props).toBeTruthy();
    expect(instance.children).toBeTruthy();
  });

  it('renders text', () => {
    expect(instance.children[0]).toBe(mock.text);
  });

  it('has styles', () => {
    expect(instance.props.style).toMatchObject(mock.style);
  });

  it('accepts custom styles', () => {
    let instance = renderer
      .create(<TEXT.Normal myStyle={mock.myStyle}>{mock.text}</TEXT.Normal>)
      .toJSON();
    expect(instance.props.myStyle).toMatchObject(mock.myStyle);
  });
});

describe('Text Time Component', () => {
  let mock = {
    text: 'This is a test string',
    style: {
      fontFamily: 'SofiaPro',
      fontSize: 18,
      lineHeight: 18,
      color: Colors.primary,
    },
    myStyle: {
      color: 'green',
    },
  };

  let instance = renderer.create(<TEXT.Time>{mock.text}</TEXT.Time>).toJSON();

  it('renders correctly', () => {
    expect(instance.type).toBeTruthy();
    expect(instance.props).toBeTruthy();
    expect(instance.children).toBeTruthy();
  });

  it('renders text', () => {
    expect(instance.children[0]).toBe(mock.text);
  });

  it('has styles', () => {
    expect(instance.props.style).toMatchObject(mock.style);
  });

  it('accepts custom styles', () => {
    let instance = renderer
      .create(<TEXT.Time myStyle={mock.myStyle}>{mock.text}</TEXT.Time>)
      .toJSON();
    expect(instance.props.myStyle).toMatchObject(mock.myStyle);
  });
});

describe('Text Caption Component', () => {
  let mock = {
    text: 'This is a test string',
    style: {
      fontFamily: 'SofiaPro-Light',
      color: '#1119',
      fontSize: 15,
      lineHeight: 15,
    },
    myStyle: {
      color: 'green',
    },
  };

  let instance = renderer
    .create(<TEXT.Caption>{mock.text}</TEXT.Caption>)
    .toJSON();

  it('renders correctly', () => {
    expect(instance.type).toBeTruthy();
    expect(instance.props).toBeTruthy();
    expect(instance.children).toBeTruthy();
  });

  it('renders text', () => {
    expect(instance.children[0]).toBe(mock.text);
  });

  it('has styles', () => {
    expect(instance.props.style).toMatchObject(mock.style);
  });

  it('accepts custom styles', () => {
    let instance = renderer
      .create(<TEXT.Caption myStyle={mock.myStyle}>{mock.text}</TEXT.Caption>)
      .toJSON();
    expect(instance.props.myStyle).toMatchObject(mock.myStyle);
  });
});
