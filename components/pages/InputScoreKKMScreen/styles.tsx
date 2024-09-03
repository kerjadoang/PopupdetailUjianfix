import {StyleSheet} from 'react-native';

import Colors from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollView: {},
  row: {
    flexDirection: 'row',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral80,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#F5F7F9',
    width: 64,
    height: 44,
    borderRadius: 30,
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
  },
  contentInput: {
    marginRight: 10,
  },
  modal: {
    padding: 16,
  },
  textTitleModal: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
    fontSize: 20,
    textAlign: 'center',
  },
  textSubTitleModal: {
    fontFamily: 'Poppins-Bold',
    color: '#868E96',
    marginBottom: 10,
  },
  dateUnchoose: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 30,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
  },
  dateChoose: {
    backgroundColor: Colors.primary.base,
    borderRadius: 30,
    margin: 5,
    padding: 10,
    justifyContent: 'center',
  },
  textUnchoose: {
    color: Colors.primary.base,
  },
  textChoose: {
    color: Colors.white,
  },
  viewGrey: {
    backgroundColor: '#E7EBEE',
    color: '#A5B0BB',
    width: 44,
    borderRadius: 30,
    textAlign: 'center',
  },
  dropdownBlue: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  textBlue: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Bold',
    marginRight: 10,
    fontSize: 14,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.dark.neutral20,
    padding: 16,
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.dark.neutral100,
  },
  textSubAdd: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginBottom: 8,
  },
  contentDropdown: {
    padding: 16,
  },
  subDropContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  textSubTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 5,
    color: Colors.dark.neutral100,
  },
  textScore: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
  },
  dashed: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.dark.neutral40,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  boxScore: {
    width: '40%',
  },
  inputTitle: {
    backgroundColor: '#F5F7F9',
    borderRadius: 30,
    fontFamily: 'Poppins-Bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.dark.neutral100,
    fontSize: 18,
  },
  inputFocused: {
    borderColor: Colors.primary.base,
    borderWidth: 2,
  },
  rowAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputExtra: {
    backgroundColor: '#F5F7F9',
    borderRadius: 30,
    fontFamily: 'Poppins-Bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    color: Colors.dark.neutral100,
  },
  containerInput: {
    width: '45%',
  },
});
