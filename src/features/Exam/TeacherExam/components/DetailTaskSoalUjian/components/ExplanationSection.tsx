import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'

const ExplanationSection = () => {
  return (
    <View>
      <Text style={styles.explanationTitle}>Pembahasan</Text>
      <Text style={styles.explanationText}>
        Prinsip-prinsip hukum perdagangan dalam ketentuan WTO yang sesuai
        dengan ketentuan syari'ah adalah national treatment, freer trade, fair
        competition, special and differential treatment, dan transparency.
      </Text>
    </View>
  )
}

export default ExplanationSection
