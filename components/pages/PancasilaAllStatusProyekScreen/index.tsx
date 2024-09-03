import React, {FC} from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import usePancasilaAllStatusProyekScreen from './usePancasilaAllStatusProyekScreen';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {Header} from '@components/atoms/Header';
import {bgBlueOrnament} from '@assets/images';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import Colors from '@constants/colors';
import {RouteProp, useRoute} from '@react-navigation/native';
import StatusProyekCard from '../ProjectPancasilaScreen/components/StatusProyekTab/components/StatusProyekCard';
import {EmptyState, SwipeUp} from '@components/atoms';
import {FlatList} from 'react-native-gesture-handler';
import DaftarProyekSwipeUp from '../ProjectPancasilaScreen/components/DaftarProyekSwipeUp';
import DaftarProyekFilterButton from '../ProjectPancasilaScreen/components/DaftarProyekFilterButton';
import useStatusProyekTab from '../ProjectPancasilaScreen/components/StatusProyekTab/useStatusProyekTab';
import {ParamList} from 'type/screen';
const rekomenData = ['Rekomendasi', 'Belum Direkomendasi'];
const riwayatData = ['Selesai', 'Dibatalkan'];

type Props = {};

const PancasilaAllStatusProyekScreen: FC<Props> = ({}) => {
  const route =
    useRoute<RouteProp<ParamList, 'PancasilaAllStatusProyekScreen'>>();
  const {service_type, type}: any = route?.params;
  const {
    isLoading,
    listPhase,
    listStatusProyek,
    isOpenSwipeUp,
    swipeUpFilter,
    filterData,
    filterChip,
    activeStatusData,
    activeFaseData,
    setIsOpenSwipeUp,
    setSwipeUpFilter,
    isFaseFilter,
    onTerapkan,
    onAturUlang,
    onClickHapus,
    onClickUbah,
    isTypeBerlangsung,
  } = usePancasilaAllStatusProyekScreen(service_type, type);

  const label = isTypeBerlangsung ? 'Projek Berlangsung' : 'Riwayat Projek';
  const {onDetailPress} = useStatusProyekTab(service_type);
  return (
    <View style={{flex: 1}}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        label={label}
        styleLabel={styles.styleLabel}
        backgroundColor="transparent"
        colorLabel={Colors.white}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={styles.cardContainer}>
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
                  name={filterChip.indexOf(item) !== -1 ? parseChipName : item}
                  onPress={() => {
                    setSwipeUpFilter(item as any);
                  }}
                />
              );
            }}
          />
        </View>

        <FlatList
          data={listStatusProyek}
          contentContainerStyle={{gap: 14, paddingBottom: 100}}
          ListEmptyComponent={() => {
            return (
              <EmptyState
                type={'empty_sad'}
                title={`Belum Ada ${
                  type === 'proyek_berlangsung'
                    ? 'Projek Berlangsung'
                    : 'Riwayat Projek'
                }`}
                subTitle={`daftar Projek yang ${
                  type === 'proyek_berlangsung'
                    ? 'sedang berlangsung'
                    : 'telah selesai'
                } akan tampil disini.`}
              />
            );
          }}
          renderItem={({item}) => {
            return (
              <StatusProyekCard
                key={item.id}
                onClickHapus={onClickHapus}
                onClickUbah={onClickUbah}
                service_type={route.params.service_type}
                data={item}
                onClickDetail={() => onDetailPress(item.project)}
              />
            );
          }}
        />
      </View>
      <SwipeUp visible={isOpenSwipeUp} onClose={() => setIsOpenSwipeUp(false)}>
        <DaftarProyekSwipeUp
          plainData={
            isFaseFilter(swipeUpFilter)
              ? listPhase
              : isTypeBerlangsung
              ? rekomenData
              : riwayatData
          }
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

export {PancasilaAllStatusProyekScreen};
