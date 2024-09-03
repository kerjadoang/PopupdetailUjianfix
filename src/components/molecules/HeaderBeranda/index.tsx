import {StyleSheet, View, Text, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import Colors from '@constants/colors';
import useHeaderBeranda from './useHeaderBeranda';
import Coin from '@assets/svg/ic_coin_16x16.svg';
import Xp from '@assets/svg/ic_xp_16x16.svg';
import ChevronRight from '@assets/svg/ic_chevron_right_16x16.svg';
import {CoachmarkLib} from '@components/atoms';
import {generalStyles} from '@constants/styles';
import SearchIcon from '@assets/svg/ic_search_round_32x32.svg';
import Avatar from '@components/atoms/Avatar';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  Coachmarks: any[];
  scrollViewRef: any;
  doneCoachMark: () => void;
  totalCoachmark: number;
  coachmark1?: any;
  coachmark2?: any;
  _handlerCoachmark: (queue: number) => void;
}
const HeaderBeranda = (props: IProps) => {
  const {getUser, coin, packageDetail, navigation, currentUserRank} =
    useHeaderBeranda();

  const paket = useCallback(() => {
    if (typeof packageDetail?.data?.package === 'undefined') {
      return 'Belum berlangganan paket';
    }
    return `Paket Aktif:  ${packageDetail.data.package[0]?.name} ${
      packageDetail.data.total > 1 ? ' +1 lainnya' : ''
    } `;
  }, [packageDetail?.data]);

  return (
    <View style={[styles.container]}>
      <Bg width={'100%'} height={297} style={generalStyles.absolute} />
      <View style={{top: 30}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Profil', {})}>
            <Avatar id={getUser?.data?.avatar} style={styles.imageProfile} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleHeader}>
              Halo {getUser?.data?.full_name || '-'}
            </Text>
            <View style={styles.kelasContainer}>
              <Text style={styles.kelas}>
                {getUser?.data?.class?.name || '-'}
              </Text>
            </View>
            <Text style={styles.paket}>{paket()}</Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('GlobalSearchScreen', {});
            }}>
            <SearchIcon />
          </Pressable>
        </View>
        <View style={styles.statusContainer}>
          <CoachmarkLib
            ref={ref => (props.Coachmarks[0] = ref)}
            onNext={() => props?._handlerCoachmark(1)}
            onShow={() => props?.scrollViewRef?.current?.stop()}
            onSkip={props.doneCoachMark}
            buttonOnContent
            queue={1}
            arrowMiddle
            totalCoachmark={props?.totalCoachmark}
            contentContainerStyle={generalStyles.contentFlex}
            buttonSkipText={'Lewati'}
            title={'Koin'}
            childrenStyle={styles.coinContainer}
            message={'Jumlah Koin kamu yang bisa kamu gunakan untuk berTANYA'}>
            <Pressable
              style={styles.coinContainer}
              onPress={() => navigation.navigate('HomeCoinScreen', {})}>
              <Coin />
              <Text style={styles.titleSnachbar}>
                {coin?.data?.balance || '-'} Koin
              </Text>
              <ChevronRight />
            </Pressable>
          </CoachmarkLib>
          <View style={styles.separator} />
          <CoachmarkLib
            ref={ref => (props.Coachmarks[1] = ref)}
            onNext={() => props?._handlerCoachmark(2)}
            onShow={() => props?.scrollViewRef?.current?.stop()}
            onSkip={props.doneCoachMark}
            buttonOnContent
            queue={2}
            totalCoachmark={props?.totalCoachmark}
            contentContainerStyle={generalStyles.contentFlex}
            buttonSkipText={'Lewati'}
            title={'XP'}
            childrenStyle={styles.coinContainer}
            message="XP bisa kamu peroleh dengan mengerjakan berbagai soal latihan dan ujian.">
            <Pressable
              style={styles.coinContainer}
              onPress={() =>
                navigation.navigate('LeaderboardScreen', {
                  full_name: 'full_name',
                })
              }>
              <Xp />
              <Text style={styles.titleSnachbar}>
                {currentUserRank?.xp || '0'} XP
              </Text>
              <ChevronRight />
            </Pressable>
          </CoachmarkLib>
        </View>
      </View>
    </View>
  );
};

export default HeaderBeranda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.base,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  titleContainer: {
    lexDirection: 'column',
    flex: 1,
    gap: 4,
    paddingHorizontal: 8,
  },
  paket: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    color: Colors.white,
  },
  titleHeader: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    color: Colors.white,
  },
  imageProfile: {
    width: 48,
    height: 48,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: Colors.white,
    borderColor: Colors.secondary.base,
  },
  kelasContainer: {
    backgroundColor: Colors.secondary.base,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 25,
    alignItems: 'center',
    maxWidth: 150,
  },
  kelas: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
  },
  separator: {
    width: 1,
    height: 22,
    alignSelf: 'center',
    backgroundColor: Colors.dark.neutral40,
  },
  statusContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 30,
    justifyContent: 'space-around',
  },
  coinContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    borderRadius: 30,
    height: 32,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  titleSnachbar: {
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'normal',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
});
