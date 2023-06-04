import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';

const useService = props => {
  const f = useIsFocused();
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Welcome');
    }, 2000);
  }, [f]);

  return {};
};

export default useService;
