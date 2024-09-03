import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import styles from '../styles'

const HorizontalRow = () => {
  return (
    <View style={styles.horizontalRow}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
      <FontAwesome name='trash' size={16} color='#0055B8' style={styles.trashIcon1} />
    </View>
  )
}

export default HorizontalRow
