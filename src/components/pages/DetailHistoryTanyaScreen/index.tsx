import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IHistoryTanyaResponseData} from '@redux';
import provider from '@services/tanya/provider';
import mediaProvider from '@services/media/provider';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import {STATUSBAR_HEIGHT, convertDate} from '@constants/functional';

import {IDetailHistoryTanyaResponseData} from '@services/tanya/type';
import {IMAGES} from '@constants/image';
import {Button} from '@components/atoms';
import ImageViewer from '@components/molecules/ImageViewer';
import {ParamList} from 'type/screen';
import RenderHtmlView from '@components/organism/RenderHtmlView';
import {Divider} from 'react-native-paper';
import RenderImage from '@components/atoms/RenderImage';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';

type ContentProps = {
  data?: IHistoryTanyaResponseData;
  status: HistoryStatusType;
  setPreviewImage: React.Dispatch<React.SetStateAction<boolean>>;
};

const AnswerContent = (props: ContentProps) => {
  const titleLabel = props.status === 'closed' ? 'Jawaban' : 'Keterangan';
  const answerNote = props.data?.answer?.note;
  return (
    <View style={styles.answerContentContainer}>
      <View style={styles.answerContent}>
        <Text style={styles.answerTitle}>{titleLabel}</Text>
        {props.data?.answer?.path_url && (
          <Pressable
            // onPress={() => props.setPreviewImage(true)}
            style={styles.questionImage}>
            {/* <Image
              source={hostEndsWith(props.data?.answer?.path_url)}
              style={styles.questionImageSize}
            /> */}
            <RenderImage
              imageUrl={props.data?.answer?.path_url}
              style={styles.questionImageSize}
              height={styles.questionImageSize.height}
              width={WINDOW_WIDTH}
              resizeMode="cover"
              showPreviewImage
            />
          </Pressable>
        )}
        <RenderHtmlView source={{html: answerNote || ''}} />
        <Text style={styles.idLabel}>ID: {props.data?.ID}</Text>
      </View>
      <View>
        <Text style={styles.idLabel}>
          Dijawab oleh{' '}
          <Text style={styles.labelFullname}>
            {props.data?.answer?.user?.full_name}
          </Text>
        </Text>
        <View style={styles.dateContentContainer}>
          <Text style={styles.dateLabel}>
            {props.data?.answer?.CreatedAt
              ? `${convertDate(props.data?.answer?.CreatedAt).format(
                  'D MMM YYYY',
                )} \u2022 ${convertDate(props.data?.answer?.CreatedAt).format(
                  'HH.mm',
                )}`
              : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

const NotYetAnswerContent = () => {
  return (
    <View style={styles.notAnswerContent}>
      <Image source={IMAGES.emptyQuestion} style={styles.notAnswerImage} />
      <Text style={styles.notAnswerLabel}>
        Tunggu pertanyaanmu dijawab oleh Guru Ahli Kelas Pintar, ya!
      </Text>
    </View>
  );
};

const DetailHistoryTanyaScreen: React.FC = () => {
  const [detailData, setDetailData] =
    useState<IDetailHistoryTanyaResponseData>();
  const [previewImage, setPreviewImage] = useState<boolean>(false);

  const route = useRoute<RouteProp<ParamList, 'DetailHistoryTanyaScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'DetailHistoryTanyaScreen'>>();

  const isTerjawab =
    detailData?.detail.status === 'closed' && detailData?.detail?.answer;
  const isTidakSesuai =
    detailData?.detail.status === 'cancel' && detailData?.detail?.answer;
  const subjectName = detailData?.detail?.Subject?.name ?? 'Mata Pelajaran';
  const chapterName = detailData?.detail?.Chapter?.name ?? 'Bab 1';

  useEffect(() => {
    const getDetailData = async () => {
      try {
        const res = await provider.getDetailHistoryTanya(route.params.tanyaId);
        if (res.data?.data?.detail?.image) {
          let resImage = await mediaProvider.getImage(
            res.data.data.detail.image,
          );
          res.data.data.detail.path_url = resImage?.data?.path_url;
        }

        if (res.data?.data?.detail?.answer?.image) {
          let resImage = await mediaProvider.getImage(
            res.data.data.detail.answer.image,
          );
          res.data.data.detail.answer.path_url = resImage?.data?.path_url;
        }

        setDetailData(res.data?.data ?? {});
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };
    getDetailData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          label={subjectName}
          subLabel={chapterName}
          backgroundColor={Colors.white}
          styleContainer={{marginTop: STATUSBAR_HEIGHT}}
        />
      ),
      headerShown: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailData]);

  const onRequestClosePreviewImage = () => {
    setPreviewImage(false);
  };

  const renderAnswerContent = () => {
    if (isTerjawab || isTidakSesuai) {
      return (
        <AnswerContent
          setPreviewImage={setPreviewImage}
          data={detailData.detail}
          status={
            (detailData?.detail?.status ?? 'pending') as HistoryStatusType
          }
        />
      );
    }
    return <NotYetAnswerContent />;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 16,
            backgroundColor: Colors.white,
            flexGrow: 1,
          }}>
          <View
            style={{
              width: '100%',
              height: 200,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            {/* <Image
              source={hostEndsWith(detailData?.detail?.path_url ?? '')}
              style={{width: '100%', height: 200}}
              resizeMode="cover"
            /> */}
            <RenderImage
              imageUrl={detailData?.detail?.path_url}
              style={{width: '100%', height: 200}}
              resizeMode="cover"
              height={200}
              width={WINDOW_WIDTH}
              showPreviewImage
            />
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={styles.dateContentContainer}>
              <Text style={styles.dateLabel}>
                {detailData?.detail?.CreatedAt
                  ? `${convertDate(detailData?.detail?.CreatedAt).format(
                      'D MMM YYYY',
                    )} \u2022 ${convertDate(
                      detailData?.detail?.CreatedAt,
                    ).format('HH.mm')}`
                  : ''}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 11,
                marginTop: 12,
                color: Colors.primary.base,
              }}>
              ID: {detailData?.detail?.ID}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              color: Colors.dark.neutral100,
            }}>
            {detailData?.detail?.note}
          </Text>
        </View>
        <Divider style={{height: 8, backgroundColor: Colors.dark.neutral10}} />
        {renderAnswerContent()}
      </ScrollView>
      {isTidakSesuai && (
        <View style={{padding: 16, backgroundColor: Colors.white, gap: 12}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: Colors.dark.neutral100,
              fontSize: 12,
            }}>
            {detailData?.footer}
          </Text>
          <Button
            label="Kirim Pertanyaan Lagi"
            color={Colors.primary.base}
            background={Colors.primary.light3}
            action={() => navigation.replace('AskScreen')}
          />
        </View>
      )}
      <ImageViewer
        visible={previewImage}
        onRequestClose={onRequestClosePreviewImage}
        pathUrl={detailData?.detail?.answer?.path_url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    backgroundColor: Colors.white,
  },
  answerContentContainer: {
    padding: 16,
    gap: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
  answerContent: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: Colors.primary.light3,
    gap: 4,
  },
  answerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  questionImage: {borderRadius: 10, overflow: 'hidden'},
  questionImageSize: {width: '100%', height: 120},
  dateContentContainer: {flexDirection: 'row', alignItems: 'center'},
  questionLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.dark.neutral100,
  },
  idLabel: {fontFamily: 'Poppins-Regular', color: Colors.dark.neutral60},
  labelFullname: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
  },
  notAnswerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    gap: 16,
    padding: 16,
  },
  notAnswerImage: {width: 80, height: 80},
  notAnswerLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral100,
    textAlign: 'center',
  },
  dateLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.dark.neutral60,
  },
});

export default DetailHistoryTanyaScreen;
