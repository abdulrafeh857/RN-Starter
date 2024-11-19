import React from 'react';
import { Text, TouchableOpacity, StatusBar, TextInput, View, Image, ProgressViewIOSComponent } from 'react-native';
import { styles } from './style';

const AppScreen = props => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} translucent={false} />
      <View>
        <Image style={styles.Logo} source={require('../../../assets/images/WL.jpg')} />
      </View>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>Are you a ?</Text>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btnMain} onPress={() => props.navigation.navigate('CustomerR')}>
          <Text style={styles.btnTxt}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnMain} onPress={() => props.navigation.navigate('RepairmanR')}>
          <Text style={styles.btnTxt}>Repairman</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AppScreen;
