import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { usePoppins } from './Poppins'
import Header from './components/Header'
import QuestionContent from './components/QuestionContent'
import AnswerSection from './components/AnswerSection'
import ExplanationSection from './components/ExplanationSection'
import styles from './styles'

const DetailTaskSoalUjian = () => {
  const fontsLoaded = usePoppins()

  if (!fontsLoaded) {
    return null // This will be handled by Poppins.ts
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.detailsContainer} />
      <QuestionContent />
      <AnswerSection />
      <ExplanationSection />
    </ScrollView>
  )
}

export default DetailTaskSoalUjian
