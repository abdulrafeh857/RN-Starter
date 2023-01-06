import 'react-native';
import React from 'react';
import * as Text from './index';
import renderer from 'react-test-renderer';
import {Colors} from 'Theme';

describe('Alert Component', () => {
  let mock = {};

  let instance = renderer.create().toJSON();

  it('renders correctly', () => {
    expect(instance.type).toBeTruthy();
  });
});
