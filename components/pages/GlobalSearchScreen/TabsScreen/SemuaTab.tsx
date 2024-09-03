import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';

import PlayButton from '@assets/svg/ic_play_btn.svg';
import MapelIpa from '@assets/svg/ic56_mapel_ipa.svg';
import MapelMatematika from '@assets/svg/ic56_mapel_matematika.svg';

import SectionHeader from '@components/organism/SectionHeader';
import {ListItem, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import {useSelector} from 'react-redux';
import {ISpecificSearchResponseData} from '@redux';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '@constants/fonts';
import {EmptyData} from '@components/pages/GlobalSearchScreen';
import useScreen from '../useScreen';
import {ParamList} from 'type/screen';

const VideoThumbnail = (props: any) => {
  return (
    <ImageBackground source={props.img} style={styles.videoThumbnail}>
      <PlayButton />
    </ImageBackground>
  );
};

const SemuaTab: React.FC = () => {
  const navigation =
    useNavigation<MaterialTopTabNavigationProp<ParamList, 'SemuaTabScreen'>>();
  const specificSearchAll = useSelector((state: any) => state.specificSearch);
  const route = useRoute<RouteProp<ParamList, 'SemuaTabScreen'>>();

  const {query} = route.params;
  const {
    _handlerNavigationMateri,
    _handlerNavigationVideo,
    _handlerNavigationSoal,
    _handlerNavigationLainnya,
  } = useScreen();

  const isMateriDataExist = specificSearchAll?.allData?.materi?.length > 0;
  const isVideoDataExist = specificSearchAll?.allData?.video?.length > 0;
  const isSoalDataExist = specificSearchAll?.allData?.soal?.length > 0;
  const isLainnyaDataExist = specificSearchAll?.allData?.lainnya?.length > 0;

  const materiData = specificSearchAll?.allData?.materi;
  const soalData = specificSearchAll?.allData?.soal;
  const videoData = specificSearchAll?.allData?.video;
  const lainnyaData = specificSearchAll?.allData?.lainnya;

  const materiDataCount = specificSearchAll?.allData?.aggregation?.filter(
    (item: any) => item.key === 'materi',
  );
  const soalDataCount = specificSearchAll?.allData?.aggregation?.filter(
    (item: any) => item.key === 'soal',
  );
  const videoDataCount = specificSearchAll?.allData?.aggregation?.filter(
    (item: any) => item.key === 'video',
  );
  const lainnyaDataCount = specificSearchAll?.allData?.aggregation?.filter(
    (item: any) => item.key === 'lainnya',
  );

  if (
    !isMateriDataExist &&
    !isVideoDataExist &&
    !isSoalDataExist &&
    !isLainnyaDataExist
  ) {
    return (
      <MainView backgroundColor={Colors.white} flex={1}>
        <EmptyData query={query} />
      </MainView>
    );
  }
  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        {isMateriDataExist && (
          <>
            <SectionHeader
              sectionTitle={`Materi (${materiDataCount?.[0].doc_count})`}
              sectionSubtitle="Lihat Semua"
              onPressSectionSubtitle={() =>
                navigation.navigate('MateriTabScreen', {
                  query,
                })
              }
              sectionContainerStyle={{
                marginBottom: 12,
                marginTop: 16,
                paddingHorizontal: 16,
              }}
            />
            <View style={{paddingHorizontal: 16}}>
              {materiData?.map(
                (item: ISpecificSearchResponseData, index: number) => (
                  <ListItem
                    key={item.id}
                    {...item}
                    firstIndex={index === 0}
                    left={<MapelIpa />}
                    onPress={() => {
                      _handlerNavigationMateri(
                        item.service_method?.group || '',
                        item.service_method?.name || '',
                        item,
                      );
                    }}
                  />
                ),
              )}
            </View>
          </>
        )}
        {isSoalDataExist && (
          <>
            <SectionHeader
              sectionTitle={`Soal (${soalDataCount?.[0].doc_count})`}
              sectionSubtitle="Lihat Semua"
              onPressSectionSubtitle={() =>
                navigation.navigate('SoalTabScreen', {
                  query,
                })
              }
              sectionContainerStyle={{
                marginBottom: 12,
                marginTop: 32,
                paddingHorizontal: 16,
              }}
            />
            <View style={{paddingHorizontal: 16}}>
              {soalData?.map(
                (item: ISpecificSearchResponseData, index: number) => (
                  <ListItem
                    key={item.id}
                    {...item}
                    firstIndex={index === 0}
                    left={<MapelMatematika />}
                    onPress={() => {
                      _handlerNavigationSoal(
                        item.service_method?.group || '',
                        item.service_method?.name || '',
                        item,
                      );
                    }}
                  />
                ),
              )}
            </View>
          </>
        )}
        {isVideoDataExist && (
          <>
            <SectionHeader
              sectionTitle={`Video (${videoDataCount?.[0].doc_count})`}
              sectionSubtitle="Lihat Semua"
              onPressSectionSubtitle={() =>
                navigation.navigate('VideoTabScreen', {
                  query,
                })
              }
              sectionContainerStyle={{
                marginBottom: 12,
                marginTop: 32,
                paddingHorizontal: 16,
              }}
            />
            <View style={{paddingHorizontal: 16}}>
              {videoData?.map(
                (item: ISpecificSearchResponseData, index: number) => (
                  <ListItem
                    titleStyle={{
                      width: Dimensions.get('screen').width - 180,
                    }}
                    key={item.id}
                    {...item}
                    firstIndex={index === 0}
                    left={
                      <VideoThumbnail
                        img={require('@assets/images/video_thumbnail.png')}
                      />
                    }
                    onPress={() => {
                      _handlerNavigationVideo(
                        item.service_method?.group || '',
                        item.service_method?.name || '',
                        item,
                      );
                    }}
                  />
                ),
              )}
            </View>
          </>
        )}
        {isLainnyaDataExist && (
          <>
            <SectionHeader
              sectionTitle={`Lainnya (${lainnyaDataCount?.[0].doc_count})`}
              sectionSubtitle="Lihat Semua"
              onPressSectionSubtitle={() =>
                navigation.navigate('LainnyaTabScreen', {
                  query,
                })
              }
              sectionContainerStyle={{
                marginBottom: 12,
                marginTop: 32,
                paddingHorizontal: 16,
              }}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  gap: 16,
                }}>
                {lainnyaData?.map((item: ISpecificSearchResponseData) => (
                  <Pressable
                    onPress={() => {
                      _handlerNavigationLainnya(
                        item.service_method?.group || '',
                        item,
                      );
                    }}>
                    <Image
                      source={{uri: item?.thumbnail}}
                      style={styles.lainnyaThumbnail}
                    />
                    <LinearGradient
                      colors={['#FFFFFF00', '#000000CC']}
                      style={styles.lainnyaOverlay}
                    />

                    <Text style={styles.lainnyaTitle} numberOfLines={2}>
                      {item.name}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingBottom: 16,
  },
  videoThumbnail: {
    width: 124,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lainnyaThumbnail: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  lainnyaOverlay: {
    position: 'absolute',
    width: 120,
    height: 160,
    borderRadius: 10,
  },
  lainnyaTitle: {
    position: 'absolute',
    bottom: 0,
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.white,
    padding: 12,
  },
});

export default SemuaTab;
