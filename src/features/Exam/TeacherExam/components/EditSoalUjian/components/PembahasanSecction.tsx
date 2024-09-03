import React from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from '../styles'

const PembahasanSection = () => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pembahasan</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Tulis pembahasan'
          multiline
        />
      </View>
    </View>
  )
}

export default PembahasanSection
