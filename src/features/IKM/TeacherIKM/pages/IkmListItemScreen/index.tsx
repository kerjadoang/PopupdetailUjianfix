import React, {useLayoutEffect} from 'react';
import {View, ScrollView, FlatList, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  Button,
  Header,
  MainText,
  MainView,
  PopUp,
  SwipeUp,
} from '@components/atoms';
import Colors from '@constants/colors';
import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import CardSubjectInfo from './components/CardSubjectInfo';
import IconInfo from '@assets/svg/ic24_blue_info.svg';
import IconUpload from '@assets/svg/ic24_uploadWhite.svg';
import IconEdit from '@assets/svg/ic24_edit_2.svg';
import IconTrash from '@assets/svg/ic_trash_red.svg';
import RobotDelete from '@assets/svg/ic_robot_hapus.svg';
import CardListItem from './components/CardListItem';
import {
  PDFViewerIKMScreenParam,
  UploadFileIkmScreenParam,
  VideoPlayerIkmScreenParam,
} from 'type/screen';
import useIkmListItem from './useIkmListItem';

const IkmListItemScreen = () => {
  const {
    navigation,
    navigateScreen,
    title,
    services,
    listItem,
    setSelectedItem,
    showDeletePopUp,
    setShowDeletePopUp,
    data,
    showMoreSwipeUp,
    setShowMoreSwipeUp,
    onPressEdit,
    onPressDelete,
    deleteItem,
  } = useIkmListItem();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={title} />,
    });
  }, []);

  const isATP = services === 'Alur Tujuan Pembelajaran';
  const isModulAjar = services === 'Modul Ajar';
  const isVideoTutorial = services === 'Video Tutorial';

  return (
    <>
      <View style={styles.container}>
        <MainView
          height={4}
          width={WINDOW_WIDTH}
          backgroundColor={Colors.dark.neutral10}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {!isVideoTutorial && !isModulAjar ? (
            <MainView marginHorizontal={16} marginTop={16} marginBottom={24}>
              <CardSubjectInfo data={data} />
            </MainView>
          ) : null}

          {isATP ? (
            <MainView style={styles.infoATPWrapper}>
              <IconInfo />
              <MainText color={Colors.dark.neutral100} flex={1}>
                Silahkan Gunakan ATP Berikut sebagai inspirasi. Lalu, susun ATP
                sendiri sesuai kondisi murid Anda.
              </MainText>
            </MainView>
          ) : null}

          <FlatList
            scrollEnabled={false}
            data={listItem}
            renderItem={(item: any) => {
              return (
                <CardListItem
                  phase={data?.phase}
                  type={services}
                  data={item}
                  onPress={() => {
                    if (!isVideoTutorial) {
                      navigateScreen<PDFViewerIKMScreenParam>(
                        'PDFViewerIKMScreen',
                        {
                          data: item?.item,
                          title: title,
                          accountRole: 'GURU',
                        },
                      );
                    } else {
                      item.item.file_id = item?.item?.media_id;
                      navigateScreen<VideoPlayerIkmScreenParam>(
                        'VideoPlayerIkmScreen',
                        {
                          data: item?.item,
                          userRole: 'GURU',
                        },
                      );
                    }
                  }}
                  onClickMore={() => {
                    setShowMoreSwipeUp(true);
                    setSelectedItem(item?.item);
                  }}
                />
              );
            }}
          />
        </ScrollView>
        {isATP || isModulAjar ? (
          <MainView margin={16}>
            <Button
              action={() => {
                navigateScreen<UploadFileIkmScreenParam>(
                  'UploadFileIkmScreen',
                  {
                    type: 'Unggah',
                    serviceType: title === 'Modul Ajar' ? 'Modul Ajar' : 'ATP',
                    data: data,
                  },
                );
              }}
              label={`Unggah ${title?.replace(
                'Alur Tujuan Pembelajaran',
                'ATP',
              )}`}
              iconLeft={<IconUpload />}
            />
          </MainView>
        ) : null}
      </View>

      <SwipeUp
        visible={showMoreSwipeUp}
        onClose={() => setShowMoreSwipeUp(false)}>
        <MainView padding={16} gap={24}>
          <TouchableOpacity onPress={onPressEdit}>
            <MainView flexDirection="row" gap={12} alignItems="center">
              <IconEdit />
              <Text style={styles.moreTextBtn}>
                {`Ubah ${title?.replace('Alur Tujuan Pembelajaran', 'ATP')}`}
              </Text>
            </MainView>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressDelete}>
            <MainView flexDirection="row" gap={12} alignItems="center">
              <IconTrash />
              <Text style={styles.moreTextBtn}>
                {`Hapus ${title?.replace('Alur Tujuan Pembelajaran', 'ATP')}`}
              </Text>
            </MainView>
          </TouchableOpacity>
        </MainView>
      </SwipeUp>

      <PopUp
        show={showDeletePopUp}
        Icon={RobotDelete}
        title={`Hapus ${title?.replace('Alur Tujuan Pembelajaran', 'ATP')}`}
        subtitle={`Apakah Anda yakin untuk menghapus ${title?.replace(
          'Alur Tujuan Pembelajaran',
          'ATP',
        )}?`}
        styleTitle={{
          paddingBottom: 16,
        }}
        titleCancel={'Hapus'}
        actionCancel={deleteItem}
        titleConfirm={'Kembali'}
        actionConfirm={() => setShowDeletePopUp(false)}
      />
    </>
  );
};

export {IkmListItemScreen};
