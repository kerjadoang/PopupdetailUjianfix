import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  mediaContainer: {width: '100%', height: 420, marginBottom: 10},
  descriptionContainer: {flex: 6.5},
  descriptionInnerContainer: {width: '100%', paddingHorizontal: '5%'},
  descriptionTitleContainer: {width: '100%'},
  descriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
  },
  descriptionBodyContainer: {width: '100%'},
  descriptionBody: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    marginTop: '2%',
  },
});
