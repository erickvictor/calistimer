import React, { Component } from 'react'
import { View, Keyboard, ScrollView, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import Select from '../components/Select'
import Title from '../components/Title'
import Time from '../components/Time'
import ProgressBar from '../components/ProgressBar'
import BackgroundProgress from '../components/BackgroundProgress'
import Sound from 'react-native-sound'

const alert = require('../../assets/sounds/alert.wav')

class IsometriaScreen extends Component {
  state = {
    keyboardIsVisible: false,

    goal: 1,
    countdown: 1,
    time: '20',

    isRunning: false,
    countdownValue: 0,
    count: 0
  }
  componentDidMount(){
    Sound.setCategory('Playback', true)
    this.alert = new Sound(alert)

    this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ keyboardIsVisible: true })
    })
    this.kbHide = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ keyboardIsVisible: false })
    })
    //this.play()
  }
  componentWillUnmount(){
    this.kbShow.remove()
    this.kbHide.remove()
  }
  playAlert = () => {
    const resto = 0
    if(resto>=55 && resto <60){
      this.alert.play()
    }
  }
  stop = () => {
    clearInterval(this.countdownTimer)
    clearInterval(this.countTimer)
    this.setState({ isRunning: false })
  }
  play = () => {
    this.setState({
      count: 0,
      countdownValue: 5,
    })
    this.setState({ isRunning: true })
    const count = () => {
      this.setState({ count: this.state.count + 1 }, () => {
        this.playAlert()
        if(this.state.count === parseInt(this.state.time)){
          clearInterval(this.countTimer)
        }
      })
    }
    
    this.alert.play()
    this.countdownTimer = setInterval(() => {
      this.alert.play()
      this.setState({ countdownValue: this.state.countdownValue - 1 }, () => {
        if(this.state.countdownValue === 0){
          clearInterval(this.countdownTimer)
          this.countTimer = setInterval(count, 1000)
        }
      })
    }, 1000)
  }
  render(){
    if(this.state.isRunning){
      const percMinute = parseInt(((this.state.count)/parseInt(this.state.time))*100)
      return(
        <BackgroundProgress percentage={percMinute}>
          <View style={{  flex: 1, justifyContent: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Title title='Isometria' style={{ paddingTop: 50 }} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Time time={this.state.count} />
              <Time time={parseInt(this.state.time)-this.state.count} type='text2' appendedText={' restantes'} />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              {
                this.state.countdownValue > 0 ?
                <Text style={styles.countdown}>{this.state.countdownValue}</Text>
                : null
              }
              <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 10 }} onPress={this.stop}>
                <Image source={require('../../assets/btn-stop.png')} />
              </TouchableOpacity>              
            </View>
          </View>
        </BackgroundProgress>
      )
    }
    return(
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
        <ScrollView style={styles.container}>
          <Title title='Isometria' style={{paddingTop: this.state.keyboardIsVisible ? 0 : 20}} />
          <Image style={{ alignSelf: 'center', marginBottom: 17 }} source={require('../../assets/settings-cog.png')} />
          <Select 
            label='Objetivo:'
            current={this.state.goal}
            options={[
              {
                id:0, 
                label: 'livre'
              },{
                id: 1,
                label: 'bater tempo'
              },
            ]} 
            onSelect = {opt => this.setState({ goal: opt })}
          />
          <Text style={styles.label}>Quantos segundos:</Text>
          <TextInput style={styles.input} keyboardType='numeric' value={this.state.time} onChangeText={ text => this.setState({ time: text }) } />
          <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.play}>
            <Image source={require('../../assets/btn-play.png')} />
          </TouchableOpacity>
          <Text>Testar</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
IsometriaScreen.navigationOptions = {
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
  countdown: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 94,
    textAlign: 'center',
    color: 'white',
  },
})
export default IsometriaScreen
