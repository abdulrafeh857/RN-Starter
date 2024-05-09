import React from 'react';
import useService from './service';
import useStyles from './styles';
import { Image, View, TouchableOpacity } from 'react-native';
import { Text } from '@Atoms';
import { Screen } from '@Templates';

const Welcome = props => {
  const { onContinue } = useService(props);
  const { container, image, button } = useStyles();

  return (
    <>
      <Screen>
        <View style={container}>
          <Image
            style={image}
            resizeMethod="resize"
            resizeMode="contain"
            source={require('@Images/logo.png')}
          />
          <Text h3 center>
            Welcome to the React Native Template TS
          </Text>
          <TouchableOpacity onPress={onContinue} style={button}>
            <Text h5 center>
              Continue
            </Text>
          </TouchableOpacity>

          {/* <Button style={button} onPress={onContinue}>
            Continue
          </Button> */}
        </View>
      </Screen>
    </>
  );
};

export default Welcome;
