import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardDataContainerStyle: {
    width: '100%',
    marginVertical: 5,
    backgroundColor: 'white',
  },
  cardDataInnerContainerStyle: {
    marginHorizontal: '5%',
    backgroundColor: '#EFF7FF',
    paddingLeft: 10,
    paddingRight: '20%',
    borderRadius: 10,
    paddingVertical: 10,
  },
  carDataTitleStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
  },
  scrollViewStyle: {paddingTop: 20, paddingBottom: 400},
});
