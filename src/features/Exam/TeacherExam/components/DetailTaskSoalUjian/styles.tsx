import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    minHeight: height * 0.8,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CED4DA',
    alignSelf: 'center',
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  numberIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F5F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  numberText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1D252D',
    lineHeight: 36,
  },
  questionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#0055B8',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  icon: {
    width: 32,
    height: 32,
    margin: 8,
    backgroundColor: '#EFF7FF',
    borderRadius: 30,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  questionContent: {
    marginBottom: 16,
  },
  questionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#4D545C',
    lineHeight: 24,
  },
  answerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
    lineHeight: 24,
  },
  answerText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#1D252D',
    backgroundColor: '#E6F0FF',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  explanationTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#000000',
    lineHeight: 24,
    marginBottom: 8,
  },
  explanationText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#1D252D',
    lineHeight: 27.2,
  },
  // Additional Styles
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  answerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#E6F0FF',
    marginBottom: 20,
  },
  explanationContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
})

export default styles
