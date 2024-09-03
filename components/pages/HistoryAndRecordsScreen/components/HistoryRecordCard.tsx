import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import 'dayjs/locale/id';
import {formatDate} from '@constants/functional';
import {SvgUri} from 'react-native-svg';
import {PopUp, ProgressCircle} from '@components/atoms';
import IconCheck from '@assets/svg/ic_play_btn_blue.svg';
import useRecord from '../useRecord';
import IconDownload from '@assets/svg/ic16_download.svg';
import IcChecklist from '@assets/svg/ic_checklist_white.svg';
import Icon_green_download from '@assets/svg/ic_already_download.svg';
import Ic_mulai from '@assets/svg/ic16_Mulai.svg';
const HistoryRecordCard = ({
  data,
  onPress,
  onPressDownload,
  progress = 0,
  ready,
  listSelected,
  submitDelete,
}: any) => {
  const {dataRecord} = useRecord(data.id);
  const date = formatDate(data?.time_start, data?.time_end);
  const isDone = data?.access_record;
  const [show, setShow] = useState(false);
  const renderPlayButton = isDone ? (
    <IconCheck width={52} height={52} />
  ) : (
    <IconCheck width={52} height={52} />
  );
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.containerTitle}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.containerTitleCard}>
            <Text style={styles.titleCard}>{data?.type}</Text>
          </View>
          <View style={styles.containerTitleCard}>
            <Text style={styles.titleCard}>{data?.platform}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.dot}
          onPress={() => setShow(true)}
          disabled={ready && listSelected?.id === data?.id ? true : false}>
          <ProgressCircle
            progress={ready && listSelected?.id === data?.id ? progress : 0}
            size={45}
            strokeWidth={data?.downloaded ? 0 : 3}
            color={'#09B95A'}
            children={
              data?.downloaded ? (
                <Icon_green_download width={25} height={25} />
              ) : ready && listSelected?.id === data?.id ? (
                <Ic_mulai width={25} height={25} />
              ) : (
                <IconDownload width={20} height={20} />
              )
            }
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.examName}>{data?.subject?.name}</Text>
      <Text style={styles.examTitle}>{data?.title ? data.title : '-'}</Text>

      <View style={{marginTop: 4, marginBottom: 20}}>
        <Text style={styles.examDate}>{date ? date : '-'}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {data?.avatar_icon_url?.endsWith('svg') ? (
            <SvgUri
              uri={data?.avatar_icon_url}
              height={32}
              width={32}
              style={{borderRadius: 20}}
            />
          ) : (
            <Image
              style={styles.personImage}
              source={{
                uri: data?.avatar_icon_url,
              }}
            />
          )}
          <Text style={styles.personName}>
            {data?.user_created_by?.full_name}
          </Text>
        </View>
        <View>
          {dataRecord && data?.status !== 'canceled' ? (
            <View style={styles.progressCircle}>
              <ProgressCircle
                progress={isDone ? 100 : 0}
                size={56}
                strokeWidth={3}
                color={Colors.primary.base}
                children={renderPlayButton}
              />
            </View>
          ) : null}
          {isDone && (
            <View style={styles.icChecklist}>
              <IcChecklist height={12} width={12} />
            </View>
          )}
        </View>
      </View>
      <View style={{}}>
        <Text style={styles.bottomTitle}>
          {!dataRecord
            ? 'Rekaman tidak tersedia'
            : data?.status === 'canceled'
            ? 'Dibatalkan'
            : ''}
        </Text>
      </View>
      <PopUp
        show={show}
        close={() => setShow(false)}
        title={data?.downloaded ? 'Hapus Video' : 'Unduh Video'}
        desc={
          data?.downloaded
            ? 'Apakah kamu yakin untuk menghapus unduhan? Video tidak dapat ditonton kembali tanpa koneksi internet.'
            : 'Apakah kamu yakin untuk mengunduh? Video dapat ditonton tanpa koneksi internet setelah selesai diunduh..'
        }
        titleCancel={data?.downloaded ? 'Hapus' : 'Kembali'}
        titleConfirm={data?.downloaded ? 'Kembali' : 'Unduh'}
        actionCancel={() => {
          if (data?.downloaded) {
            setShow(false);
            submitDelete(data);
          } else {
            setShow(false);
          }
        }}
        actionConfirm={() => {
          if (data?.downloaded) {
            setShow(false);
          } else {
            setShow(false);
            onPressDownload(data);
          }
        }}
      />
    </Pressable>
  );
};

export default HistoryRecordCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    marginHorizontal: 2,
    marginTop: 2,
    marginBottom: 16,
  },
  containerTitleCard: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  titleCard: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
    textAlign: 'center',
  },
  leftCard: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  examName: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.25,
    marginTop: 8,
    marginBottom: 4,
    color: Colors.dark.neutral100,
  },
  examTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  examDate: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  examType: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.danger.base,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  personName: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginLeft: 12,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  cardBottom2: {
    marginTop: 12,
  },
  rectangle: {
    borderTopWidth: 1,
    borderColor: Colors.dark.neutral20,
    marginHorizontal: -16,
    marginTop: 16,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  personImage: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: Colors.purple.light,
  },
  bottomTitle: {
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'right',
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.primary.light3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icChecklist: {
    top: -3,
    left: -23,
    position: 'absolute',
    backgroundColor: Colors.success.light1,
    padding: 4,
    borderRadius: 20,
  },
  progressCircle: {
    position: 'absolute',
    top: -40,
    left: -60,
  },
});
