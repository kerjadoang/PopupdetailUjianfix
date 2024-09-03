import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import styles from '../styles'

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.questionNumberContainer}>
        <Text style={styles.questionNumber}>3</Text>
      </View>
      <Text style={styles.questionTitle}>Soal 03.</Text>
      <FontAwesome
        name='chevron-up'
        size={16}
        color='#0055B8'
        style={styles.trashIcon}
      />
    </View>
  )
}

export default Header
