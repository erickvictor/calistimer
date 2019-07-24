import React, { Component } from 'react'
import { View, Keyboard, ScrollView, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import Select from '../components/Select'
import Title from '../components/Title'
import Time from '../components/Time'
import ProgressBar from '../components/ProgressBar'
import BackgroundProgress from '../components/BackgroundProgress'
import Sound from 'react-native-sound'

const alert = require('../../assets/sounds/alert.wav')

class AMRAPScreen extends Component {
  state = {
    keyboardIsVisible: false,

    alerts: [0, 15],
    countdown: 1,
    time: '2',

    paused: false,
    isRunning: false,
    countdownValue: 0,
    count: 0,
    repetitions: 0,
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
    const resto = this.state.count % 60
    if(this.state.alerts.indexOf(resto) >= 0){
      this.alert.play()
    }
    if(this.state.countdown === 1){
      if(resto>=55 && resto <60){
        this.alert.play()
      }
    }
  }
  restart = () => {
    if(this.state.paused){
      clearInterval(this.countTimer)
      clearInterval(this.countdownTimer)
      this.play()
    }
  }
  back = () => {
    if(this.state.paused || !this.state.isRunning){
      clearInterval(this.countTimer)
      clearInterval(this.countdownTimer)
      this.props.navigation.goBack()
    }
  }
  stop = () => {
    //clearInterval(this.countdownTimer)
    //clearInterval(this.countTimer)
    this.setState({ paused: !this.state.paused })
  }
  play = () => {
    this.setState({
      paused: false,
      repetitions: 0,
      count: 0,
      countdownValue: this.state.countdown === 1 ? 5 : 0,
    })
    this.setState({ isRunning: true })
    const count = () => {
      if(this.state.paused){
        return;
      }
      this.setState({ count: this.state.count + 1 }, () => {
        this.playAlert()
        if(this.state.count === parseInt(this.state.time)*60){
          clearInterval(this.countTimer)
        }
      })
    }
    if(this.state.countdown === 1){
      this.alert.play()
      this.countdownTimer = setInterval(() => {
        if(this.state.paused){
          return;
        }
        this.alert.play()
        this.setState({ countdownValue: this.state.countdownValue - 1 }, () => {
          if(this.state.countdownValue === 0){
            clearInterval(this.countdownTimer)
            this.countTimer = setInterval(count, 1000)
          }
        })
      }, 1000)
    }else{
      this.countTimer = setInterval(count, 1000)
    }

  }
  decrement = () => {
    if(this.state.repetitions > 0){
      this.setState({
        repetitions: this.state.repetitions - 1
      })
    }
  }
  increment = () => {
    this.setState({
      repetitions: this.state.repetitions + 1
    }) 
  }  
  render(){
    if(this.state.isRunning){
      const percMinute = parseInt(((this.state.count % 60)/60)*100)
      const percTime = parseInt(((this.state.count/60) / parseInt(this.state.time))*100)
      const media = this.state.repetitions > 0 ? this.state.count / this.state.repetitions : 0
      const estimated = media > 0 ? Math.floor((parseInt(this.state.time)*60)/media) : 0
      const opacity = !this.state.paused ? 0.6 : 1
      return(
        <BackgroundProgress percentage={percMinute}>
          <View style={{  flex: 1, justifyContent: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Title title='AMRAP' subtitle='As Many Repetitions As Possible' style={{ paddingTop: 0 }} />
            </View>
            { this.state.repetitions > 0 ?
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Time time={media} type='text3' />
                <Text style={styles.subTitle}>por repetição</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.count}>{estimated}</Text>
                <Text style={styles.subTitle}>repetições</Text>
              </View>              
            </View> : null }
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Time time={this.state.count} />
              <ProgressBar percentage={percTime} />
              <Time time={parseInt(this.state.time)*60-this.state.count} type='text2' appendedText={' restantes'} />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              {
                this.state.countdownValue > 0 ?
                <Text style={styles.countdown}>-</Text>
                :
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <TouchableOpacity onPress={this.decrement}>
                    <Text style={styles.countdown}>-</Text>  
                  </TouchableOpacity>
                  <Text style={styles.countdown}>{this.state.repetitions}</Text>
                  <TouchableOpacity onPress={this.increment}>
                    <Text style={styles.countdown}>+</Text>  
                  </TouchableOpacity>                  
                </View>
              }

              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10}}>
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.back}>
                  <Image style={{opacity}} source={require('../../assets/left-arrow.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.stop}>
                  { 
                    this.state.paused ? 
                    <Image source={require('../../assets/btn-play.png')} />
                    :<Image source={require('../../assets/btn-stop.png')} />
                  }
                </TouchableOpacity>
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.restart}>
                  <Image style={{opacity}} source={require('../../assets/restart.png')} />
                </TouchableOpacity>
              </View>            
            </View>
          </View>
        </BackgroundProgress>
      )
    }
    return(
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
        <ScrollView style={styles.container}>
          <Title title='AMRAP' subtitle='As Many Repetitions As Possible' style={{paddingTop: this.state.keyboardIsVisible ? 0 : 20}} />
          <Image style={{ alignSelf: 'center', marginBottom: 17 }} source={require('../../assets/settings-cog.png')} />
          <Select 
            label='Alertas:'
            current={this.state.alerts}
            options={[
              {
                id:0, 
                label: '0s'
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10}}>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.back}>
              <Image source={require('../../assets/left-arrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.play}>
              <Image source={require('../../assets/btn-play.png')} />
            </TouchableOpacity>
            <Text>Testar</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
AMRAPScreen.navigationOptions = {
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
  count: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
  },
  subTitle:{
    fontFamily: 'Ubuntu-Bold',
    fontSize: 11,
    textAlign: 'center',
    color: 'white',
  },
})
export default AMRAPScreen
