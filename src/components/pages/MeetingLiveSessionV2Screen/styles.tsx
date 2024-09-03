import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  parentContainer: {flex: 1, backgroundColor: Colors.black},
  webviewContainer: {flex: 1},
  swipeUpContainer: {
    padding: 16,
  },
  swipeUpContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeUpTitle: {
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
  },
  toastAttachmentContainer: {
    paddingHorizontal: 16,
    position: 'absolute',
    width: '100%',
    bottom: 76,
  },
  toastAttachmentContent: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  toastAttachmentTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  toastAttachmentSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  actionLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.danger.base,
    fontSize: 12,
  },
  durationLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
  },
  callTitleLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: Colors.dark.neutral100,
  },
  callContainer: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  callSubContainer: {gap: 2, flexGrow: 1},
  toastCallContainer: {
    paddingHorizontal: 16,
    position: 'absolute',
    width: '100%',
    bottom: 76,
  },
  keluarLabel: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: Colors.danger.base,
  },
  headerContainer: {backgroundColor: 'black', paddingHorizontal: 16},
  headerLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.white,
  },
  headerLabelContainer: {flexDirection: 'row', gap: 8, alignItems: 'center'},
});
