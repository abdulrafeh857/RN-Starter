import {} from 'react-native';
import { StackScreenProps } from '@Navigation/Stack/types';
import { fetchUsers, selectUserById } from '@Redux/Users';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { RootState } from '@Redux';
import { dummy } from 'Api';

const useService = props => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let resposnse = await dummy();
    console.log('\n\n\n ', resposnse?.data?.length);
    setData(resposnse?.data);
  };
  return { data, setData, userId, setUserId };
};

export default useService;
