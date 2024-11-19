import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { styles } from './style';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class drawer extends Component {
  state = {
    userData: null
  };

  render() {
    const _onLogout = async () => {
      this.props.navigation.navigate('Welcome');
      AsyncStorage.removeItem('user');
    };
    return (
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView>
          <View
            style={{
              height: responsiveHeight(100),
              backgroundColor: 'white'
            }}>
            <View style={styles.topview}>
              <TouchableOpacity style={styles.btnlogo1} onPress={() => this.props.navigation.closeDrawer()}>
                <Icon type={'entypo'} name={'cross'} size={responsiveFontSize(4)} />
              </TouchableOpacity>
              {/* <Text style={styles.txtsplash}>Repairman</Text> */}
            </View>
            <TouchableOpacity
              style={[styles.Btn, { marginLeft: responsiveWidth(9), marginTop: responsiveHeight(3) }]}
              onPress={() => this.props.navigation.navigate('RepairmanProfile')}>
              <Icon type={'font-awesome'} name={'home'} color={'black'} size={responsiveFontSize(3)} />
              <Text style={styles.btnText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.Btn, { marginLeft: responsiveWidth(9), marginTop: responsiveHeight(3) }]}
              onPress={() => this.props.navigation.navigate('RepairmanPro')}>
              <Icon type={'font-awesome'} name={'user'} color={'black'} size={responsiveFontSize(3)} />
              <Text style={styles.btnText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AcceptedOrders')}
              style={[styles.Btn, { marginLeft: responsiveWidth(9), marginTop: responsiveHeight(3) }]}>
              <Icon type={'material'} name={'drafts'} color={'black'} size={responsiveFontSize(3)} />
              <Text style={styles.btnText}>Accepted Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _onLogout()} style={[styles.Btn, { marginLeft: responsiveWidth(9), marginTop: responsiveHeight(3) }]}>
              <Icon type={'material'} name={'logout'} color={'red'} size={responsiveFontSize(3)} />
              <Text style={[styles.btnText, { color: 'red' }]}>Logout</Text>
            </TouchableOpacity>

            <View
              style={{
                position: 'absolute',
                bottom: 40,
                width: responsiveWidth(65),
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: responsiveFontSize(1.5),
                  marginTop: responsiveHeight(1)
                }}>
                Repairman
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontSize: responsiveFontSize(1.5),
                  marginTop: responsiveHeight(1)
                }}>
                0.0.1-beta
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                width: responsiveWidth(65),
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: responsiveFontSize(1.5),
                  marginTop: responsiveHeight(1)
                }}>
                © 2021 Repairman
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontSize: responsiveFontSize(1.5),
                  marginTop: responsiveHeight(1)
                }}>
                All Rights Reserved
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
