import Colors from '@constants/colors';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    lineHeight: 16,
  },
  topContainerStyle: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.primary.light3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  fullNameStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    marginBottom: 3,
  },
  registNumberStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
    marginBottom: 3,
  },
  dayCountStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    marginBottom: 3,
  },
  startEndDateStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 5,
    marginLeft: 8,
    color: Colors.dark.neutral80,
    marginBottom: 3,
  },
  adminInfoStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral80,
  },
  separatorStyle: {
    width: '100%',
    borderTopWidth: 4,
    marginVertical: 15,
    borderTopColor: Colors.dark.neutral10,
  },
  lampiranStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    marginLeft: '5%',
  },
  previewImageButtonStyle: {
    width: WINDOW_WIDTH,
    height: 185,
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  imagePreviewStyle: {
    width: WINDOW_WIDTH,
    resizeMode: 'cover',
    height: 185,
  },
  absenceImageContainerStyle: {
    width: '100%',
    height: 185,
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  absenceImageStyle: {
    width: '100%',
    resizeMode: 'cover',
    height: '100%',
  },
  filePathInfoContainerStyle: {
    width: '90%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: Colors.dark.neutral50,
  },
  filePathInfoTitleStyle: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 3,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
    alignItems: 'center',
  },
  docIconContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  docTextStyle: {
    marginLeft: 5,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  stripTextStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    marginTop: 10,
    marginLeft: '5%',
  },
  separator2Style: {
    width: '100%',
    borderTopWidth: 4,
    marginVertical: 15,
    borderTopColor: Colors.dark.neutral10,
  },
  notesContainerStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    marginLeft: '5%',
  },
  noteStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    marginTop: 10,
    marginLeft: '5%',
  },
  mainCOntainer: {flex: 1, backgroundColor: 'white'},
  dateContainerStyle: {width: '100%', marginTop: 20},
  dateIconContainer: {flexDirection: 'row', alignItems: 'center'},
  separator3: {
    width: '100%',
    borderTopWidth: 4,
    marginVertical: 15,
    borderTopColor: Colors.dark.neutral10,
  },
  attendanceInfoContainer: {marginLeft: '5%', marginVertical: 15},
  dateToContainer: {paddingLeft: 10, paddingRight: 150},
  previewIcon: {width: 50, height: 50},
  pathTextStyle: {width: '100%', alignItems: 'center', marginVertical: 10},
  rejectButtonContainer: {flex: 1, paddingLeft: 20},
  approvedButtonContainer: {flex: 1, paddingRight: 20, paddingLeft: 10},
  previewContainer: {flex: 1, backgroundColor: '#1D252D'},
  arrowWhiteIconCOntainer: {
    position: 'absolute',
    left: 10,
    top: 12,
    padding: 5,
  },
  absenceDetailSvgContainer: {width: '100%', height: '100%'},
  absenceDetailImageContainer: {
    width: WINDOW_WIDTH,
    height: 185,
    resizeMode: 'center',
  },
  flexRow: {flexDirection: 'row'},
  infoDetailMenunggu: {
    backgroundColor: Colors.primary.light3,
    alignItems: 'center',
    paddingVertical: 5,
    marginLeft: '5%',
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  infoDetailDitolak: {
    backgroundColor: Colors.danger.light2,
    alignItems: 'center',
    paddingVertical: 5,
    marginLeft: '5%',
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  infoDetailDiterima: {
    backgroundColor: Colors.success.light2,
    alignItems: 'center',
    paddingVertical: 5,
    marginLeft: '5%',
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  infoDetailTextMenunggu: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
  },
  infoDetailTextDitolak: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.danger.base,
  },
  infoDetailTextDiterima: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.success.base,
  },
  adminNotesStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    marginLeft: '5%',
  },
  adminNoteDescriptionStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    marginTop: 10,
    marginLeft: '5%',
  },
  actionButtonContainerStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  modalPrevieStyle: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 20,
  },
  modalPreviewLabelStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.white,
  },
});
