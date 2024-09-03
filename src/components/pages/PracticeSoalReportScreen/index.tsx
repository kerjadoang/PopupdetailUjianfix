/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {bgBlueOrnament, RightArrow} from '@assets/images';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {Card, CardProgress} from './component';
import IconLatihan from '@assets/svg/ic40_latihan.svg';
import IconVideo from '@assets/svg/ic40_video.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '@api/index';
import apiWithoutToken from '@api/withoutToken';
import {INavigation, IRoute} from 'type/screen';
import {FlatList} from 'react-native-gesture-handler';
import RenderImage from '@components/atoms/RenderImage';
import {EmptyState, MainView} from '@components/atoms';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';

const PracticeSoalReportScreen = () => {
  const navigation = useNavigation<INavigation<'PracticeSoalReportScreen'>>();
  const route = useRoute<IRoute<'PracticeSoalReportScreen'>>();
  const {user} = route?.params || {};
  const [report, setReport] = useState<any>({});
  const isEmptyReport = report?.report?.length === 0 ?? true;

  useEffect(() => {
    const getAllReport = async () => {
      try {
        const {access_token} = route?.params?.user || {};
        let response = !access_token
          ? await api.get('/soal/v1/laporan')
          : await apiWithoutToken.get('/soal/v1/laporan', {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            });

        if (response.status === 200) {
          const data = response.data;

          // const promises = data.data?.report?.map(async (obj: any) => {
          //   if (obj?.subject?.icon_mobile) {
          //     const imgRes = await api.get(
          //       `/media/v1/image/${obj.subject.icon_mobile}`,
          //     );

          //     if (imgRes.status === 200 && imgRes.data?.code === 100) {
          //       obj.subject.path_url = imgRes.data?.data?.path_url;
          //     }
          //   }
          // });

          // await Promise.all(promises);
          setReport(data.data);
        }
      } catch (err) {
        return;
      }
    };

    getAllReport();
  }, []);

  const renderSubjectSoalCard = useCallback(({item}: IFlatListItem) => {
    return (
      <CardProgress
        key={item?.subject?.id}
        img={
          <RenderImage
            imageId={item?.subject.icon_mobile}
            width={48}
            height={48}
            placeholder={<MainView height={48} width={48} />}
          />
        }
        title={item?.subject?.name}
        taskdone={item?.summary?.user_progress}
        alltask={item?.summary?.total_question}
        action={() => {
          navigation.navigate('PracticeSoalReportDetailScreen', {
            Data: item,
            user,
          });
        }}
        progress={item?.summary?.progress_percentage}
      />
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={bgBlueOrnament} style={styles.bg} />
      <Header
        label={'Laporan Latihan Soal'}
        colorLabel={Colors.white}
        backgroundColor={Colors.primary.base}
        iconLeft={
          <Image
            source={RightArrow}
            style={[styles.iconBtn, {transform: [{rotate: '180deg'}]}]}
          />
        }
      />
      <View>
        <View>
          <View style={{paddingHorizontal: 16}}>
            <Card
              label={`${report?.video_watched ?? 0} Video Animasi`}
              subLabel={'telah ditonton'}
              img={<IconVideo width={40} height={40} />}
            />

            <Card
              label={`${report?.soal_completed ?? 0} Latihan Soal`}
              subLabel={'telah dikerjakan'}
              img={<IconLatihan width={40} height={40} />}
            />
          </View>
        </View>

        <FlatList
          style={styles.container}
          data={report?.report || []}
          scrollEnabled={!isEmptyReport}
          contentContainerStyle={[
            styles.contentContainer,
            isEmptyReport && styles.emptyItemStyle,
          ]}
          renderItem={renderSubjectSoalCard}
          ListEmptyComponent={<EmptyState title="Laporan belum tersedia" />}
          ListFooterComponent={<View style={{height: 100}} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: 400,
    position: 'absolute',
    paddingTop: 20,
  },
  iconBtn: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    transform: [{rotate: '90deg'}],
  },
  container: {
    padding: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.white,
    // marginTop: 250,
    // height: '68%',
    overflow: 'hidden',
    marginTop: 4,
    height: WINDOW_HEIGHT * 0.7,
  },
  contentContainer: {
    // paddingBottom: 50,
  },
  emptyItemStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export {PracticeSoalReportScreen};
