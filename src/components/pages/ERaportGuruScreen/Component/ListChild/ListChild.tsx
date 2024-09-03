import React, {FC} from 'react';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {Info} from '../Info';
import {CCheckBox, InputText, SwipeUp} from '@components/atoms';
import {CardStudent} from '../CardStudent';
import Arrow from '@assets/svg/ic_arrow_bottom_blue.svg';
import SearchIcon from '@assets/svg/ic_search.svg';
import IconSearchBlue from '@assets/svg/ic_search_blue.svg';
import FilterStatus from '../FilterStatus';
import {useListChild} from './useListChild';
const statusData = ['Belum dibagikan', 'Sudah dibagikan'];
type Props = {
  isStickyShareEraporShow: boolean;
  class_name: string;
  isSearchMode: boolean;
  setIsSearchMode: (value: boolean) => void;
  childList: AssessmentEraporShareStudent[];
  filterEraporChild: (data: any) => any[];
  selectChild: (data: any) => void;
  onMore: (data: any) => void;
  isAllChildSelected: boolean;
  onPressSelectAllChild: () => void;
  onFilterStatusPress: () => void;
};
const ListChild: FC<Props> = ({
  isStickyShareEraporShow,
  class_name,
  isSearchMode,
  setIsSearchMode,
  childList,
  filterEraporChild,
  selectChild,
  onMore,
  isAllChildSelected,
  onPressSelectAllChild,
}) => {
  const {
    tempChildList,
    setIsFilterStatusOpen,
    activeStatusData,
    isFilterStatusOpen,
    filterStudent,
    onTerapkanFilterStatus,
    onAturUlangFilterStatus,
  } = useListChild(childList);
  const renderSearchComponent = () => (
    <View key={'Search'} style={styles.searchContainer}>
      <InputText
        editable={true}
        width="93%"
        leftIcon={IconSearchBlue}
        backgroundColor={Colors.dark.neutral10}
        onPress={() => {}}
        placeholder="Cari Murid"
        placeholderTextColor={Colors.dark.neutral60}
        onChangeText={filterStudent}
      />
      <Pressable onPress={() => setIsSearchMode(false)}>
        <Text style={styles.textBlue}>Batal</Text>
      </Pressable>
    </View>
  );

  return (
    <>
      <View
        style={[
          styles.listChildContainer,
          {paddingBottom: isStickyShareEraporShow ? 110 : 0},
        ]}>
        {!isSearchMode ? (
          <View>
            <Text style={styles.title}>Daftar Murid ({class_name})</Text>
            <Info />
            <View style={styles.allStatusContainer}>
              <TouchableOpacity
                onPress={() => setIsFilterStatusOpen(true)}
                style={styles.btn}>
                <Text style={styles.textBlue}>
                  {activeStatusData.length == 2 || activeStatusData.length == 0
                    ? 'Semua Status'
                    : activeStatusData}
                </Text>
                <Arrow style={{marginLeft: 8}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsSearchMode(true)}>
                <SearchIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.selectAllChild}>
              <CCheckBox
                isChecked={isAllChildSelected}
                onPressCheck={onPressSelectAllChild}
                right={10}
              />
              <Text style={styles.selectAllChildText}>
                Pilih Semua ({tempChildList?.length})
              </Text>
            </View>
          </View>
        ) : (
          renderSearchComponent()
        )}
        {tempChildList?.map(
          (item: AssessmentEraporShareStudent, index: number) => {
            const tempErapor = filterEraporChild(item);
            return (
              <CardStudent
                key={index}
                isCheck={tempErapor.length != 0 ? true : false}
                onCheck={() => selectChild(item)}
                name={item?.user?.full_name || ''}
                nisn={item?.user?.registration_number || ''}
                isShare={item?.share || false}
                onMore={() => onMore(item)}
              />
            );
          },
        )}
      </View>
      <SwipeUp
        onClose={() => setIsFilterStatusOpen(false)}
        visible={isFilterStatusOpen}
        children={
          <FilterStatus
            activeData={activeStatusData}
            onAturUlang={onAturUlangFilterStatus}
            onTerapkan={onTerapkanFilterStatus}
            plainData={statusData}
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  listChildContainer: {padding: 16},
  title: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  allStatusContainer: {
    marginVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllChild: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 10,
  },
  selectAllChildText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    lineHeight: 28,
    color: Colors.black,
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  textBlue: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  searchContainer: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
});

export default ListChild;
