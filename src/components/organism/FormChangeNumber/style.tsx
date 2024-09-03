import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  fieldDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral60,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 34,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
});
