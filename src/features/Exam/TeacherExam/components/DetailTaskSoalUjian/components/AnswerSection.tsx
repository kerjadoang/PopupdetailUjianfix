import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'

const AnswerSection = () => {
  return (
    <View>
      <Text style={styles.answerTitle}>Jawaban Benar</Text>
      <Text style={styles.answerText}>Prinsip Dagang</Text>
    </View>
  )
}

export default AnswerSection
