import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainerStyle: {flex: 1, backgroundColor: 'white'},
  mainInnerContainerStyle: {width: '100%', marginTop: 10},
  riwayatPengajuanButtonContainerStyle: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: 'white',
    marginHorizontal: '3%',
    borderRadius: 10,
    shadowColor: '#000',
    paddingVertical: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  riwayatIconContainerStyle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riwayatIconStyle: {width: 25, height: 25},
  riwayatPengajuanButtonStyle: {flex: 1, justifyContent: 'center'},
  riwayatPengajuanButtonTitleStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
  },
  blueArrowIconContainerStyle: {flex: 0.1, justifyContent: 'center'},
  pengajuanCountTitleContainerStyle: {paddingHorizontal: 15, marginBottom: 10},
  pengajuanCountTitleStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    lineHeight: 24,
  },
  emptyDataContainerStyle: {
    width: '100%',
    alignItems: 'center',
    marginTop: 46,
    marginBottom: 10,
  },
  robotEmptyStyle: {marginRight: 50},
  emptyDataDescriptionStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.dark.neutral100,
  },
  emptyDataSubDescriptionStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 6,
    color: Colors.dark.neutral60,
  },
  listDataContainerStyle: {marginBottom: 200},
  modalStyle: {flex: 1, alignItems: 'center'},
});
