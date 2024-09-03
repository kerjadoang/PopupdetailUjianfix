import React, {FC, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './styles';
import StatusProyekCard from './components/StatusProyekCard';
import StatusProyekEmpty from './components/StatusProyekEmpty';
import {useNavigation} from '@react-navigation/native';
import useStatusProyekTab from './useStatusProyekTab';
import {Carousel, Pagination} from 'react-native-snap-carousel-v4';
import Colors from '@constants/colors';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {EmptyState} from '@components/atoms';

type Props = {
  service_type: 'guru' | 'kepsek';
  isShowRiwayat?: boolean;
  limit?: number;
};

const StatusProyekTab: FC<Props> = ({
  service_type,
  isShowRiwayat = true,
  limit,
}) => {
  const [isRiwayatEmpty] = useState(false);
  const navigation: any = useNavigation();
  const {
    isLoading,
    listStatusProyekBerlangsung,
    listStatusProyekRiwayat,
    onDetailPress,
    onClickHapus,
    onClickUbah,
  } = useStatusProyekTab(service_type);
  const [index, setIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Projek Berlangsung */}
        <View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Projek Berlangsung</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PancasilaAllStatusProyekScreen', {
                  type: 'proyek_berlangsung',
                  service_type: service_type,
                })
              }>
              {listStatusProyekBerlangsung.length != 0 ? (
                <Text style={styles.lihatSemua}>Lihat semua</Text>
              ) : null}
            </TouchableOpacity>
          </View>

          {listStatusProyekBerlangsung.length != 0 ? (
            <View>
              <Carousel
                data={
                  limit === undefined
                    ? listStatusProyekBerlangsung
                    : listStatusProyekBerlangsung?.slice(0, 3)
                }
                renderItem={({item}) => {
                  return (
                    <StatusProyekCard
                      key={item.id}
                      onClickHapus={onClickHapus}
                      onClickUbah={onClickUbah}
                      service_type={service_type}
                      data={item}
                      onClickDetail={() => {
                        onDetailPress(item.project);
                      }}
                    />
                  );
                }}
                itemWidth={Dimensions.get('screen').width - 64}
                sliderWidth={Dimensions.get('screen').width - 64}
                loop={true}
                vertical={false}
                useScrollView={true}
                onSnapToItem={index => setIndex(index)}
              />

              <Pagination
                containerStyle={{paddingVertical: 16}}
                dotsLength={
                  limit === undefined
                    ? listStatusProyekBerlangsung.length
                    : limit
                }
                activeDotIndex={index}
                dotColor={Colors.primary.base}
                dotStyle={styles.dotStyle}
                inactiveDotColor={Colors.dark.neutral40}
              />
            </View>
          ) : (
            <EmptyState
              containerStyles={styles.emptyStateContainer}
              type={'empty_sad'}
              title={'Belum Ada Projek Berlangsung'}
              subTitle={
                'daftar Projek yang sedang berlangsung akan tampil disini.'
              }
            />
          )}
        </View>

        <View style={{marginTop: 16}} />

        {/* Riwayat Projek */}
        {isShowRiwayat ? (
          <View>
            <View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Riwayat Projek</Text>
                {!isRiwayatEmpty ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PancasilaAllStatusProyekScreen', {
                        type: 'riwayat_proyek',
                        service_type: service_type,
                      })
                    }>
                    {listStatusProyekRiwayat.length != 0 ? (
                      <Text style={styles.lihatSemua}>Lihat semua</Text>
                    ) : null}
                  </TouchableOpacity>
                ) : null}
              </View>

              {listStatusProyekRiwayat.length != 0 ? (
                <View>
                  <Carousel
                    data={listStatusProyekRiwayat}
                    renderItem={({item}) => {
                      return (
                        <StatusProyekCard
                          key={item.id}
                          service_type={service_type}
                          data={item}
                          onClickDetail={() => onDetailPress(item.project)}
                        />
                      );
                    }}
                    itemWidth={Dimensions.get('screen').width - 64}
                    sliderWidth={Dimensions.get('screen').width - 64}
                    loop={true}
                    vertical={false}
                    useScrollView={true}
                    onSnapToItem={index => setIndex(index)}
                  />

                  <Pagination
                    containerStyle={{paddingVertical: 16}}
                    dotsLength={listStatusProyekRiwayat.length}
                    activeDotIndex={index}
                    dotColor={Colors.primary.base}
                    dotStyle={styles.dotStyle}
                    inactiveDotColor={Colors.dark.neutral40}
                  />
                </View>
              ) : (
                <EmptyState
                  containerStyles={styles.emptyStateContainer}
                  type={'empty_sad'}
                  title={'Belum Ada Riwayat Projek'}
                  subTitle={
                    'daftar Projek yang telah selesai akan tampil di sini.'
                  }
                />
              )}

              {isRiwayatEmpty ?? <StatusProyekEmpty isBerlangsung={false} />}
            </View>
            <View style={{paddingBottom: 50}} />
          </View>
        ) : null}
      </ScrollView>

      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export default StatusProyekTab;
