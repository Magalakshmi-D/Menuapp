import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, LayoutAnimation, Modal, } from 'react-native'
import React from 'react'
import { COLORS, assets } from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

export const CustomButton = ({ title, onPress, iconName, margin, Styles }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // activeOpacity={0.7}
      style={[
        {
          width: 130,
          height: 40,
          backgroundColor: 'lightblue',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderRadius: 20
        }, Styles]}>
      <Text style={{
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
      }} >{title} </Text>
      <AntDesign name={'logout'} size={20} color={'white'} />
    </TouchableOpacity >
  )
}

export const toPascalCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join(' ');

export const CustomModal = ({ showModal, setShowModal, message, route, routeMsg }) => {
  return (
    <Modal visible={showModal}
      transparent
      onRequestclose={() => setShowModal(false)
      }
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' }} >
        <View style={{
          height: 200, width: 300, backgroundColor: '#999',
          borderWidth: 1, borderColor: 'black', borderRadius: 10,
          backgroundColor: '#ffffff', alignItems: 'center',
        }} >
          <AntDesign name={'closecircleo'} size={20} color={'black'} style={{ position: 'absolute', top: 10, right: 10 }}
            onPress={() => {
              setShowModal(false)
              // navigation.navigate('Login')
            }}
          />
          <EvilIcons name={'check'} size={50} color={'green'} style={{ marginTop: 20, marginBottom: 10 }} />
          <Text style={{ color: 'black', fontSize: 26, textAlign: 'center' }} >Awesome!</Text>
          <Text style={{ color: 'green', fontSize: 12, textAlign: 'center', paddingTop: 10 }} >{message}</Text>
          <TouchableOpacity
            style={{ height: 30, width: 125, backgroundColor: '#0366b1', alignItems: 'center', justifyContent: 'center', borderRadius: 15, position: 'absolute', bottom: 10 }}
            onPress={() => {
              setShowModal(false)
              navigation.navigate(route)
            }}
          >
            <Text style={{ color: 'white', padding: 5 }} >{routeMsg}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export const DropDown = ({data}) => {

  return (
    <View style={styles.container} >
      <TouchableOpacity
      activeOpacity={0.8}
        style={styles.dropDownStyle}
      >
        <Text>Choose an options</Text>
        <Feather name={'chevron-down'} />
      </TouchableOpacity>
      {data.map((item, index) => {
        return (
          <Text>{item.fruit}</Text>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  dropDownStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
    borderRadius: 6,
    minHeight: 42,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  }
})


