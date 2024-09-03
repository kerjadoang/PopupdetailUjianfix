import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },
  groupMentorTitle: {
    fontSize: 14,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },

  headerContainer: {
    flexDirection: 'row',
  },

  renderEmpty: {
    // flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // width: 300,
    marginBottom: 16,
  },
  cardOfschedule: {
    // backgroundColor: 'red',
    borderRadius: 10,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
    borderWidth: 1,
    borderColor: Colors.primary.light2,
    padding: 16,
    marginRight: 8,
  },

  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    padding: 16,
    marginVertical: 2,
    marginHorizontal: 1,
    flex: 1,
    marginRight: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  titleClass: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral60,
  },
  next: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    gap: 8,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
  },
  buatJadwalBelajarView: {
    backgroundColor: Colors.primary.base,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  buatJadwalBelajarText: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '600',
  },
});
