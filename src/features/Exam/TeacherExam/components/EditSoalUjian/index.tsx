import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { usePoppins } from './Poppins'
import Header from './components/Header'
import HorizontalRow from './components/HorizontalRow'
import PertanyaanSection from './components/PertanyaanSection'
import JawabanSection from './components/JawabanSection'
import PembahasanSection from './components/PembahasanSecction'
import styles from './styles'

const EditSoalUjian = () => {
  const fontsLoaded = usePoppins()

  if (!fontsLoaded) {
    return null // This will be handled by Poppins.ts
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <HorizontalRow />
      <PertanyaanSection />
      <JawabanSection />
      <PembahasanSection />
    </ScrollView>
  )
}

export default EditSoalUjian
