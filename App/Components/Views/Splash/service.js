import React, { useEffect } from 'react';

const useService = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Welcome');
    }, 2000);
  }, []);

  return {};
};

export default useService;
