import Colors from '@constants/colors';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },
  groupMentorTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  cardContentNotConnected: {
    gap: 10,
    // width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notConnectedTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  notConnectedSubtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  notConnectedButton: {
    width: '40%',
    paddingVertical: 0,
  },
  cardContentConnected: {
    width: WINDOW_WIDTH / 1.55,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  connectedImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  connectedTitle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  connectedSubtitle: {
    fontSize: 11,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  connectedButton: {
    width: '40%',
    paddingVertical: 0,
  },
});
