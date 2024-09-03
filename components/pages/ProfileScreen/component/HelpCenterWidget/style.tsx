import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  headerIcon: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  contentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});
