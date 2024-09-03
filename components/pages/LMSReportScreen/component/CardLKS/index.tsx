import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {AvgGrade, ILKSSummaryReportResponseData} from '@services/lms/type';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import IconLKS from '@assets/svg/ic24_LKS.svg';
import ChevronRight from '@assets/svg/ic16_chevron_right.svg';
import {BlueBackArrow} from '@assets/images';

type ChapterMarkListProps = {
  data: AvgGrade;
  index: number;
  pointColor?: string;
};

const ChapterMarkList: React.FC<ChapterMarkListProps> = props => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: Colors.dark.neutral20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts.SemiBoldPoppins,
            fontSize: 12,
            color: Colors.dark.neutral60,
          }}>
          {props.index}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: Fonts.RegularPoppins,
          color: Colors.dark.neutral100,
          fontSize: 14,
          flexGrow: 1,
        }}>
        {props.data.subject_name}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SemiBoldPoppins,
          color: props.pointColor ?? Colors.primary.base,
          fontSize: 14,
        }}>
        {props.data.poin}
      </Text>
    </View>
  );
};

type CardLKSProps = {
  lksSummaryReportData?: ILKSSummaryReportResponseData;
  navigation?: any;
};

const CardLKS: React.FC<CardLKSProps> = ({
  lksSummaryReportData,
  navigation,
}) => {
  const [show, setShow] = useState(true);

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: Colors.white,
        borderRadius: 10,
        elevation: 4,
        gap: 12,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <IconLKS />
        <Text
          style={{
            fontFamily: Fonts.SemiBoldPoppins,
            fontSize: 14,
            color: Colors.dark.neutral100,
          }}>
          LKS
        </Text>
      </View>
      <Text
        style={{
          fontFamily: Fonts.RegularPoppins,
          fontSize: 12,
          color: Colors.dark.neutral60,
        }}>
        Total LKS telah dikerjakan
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SemiBoldPoppins,
          color: Colors.dark.neutral100,
          fontSize: 16,
        }}>
        {lksSummaryReportData?.total_completed_lks}
      </Text>
      {/* {lksSummaryReportData?.total_uncompleted_lks ? ( */}
      <View
        style={{
          borderRadius: 10,
          backgroundColor: Colors.primary.light3,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontFamily: Fonts.RegularPoppins,
            color: Colors.dark.neutral100,
            fontSize: 14,
            flexGrow: 1,
          }}>
          {lksSummaryReportData?.total_uncompleted_lks} Belum dikerjakan
        </Text>
        <Pressable
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation?.navigate?.('QuestionScreen')}>
          <Text
            style={{
              fontFamily: Fonts.SemiBoldPoppins,
              color: Colors.primary.base,
              fontSize: 14,
            }}>
            Kerjakan
          </Text>
          <ChevronRight />
        </Pressable>
      </View>
      {/* ) : null} */}
      {show && (
        <View style={{gap: 8}}>
          {(lksSummaryReportData?.avg_tertinggi ?? []).length > 0 && (
            <>
              <Text
                style={{
                  fontFamily: Fonts.RegularPoppins,
                  color: Colors.dark.neutral60,
                  fontSize: 12,
                }}>
                Nilai Tertinggi
              </Text>
              {lksSummaryReportData?.avg_tertinggi?.map((mark, index) => {
                return (
                  <ChapterMarkList key={index} data={mark} index={index + 1} />
                );
              })}
            </>
          )}
          {(lksSummaryReportData?.avg_terendah ?? [])?.length > 0 && (
            <>
              <Text
                style={{
                  fontFamily: Fonts.RegularPoppins,
                  color: Colors.dark.neutral60,
                  fontSize: 12,
                }}>
                Nilai Terendah (Di Bawah KKM)
              </Text>
              {lksSummaryReportData?.avg_terendah?.map((mark, index) => {
                return (
                  <ChapterMarkList
                    key={index}
                    data={mark}
                    index={index + 1}
                    pointColor={Colors.danger.base}
                  />
                );
              })}
            </>
          )}
        </View>
      )}
      <Pressable onPress={() => setShow(!show)} style={styles.btn}>
        <Text style={styles.textBtn}>
          {show ? 'Sembunyikan' : 'Lihat Nilai Rata-Rata'}
        </Text>
        <Image
          source={BlueBackArrow}
          style={
            show
              ? styles.iconBtn
              : [styles.iconBtn, {transform: [{rotate: '270deg'}]}]
          }
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  iconBtn: {
    transform: [{rotate: '90deg'}],
    alignSelf: 'center',
    marginLeft: 5,
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  textBtn: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.primary.base,
  },
});

export default CardLKS;
