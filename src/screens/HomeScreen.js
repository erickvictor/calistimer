import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../components/Button'

const HomeScreen = props => {
  return(
    <View style={Styles.container}>
      <Text style={Styles.logo}>CalisTimer</Text>
      <Button style={Styles.btn} onPress={() => props.navigation.navigate('EMOM')}>EMOM</Button>
      <Button style={Styles.btn} onPress={() => props.navigation.navigate('EMOM')}>AMRAP</Button>
      <Button style={Styles.btn} onPress={() => props.navigation.navigate('Isometria')}>Isometria</Button>
    </View>
  )
}
HomeScreen.navigationOptions = {
  header: null
}
const Styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#D6304A' 
  },
  logo: {
    fontFamily: 'Ubuntu-Bold', 
    fontSize: 42, 
    textAlign: 'center', 
    color: 'white', 
    marginTop: 30, 
    marginBottom: 111 
  },
  btn: { 
    padding: 20 
  }
})
export default HomeScreen
