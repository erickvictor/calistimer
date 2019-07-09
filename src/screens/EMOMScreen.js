import React, { Component } from 'react'
import { Keyboard, ScrollView, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import Select from '../components/Select'
import Title from '../components/Title'

class EMOMScreen extends Component {
  state = {
    keyboardIsVisible: false
  }
  componentDidMount(){
    this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardIsVisible: true })
    })
    this.kbHide = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardIsVisible: false })
    })
  }
  componentWillUnmount(){
    this.kbShow.remove()
    this.kbHide.remove()
  }
  render(){
    return(
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
        <ScrollView style={styles.container}>
          <Title title='EMOM' subtitle='Every Minute on the Minute' style={{paddingTop: this.state.keyboardIsVisible ? 0 : 20}} />
          <Image style={{ alignSelf: 'center', marginBottom: 17 }} source={require('../../assets/settings-cog.png')} />
          <Select 
            label='Alertas:'
            current={0}
            options={[
              {
                id:0, 
                label: 'desligado'
              },{
                id: 15,
                label: '15s'
              },{
                id: 30,
                label: '30s'
              }, {
                id: 45,
                label: '45s'
              }
            ]} 
            onSelect = {opt => console.log('selecionado', opt)}
          />
          <Select 
            label='Contagem regressiva:'
            current={0}
            options={[{ id: 1, label: 'sim'},{ id: 0, label: 'não'}]} 
            onSelect = {opt => console.log('selecionado', opt)}
          />
          <Text style={styles.label}>Quantos minutos:</Text>
          <TextInput style={styles.input} keyboardType='numeric' value='15' />
          <Text style={styles.label}>minutos</Text>
          <Image style={{ alignSelf: 'center' }} source={require('../../assets/btn-play.png')} />
          <Text>Testar</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
EMOMScreen.navigationOptions = {
  header: null
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#D6304A',
  },
  label: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24
  },
  input: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 42
  },
})
export default EMOMScreen
