import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Timer = props => {
  const minutes = parseInt(props.time / 60)
  const seconds = parseInt(props.time % 60)
  const format = num => {
    if(num<10){
      return '0'+num
    }
    return num
  }
  return(
    <Text>{format(minutes)}:{format(seconds)}</Text>
  )
}

const styles = StyleSheet.create({

})
export default Timer
