import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  lineGrey: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.dark.neutral20,
    marginVertical: 16,
  },
  gapVertical20: {
    height: 20,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  buttonAddContainer: {
    padding: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerOnSearchingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  headCancelTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 21,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  labelContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: -1,
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  headIconSearch: {
    resizeMode: 'contain',
  },
  selectAllCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  selectAllTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  sectionTop16: {
    marginTop: 16,
  },
  sectionHeadTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral60,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardAvatar: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 100,
    marginRight: 12,
  },
  checkedCard: {
    marginRight: 12,
  },
  checkedAvatarContainer: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
  checkedAvatar: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  checkedAvatarCloseIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  checkedTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
  cardNameTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
    marginBottom: 4,
  },
  cardRoleTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
  },
});
