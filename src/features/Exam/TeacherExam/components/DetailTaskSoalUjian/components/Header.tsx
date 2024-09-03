import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.numberIcon}>
        <Text style={styles.numberText}>3</Text>
      </View>
      <Text style={styles.questionTitle}>Soal 03.</Text>
      <View style={styles.icon}></View>
      <View style={styles.icon}></View>
    </View>
  )
}

export default Header
