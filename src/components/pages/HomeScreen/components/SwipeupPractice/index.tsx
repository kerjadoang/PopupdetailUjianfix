import React, {FC} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from '../../styles';
import {Widget, Button} from '@components/atoms';
import {SubjectType} from '@constants/subjectType';
import LogoAsesmenFormatif from '@assets/svg/ic_asesmen_formatif.svg';
import IcLaporan from '@assets/svg/ic24_laporan.svg';
import LogoPractice from '@assets/svg/ic32_practice.svg';
import Colors from '@constants/colors';

type Props = {
  isIKM?: boolean;
  getSubjectsByClass?: any;
  setIsShowPracticeSubjects?: CallBackWithParams<void, boolean>;
  navigation: any;
};

const SwipeupPractice: FC<Props> = ({
  navigation,
  getSubjectsByClass,
  isIKM,
  setIsShowPracticeSubjects,
}) => {
  return (
    <View style={styles.swipeUpContainer}>
      <View style={styles.swpTopContent}>
        <View style={styles.swpTopInnerContent}>
          <View style={styles.swpTopBodyContent}>
            {isIKM ? (
              <LogoAsesmenFormatif width={22} height={22} />
            ) : (
              <LogoPractice width={22} height={22} />
            )}
            <Text style={styles.swpTopTitle}>
              {isIKM ? 'Asesmen Formatif' : 'Practice'}
            </Text>
          </View>
          <View style={styles.swpTopTitle2Container}>
            <Text style={styles.swpTopTitle2}>Mau latihan apa hari ini?</Text>
          </View>
        </View>
      </View>
      <View style={styles.swpMiddleContent}>
        <View style={styles.swpMiddleContent2}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.swpMiddleScrollViewInner}>
              {getSubjectsByClass?.data?.map((ie: any) => {
                return (
                  <View key={ie?.id} style={styles.swpMiddleInnerContent}>
                    <View>
                      <Widget
                        type={1}
                        title={ie?.name || '-'}
                        action={() => {
                          setIsShowPracticeSubjects?.(false);
                          navigation.navigate('ChapterKPRegularScreen', {
                            subject_data: ie,
                            subject_type: SubjectType?.KPRegular?.Practice,
                          });
                        }}
                        remove={false}
                        add={false}
                        imageId={ie?.icon_mobile}
                        svg={ie?.icon_path_url}
                        image={
                          'https://cdn-icons-png.flaticon.com/512/3884/3884851.png'
                        }
                        backgroundColor={Colors.white}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.swpBottomContent}>
        <Button
          label={'Lihat Progres Belajar Saya'}
          textStyle={{flex: 0.85, textAlign: 'center', paddingRight: 16}}
          rightIcon={true}
          iconLeft={<IcLaporan />}
          action={() => {
            setIsShowPracticeSubjects?.(false);
            navigation.navigate('KPRegularLaporanScreen');
          }}
        />
      </View>
    </View>
  );
};

export default SwipeupPractice;
