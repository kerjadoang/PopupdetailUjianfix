import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerContent: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    textTransform: 'none',
  },
  tabBar: {
    height: 45,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
  },
  tabBarIndicator: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 4,
    backgroundColor: Colors.primary.base,
  },
  buttonDropdown: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    margin: 16,
  },
  textDropdown: {
    fontFamily: 'Poppins-Bold',
    color: Colors.primary.base,
  },
  swipeContainer: {
    padding: 16,
  },
  textTitleSwipe: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 20,
    color: Colors.dark.neutral100,
  },
  textSubTitleSwipe: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: Colors.dark.neutral50,
  },
  textUnchoose: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.base,
  },
  textChoose: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  buttonChoose: {
    backgroundColor: Colors.primary.base,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
    margin: 5,
  },
  buttonUnchoose: {
    backgroundColor: Colors.white,
    paddingVertical: 5,
    borderRadius: 30,
    margin: 5,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowCenter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  listKD: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
    lineHeight: 18,
  },
  textScore: {
    fontFamily: 'Poppins-Bold',
    color: Colors.primary.base,
  },
  textSubTitle: {
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
  },
  content: {
    // padding: 16,
  },
  listContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.dark.neutral40,
    paddingVertical: 15,
  },
  listContentNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.dark.neutral40,
    paddingVertical: 15,
  },
  containerList: {
    borderBottomWidth: 1,
    borderColor: Colors.dark.neutral40,
    paddingVertical: 16,
  },
  lineStrap: {
    borderWidth: 1,
    borderColor: Colors.dark.neutral40,
    borderStyle: 'dashed',
    marginVertical: 5,
  },
  line: {
    borderWidth: 0.5,
    borderColor: Colors.dark.neutral40,
    marginVertical: 5,
  },
  input: {
    backgroundColor: Colors.dark.neutral10,
    padding: 10,
    borderRadius: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
    color: Colors.dark.neutral100,
  },
  inputAbsent: {
    backgroundColor: Colors.dark.neutral10,
    padding: 10,
    borderRadius: 30,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
    color: Colors.dark.neutral100,
    width: 100,
  },
  button: {
    width: '45%',
  },
  textAlert: {
    fontFamily: 'Poppins-Regular',
    color: Colors.danger.base,
    marginBottom: 20,
  },
  inputAlert: {
    backgroundColor: Colors.dark.neutral10,
    padding: 10,
    borderRadius: 30,
    fontFamily: 'Poppins-Bold',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: Colors.danger.base,
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 600,
  },

  flatList: {padding: 16},
});
