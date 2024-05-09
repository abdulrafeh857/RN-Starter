import React from 'react';
import useService from './service';
import useStyles from './styles';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@Atoms';
import { Button } from '@Molecules';
import { Screen } from '@Templates';

const User = props => {
  const { data, userId, setUserId, user, getData } = useService(props);
  const { button, root, text } = useStyles();
  return (
    <Screen>
      <View style={root}>
        <Text h3 w4>
          Random User:
        </Text>
        <View>
          <Text style={text}>{data[userId]?.name}</Text>
          <Text style={text}>{data[userId]?.username}</Text>
        </View>
        <TouchableOpacity
          style={button}
          onPress={() => {
            getData();
          }}>
          <Text h5>Get Random User</Text>
        </TouchableOpacity>

        <Text>User From Redux: {JSON.stringify(user, null, 6)}</Text>

        {/* <Button
          style={button}
          onPress={() => {
            let min = Math.ceil(1);
            let max = Math.floor(data?.length);
            let m = Math.floor(Math.random() * (max - min) + min);
            setUserId(m);
          }}>
          Get Random User
        </Button> */}
      </View>
    </Screen>
  );
};

export default User;
