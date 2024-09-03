import React, {FC, useState} from 'react';
import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import styles, {swipeUpStyle} from './styles';

import IconCalendar from '@assets/svg/ic16_calendar.svg';
import LiveIcon from '@assets/svg/ic16_live.svg';
import DotsHorizontal from '@assets/svg/ic24_more_gray.svg';
import IconEdit from '@assets/svg/ic24_edit_2.svg';
import IconDelete from '@assets/svg/ic24_trash.svg';

import {Divider} from 'react-native-paper';
import {Button, SwipeUp} from '@components/atoms';
import Colors from '@constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IPancasilaListStatusProyek} from '@services/projectPancasila/type';
import dayjs from 'dayjs';
import IcCheckGreen from '@assets/svg/ic24_check_green.svg';
import IcCloseRed from '@assets/svg/ic24_x_red.svg';

type Props = {
  service_type: string;
  data: IPancasilaListStatusProyek;
  onClickDetail: () => void;
  onClickUbah?: (data: IPancasilaListStatusProyek) => void;
  onClickHapus?: (data: IPancasilaListStatusProyek) => void;
};

const StatusProyekCard: FC<Props> = ({
  service_type,
  data,
  onClickDetail,
  onClickUbah,
  onClickHapus,
}) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  return (
    <View style={[styles.component, styles.shadowProp]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.category}>
            <View
              style={[
                styles.categoryItem,
                {
                  backgroundColor: Colors.primary.light3,
                },
              ]}>
              <Text
                style={[
                  styles.categoryTextItem,
                  {
                    color: Colors.primary.base,
                  },
                ]}>
                {data.project?.phase?.name}
              </Text>
            </View>

            {data.rombel != null ? (
              <View
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor: Colors.secondary.light2,
                  },
                ]}>
                <Text
                  style={[
                    styles.categoryTextItem,
                    {
                      color: Colors.orange.dark1,
                    },
                  ]}>
                  {data.rombel?.name}
                </Text>
              </View>
            ) : (
              <View />
            )}

            {data.project?.is_recommended === true ? (
              <View
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor: Colors.success.light2,
                  },
                ]}>
                <Text
                  style={[
                    styles.categoryTextItem,
                    {
                      color: Colors.success.base,
                    },
                  ]}>
                  Rekomendasi
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
        <View style={{flex: 1}} />
        {service_type === 'guru' && data.status === 'berlangsung' ? (
          <TouchableOpacity
            onPress={() => setOpenOptions(!openOptions)}
            style={{paddingBottom: 10, paddingLeft: 8}}>
            <DotsHorizontal width={20} />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={styles.cardTitle}>{data.project?.theme?.name}</Text>
      <Text style={styles.cardSubTitle}>{data.project?.title}</Text>

      <View style={{flexDirection: 'row', gap: 16}}>
        <View style={{flex: 1}}>
          <Text style={styles.cardScheduleTitle}>Diberikan</Text>

          <View style={{flexDirection: 'row', gap: 4}}>
            <IconCalendar width={16} height={16} />

            <Text style={styles.cardScheduleDate}>
              {dayjs(data.time_start).format('ddd, DD MMM YYYY')}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.cardScheduleTitle}>Selesai</Text>

          <View style={{flexDirection: 'row', gap: 4}}>
            <IconCalendar width={16} height={16} />

            <Text style={styles.cardScheduleDate}>
              {dayjs(data.time_finish).format('ddd, DD MMM YYYY')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardScheduleTeacher}>
        <Image
          source={{uri: data.sender.avatar}}
          style={{width: 32, height: 32, borderRadius: 16}}
        />

        <Text>{data.sender.full_name}</Text>
      </View>

      <Divider />

      <View style={styles.cardFooter}>
        {data.status === 'berlangsung' ? (
          <View style={{flexDirection: 'row'}}>
            <LiveIcon width={16} height={16} />

            <Text style={styles.cardSedangBerlangsungText}>
              Sedang berlangsung
            </Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row', gap: 8}}>
            {data.status === 'batal' ? (
              <IcCloseRed height={16} width={16} />
            ) : (
              <IcCheckGreen height={16} width={16} />
            )}
            <Text
              style={[
                styles.cardRiwayatText,
                {
                  color:
                    data.status === 'batal'
                      ? Colors.danger.base
                      : Colors.success.base,
                },
              ]}>
              {data.status === 'batal' ? 'Dibatalkan' : 'Projek Selesai'}
            </Text>
          </View>
        )}

        <Button
          label="Detail"
          style={{paddingHorizontal: 12}}
          action={onClickDetail}
        />
      </View>

      <SwipeUp visible={openOptions} onClose={() => setOpenOptions(false)}>
        <View style={swipeUpStyle.container}>
          <Pressable
            onPress={() => {
              setOpenOptions(false);
              setTimeout(() => {
                onClickUbah?.(data);
              }, 500);
            }}
            style={swipeUpStyle.contentRow}>
            <IconEdit width={24} height={24} />

            <Text style={swipeUpStyle.text}>Ubah</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setOpenOptions(false);
              setTimeout(() => {
                onClickHapus?.(data);
              }, 500);
            }}
            style={swipeUpStyle.contentRow}>
            <IconDelete width={24} height={24} />

            <Text style={swipeUpStyle.text}>Hapus</Text>
          </Pressable>
        </View>
      </SwipeUp>
    </View>
  );
};

export default StatusProyekCard;
