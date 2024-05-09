import {} from 'react-native';
import React, { useEffect, useState } from 'react';
import { dummy } from 'Api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginSlice } from 'Store/Redux/Users';

const useService = props => {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(1);

  const user = useSelector(state => state.Users?.data);

  const dispatch = useDispatch();

  console.log('\n\n\n user in state ', user);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let resposnse = await dummy();
    console.log('\n\n\n ', resposnse?.data?.length);
    let min = Math.ceil(1);
    let max = Math.floor(data?.length);
    let m = Math.floor(Math.random() * (max - min) + min);
    setUserId(m);
    dispatch(setLoginSlice(resposnse?.data[m]));

    setData(resposnse?.data);
  };
  return { data, setData, userId, setUserId, user, getData };
};

export default useService;
