import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import DaftarProyekFilterButton from '../DaftarProyekFilterButton';
import DaftarProyekCard from '../DaftarProyekCard';
import DaftarProyekSwipeUp from '../DaftarProyekSwipeUp';
import {SwipeUp} from '@components/atoms';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import useDaftarProyekTab from './useDaftarProyekTab';

type Props = {
  service_type: 'guru' | 'kepsek';
};

const rekomenData = ['Rekomendasi', 'Belum Direkomendasi'];

const DaftarProyekTab: FC<Props> = ({service_type}) => {
  const {
    isLoading,
    isOpenSwipeUp,
    swipeUpFilter,
    filterData,
    filterChip,
    activeStatusData,
    activeFaseData,
    listDaftarProyek,
    listPhase,
    setIsOpenSwipeUp,
    setSwipeUpFilter,
    isFaseFilter,
    onCardPress,
    onSubCardPress,
    onAturUlang,
    onTerapkan,
    findIndexInExpandData,
  } = useDaftarProyekTab(service_type);
  const parseDividerType = (data: any[], index: number) => {
    if (index == 0) {
      return 'bottom';
    }

    if (data.length - 1 == index) {
      return 'top';
    }

    if (index != 0 && data.length - 1 != index) {
      return 'both';
    }
    return 'none';
  };
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              horizontal
              data={filterData}
              renderItem={({item}) => {
                const isFilterPhase = item === 'Fase';
                const faseChipName =
                  activeFaseData.length === 1
                    ? activeFaseData?.[0]?.name
                    : `${activeFaseData.length} Fase`;

                const statusChipName =
                  activeStatusData.length === 1
                    ? activeStatusData
                    : 'Pilih Semua';

                const parseChipName = isFilterPhase
                  ? faseChipName
                  : statusChipName;
                return (
                  <DaftarProyekFilterButton
                    isActive={filterChip.indexOf(item) !== -1}
                    customStyle={{marginRight: 12}}
                    name={
                      filterChip.indexOf(item) !== -1 ? parseChipName : item
                    }
                    onPress={() => {
                      setSwipeUpFilter(item as any);
                    }}
                  />
                );
              }}
            />
          </View>
          <View style={{width: '100%'}}>
            {listDaftarProyek.map((item, index) => {
              const dividerType = parseDividerType(listDaftarProyek, index);
              const isCardExpanded = findIndexInExpandData(item) !== -1;
              return (
                <DaftarProyekCard
                  key={index}
                  isCardExpanded={isCardExpanded}
                  onCardPress={onCardPress}
                  onSubCardPress={onSubCardPress}
                  name={item.name || ''}
                  data={item}
                  dividerType={dividerType}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <SwipeUp onClose={() => setIsOpenSwipeUp(false)} visible={isOpenSwipeUp}>
        <DaftarProyekSwipeUp
          plainData={isFaseFilter(swipeUpFilter) ? listPhase : rekomenData}
          activeData={
            isFaseFilter(swipeUpFilter) ? activeFaseData : activeStatusData
          }
          type={swipeUpFilter}
          onAturUlang={onAturUlang}
          onTerapkan={onTerapkan}
        />
      </SwipeUp>
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export default DaftarProyekTab;
