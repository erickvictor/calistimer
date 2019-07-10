import React, { Component } from 'react'
import { View, Keyboard, ScrollView, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import Select from '../components/Select'
import Title from '../components/Title'
import Time from '../components/Time'
import ProgressBar from '../components/ProgressBar'
import BackgroundProgress from '../components/BackgroundProgress'

class EMOMScreen extends Component {
  state = {
    keyboardIsVisible: false,

    alerts: 0,
    countdown: 1,
    time: '2',

    isRunning: false,
    countdownValue: 5,
    count: 0
  }
  componentDidMount(){
    this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardIsVisible: true })
    })
    this.kbHide = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardIsVisible: false })
    })
    this.play()
  }
  componentWillUnmount(){
    this.kbShow.remove()
    this.kbHide.remove()
  }
  play = () => {
    this.setState({ isRunning: true })
    const count = () => {
      this.setState({ count: this.state.count + 1 }, () => {
        if(this.state.count === parseInt(this.state.time)*60){
          clearInterval(this.countTimer)
        }
      })
    }
    if(this.state.countdown === 1){
      this.countdownTimer = setInterval(() => {
        this.setState({ countdownValue: this.state.countdownValue - 1 }, () => {
          if(this.state.countdownValue === 0){
            clearInterval(this.countdownTimer)
            this.countTimer = setInterval(count, 100)
          }
        })
      }, 1000)
    }else{
      this.countTimer = setInterval(count, 100)
    }

  }
  render(){
    if(this.state.isRunning){
      const percMinute = parseInt(((this.state.count % 60)/60)*100)
      const percTime = parseInt(((this.state.count/60) / parseInt(this.state.time))*100)
      return(
        <BackgroundProgress percentage={percMinute}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Countdown: {this.state.countdownValue}</Text>
            <Text>Count: {this.state.count}</Text>
            <Time time={this.state.count} />
            <ProgressBar percentage={percTime} />
            <Time time={parseInt(this.state.time)*60-this.state.count} type='text2' appendedText={' restantes'} />
            <Text>Minute: {percMinute}</Text>
            <Text>Time: {percTime}</Text>
          </View>
        </BackgroundProgress>
      )
    }
    return(
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
        <ScrollView style={styles.container}>
          <Title title='EMOM' subtitle='Every Minute on the Minute' style={{paddingTop: this.state.keyboardIsVisible ? 0 : 20}} />
          <Image style={{ alignSelf: 'center', marginBottom: 17 }} source={require('../../assets/settings-cog.png')} />
          <Select 
            label='Alertas:'
            current={this.state.alerts}
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
            onSelect = {opt => this.setState({ alerts: opt })}
          />
          <Select 
            label='Contagem regressiva:'
            current={this.state.countdown}
            options={[{ id: 1, label: 'sim'},{ id: 0, label: 'não'}]} 
            onSelect = {opt => this.setState({ countdown: opt })}
          />
          <Text style={styles.label}>Quantos minutos:</Text>
          <TextInput style={styles.input} keyboardType='numeric' value={this.state.time} onChangeText={ text => this.setState({ time: text }) } />
          <Text style={styles.label}>minutos</Text>
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.play}>
            <Image source={require('../../assets/btn-play.png')} />
          </TouchableOpacity>
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
