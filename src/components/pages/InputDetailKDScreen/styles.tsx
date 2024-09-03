import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    padding: 16,
  },
  content: {
    flex: 1,
  },
  contentRender: {
    padding: 16,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 400,
  },
  textEmptyTitle: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
    fontSize: 16,
  },
  textEmptySubTitle: {
    fontFamily: Fonts.RegularPoppins,
    textAlign: 'center',
  },
  buttonAdd: {
    marginTop: 12,
    backgroundColor: Colors.primary.base,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  textTitle: {
    fontFamily: Fonts.BoldPoppins,
    color: Colors.dark.neutral100,
    fontSize: 16,
  },
  textSubTitle: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral100,
    fontSize: 14,
  },
  textEdit: {
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  listButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    margin: 3,
    marginBottom: 9,
    padding: 10,
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttodEditList: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: Colors.primary.base,
  },
  textButtonAdd: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  modalAdd: {
    padding: 16,
  },
  placeholder: {
    fontFamily: 'Poppins-Bold',
    color: '#A5B0BB',
  },
  buttonDropDown: {
    flexDirection: 'row',
    backgroundColor: '#F5F7F9',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'space-between',
  },
  addKD: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  choosenItem: {
    backgroundColor: Colors.primary.base,
    borderRadius: 18,
    paddingHorizontal: 12,
    padding: 5,
    margin: 5,
  },
  unChooseItem: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 18,
    paddingHorizontal: 12,
    padding: 8,
    margin: 5,
  },
  textChoosenItem: {
    fontFamily: Fonts.RegularPoppins,
    color: 'white',
  },
  textUnchooseItem: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButtonController: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonPlus: {
    borderRadius: 100,
    width: 22,
    height: 22,
    marginRight: 5,
  },
  buttonMinus: {
    borderRadius: 100,
    width: 22,
    height: 22,
  },
  input: {
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    // color: '#A5B0BB',
    color: Colors.black,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: '#F5F7F9',
    marginBottom: 10,
  },
});
