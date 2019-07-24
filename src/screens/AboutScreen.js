import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const AboutScreen = props => {
  const back = () => {
    props.navigation.goBack()
  }
  return(
    <View style={Styles.container}>
      <Text style={Styles.logo}>CalisTimer</Text>
      <Text style={Styles.description}>Este aplicativo foi construido durante as aulas do curso de ReactJS/React-Native do DevPleno, o devReactJS nos modulos de React-native.</Text>
      <TouchableOpacity onPress={back}>
        <Image source={require('../../assets/left-arrow.png')} />
      </TouchableOpacity>
    </View>
  )
}
AboutScreen.navigationOptions = {
  header: null
}
const Styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#D6304A',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'Ubuntu-Bold', 
    fontSize: 42, 
    textAlign: 'center', 
    color: 'white', 
    marginTop: 30, 
    marginBottom: 111 
  },
  description: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    color: 'white',
    margin: 32
  },
})
export default AboutScreen
