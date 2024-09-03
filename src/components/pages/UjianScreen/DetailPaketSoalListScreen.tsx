/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import React, {useEffect, useLayoutEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  MainText,
  MainView,
  MenuItemButtonType,
  MoreMenu,
  PopUp,
  SwipeUp,
} from '@components/atoms';
import DocumentBankSoalIcon from '@assets/svg/ic_document.svg';
import DocumentBuatSoalSendiriIcon from '@assets/svg/ic_document_add_own_question.svg';
import IconMore from '@assets/svg/ic24_more_blue.svg';
import IconRobotDelete from '@assets/svg/ic_robot_hapus.svg';
import IconUpload from '@assets/svg/ic_upload_blue.svg';
import {useScreenDetailPaketSoal} from './useScreen/useScreenDetailPaketSoal';
import FooterDetailPaketSoalList from './components/FooterDetailPaketSoalList';
import BodyDetailPaketSoalList from './components/BodyDetailPaketSoalList';
import HeaderDetailPaketSoalList from './components/HeaderDetailPaketSoalList';
import UploadCardComponent from '../LMSTeacherLaporanKehadiranMuridScreen/atoms/uploadCardComponent';

const DetailPaketSoalListScreen: React.FC = () => {
  const {
    navigation,
    isFocused,
    title,
    subtitle,
    package_id,
    subject_id,
    isAddMode,
    class_id,
    chapter_id,
    data,
    refetch,
    visibleMenu,
    setVisibleMenu,
    selectedSoal,
    showSwipeUpMore,
    setShowSwipeUpMore,
    showSwipeUpUpload,
    setShowSwipeUpUpload,
    showPopUpDeletePackage,
    setShowPopUpDeletePackage,
    onPressSoalItem,
    onAddSoalToPaketSoal,
    listMore,
    deletePackageSoal,
    actionMore,
    listMode,
    onDoneEditMode,
    showPopUpListMore,
    setShowPopUpListMore,
    actionCancelListMore,
    actionConfirmListMore,
    _handlerDocumentSelection,
    handleRemoveData,
    fileData,
    progressUpload,
    localFileName,
    uploadError,
    handleDownloadTemplateBulk,
    handleCancelUpload,
    handleSubmitUpload,
  } = useScreenDetailPaketSoal();

  useLayoutEffect(() => {
    const headerTitle =
      listMode === 'detail'
        ? title
        : listMode === 'delete'
        ? 'Pilih Soal'
        : 'Atur Urutan Soal';

    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          iconLeft={listMode === 'detail' ? undefined : <></>}
          label={headerTitle}
          subLabel={listMode === 'detail' ? subtitle : undefined}
          iconRight={listMode === 'detail' ? <IconMore /> : undefined}
          onPressIconRight={() => setShowSwipeUpMore(true)}
        />
      ),
    });
  }, [listMode]);

  useEffect(() => {
    if (isFocused) {
      refetch(package_id);
    }
  }, [isFocused]);

  const menus: MenuItemButtonType[] = [
    {
      label: 'Pilih dari Bank Soal',
      icon: <DocumentBankSoalIcon height={24} width={24} />,
      onPress: () => {
        setVisibleMenu(false);
        navigation.navigate('BankSoalScreen', {
          title,
          subtitle,
          subject_id,
          class_id,
          chapter_id,
          package_id: data?.data?.id,
          fromCreateJadwal: false,
        });
      },
    },
    {
      label: 'Buat Soal Sendiri',
      icon: <DocumentBuatSoalSendiriIcon height={24} width={24} />,
      onPress: () => {
        setVisibleMenu(false);
        navigation.navigate('CreateSoalSendiriScreen', {
          subtitle,
          title,
          subject_id,
          chapter_id,
          class_id,
          package_id,
        });
      },
    },
    {
      label: 'Upload Bulk Soal',
      icon: <IconUpload height={24} width={24} />,
      onPress: () => {
        setVisibleMenu(false);
        setShowSwipeUpUpload(true);
      },
    },
  ];

  const renderSwipeUpMoreContent = () => {
    return (
      <MainView paddingHorizontal={16} paddingTop={16} gap={24}>
        {listMore?.map((item: any) => {
          return (
            <TouchableOpacity
              key={item?.id}
              onPress={() => actionMore(item?.title)}>
              <MainView flexDirection="row" gap={12} alignItems="center">
                {item?.icon}
                <MainText
                  fontSize={16}
                  lineHeight={24}
                  color={Colors.dark.neutral100}>
                  {item?.title}
                </MainText>
              </MainView>
            </TouchableOpacity>
          );
        })}
      </MainView>
    );
  };

  const renderSwipeUpUploadContent = () => (
    <MainView marginHorizontal={16} marginBottom={24}>
      <MainText
        type="SemiBold"
        fontSize={20}
        lineHeight={28}
        textAlign="center"
        marginBottom={24}>
        Upload Bulk Soal
      </MainText>
      {!fileData?.file_name ? (
        <Button
          label="Unggah File"
          iconLeft={<IconUpload />}
          background={Colors.primary.light2}
          color={Colors.primary.base}
          action={() => {
            setTimeout(() => {
              _handlerDocumentSelection();
            }, 500);
          }}
        />
      ) : (
        <UploadCardComponent
          fileData={{
            file_name: localFileName || fileData?.file_name || '',
            path_url: fileData?.path_url || '',
            type: fileData?.file_type,
            file_type: fileData?.file_type as IFileExt,
          }}
          hideReUploadButton={false}
          reUploadText="Unggah File"
          handleReUpload={() => {
            setTimeout(() => {
              _handlerDocumentSelection();
            }, 500);
          }}
          progressUpload={progressUpload}
          handleRemoveData={handleRemoveData}
          showDownloadIcon={false}
          isError={uploadError.isError}
          errorMessage={uploadError.errorMessage}
        />
      )}

      {uploadError.isError ? (
        <MainText color={Colors.danger.base} fontSize={12} marginVertical={16}>
          {uploadError.errorMessage}
        </MainText>
      ) : (
        <MainText
          fontSize={12}
          color={Colors.dark.neutral60}
          marginVertical={16}>
          {'Maksimum ukuran file 100 MB.\nFile dalam format .doc/ .docx'}
        </MainText>
      )}

      <MainView flexDirection="row" gap={4}>
        <MainText fontSize={14} color={Colors.neutral.neutral600}>
          Download template upload soal
        </MainText>
        <TouchableOpacity onPress={handleDownloadTemplateBulk}>
          <MainText
            type="Bold"
            fontSize={14}
            color={Colors.primary.base}
            textDecorationLine="underline">
            disini
          </MainText>
        </TouchableOpacity>
      </MainView>

      <MainView flexDirection="row" marginTop={16} gap={16}>
        <Button
          label="Batal"
          style={{flex: 1}}
          background={Colors.primary.light3}
          color={Colors.primary.base}
          action={handleCancelUpload}
        />
        <Button label="Simpan" style={{flex: 1}} action={handleSubmitUpload} />
      </MainView>
    </MainView>
  );

  return (
    <>
      <View style={styles.container}>
        <HeaderDetailPaketSoalList
          labelName={data?.data?.name || ''}
          listMode={listMode}
        />
        <BodyDetailPaketSoalList
          listMode={listMode}
          isAddMode={isAddMode}
          selectedSoal={selectedSoal}
          onPressSoalItem={(soal, index) => onPressSoalItem(soal, index)}
          setVisibleMenu={setVisibleMenu}
        />
        <MoreMenu
          menus={menus}
          height={100}
          visible={visibleMenu}
          onClose={() => setVisibleMenu(false)}
        />
        <FooterDetailPaketSoalList
          listMode={listMode}
          data={data}
          isAddMode={isAddMode}
          onAddSoalToPaketSoal={onAddSoalToPaketSoal}
          onDoneEditMode={onDoneEditMode}
          selectedSoal={selectedSoal}
          setVisibleMenu={setVisibleMenu}
          setShowPopUpListMore={isShow =>
            setShowPopUpListMore(prevState => ({...prevState, isShow}))
          }
        />
      </View>

      <SwipeUp
        isSwipeLine
        visible={showSwipeUpMore}
        onClose={() => setShowSwipeUpMore(false)}
        children={renderSwipeUpMoreContent()}
      />
      <SwipeUp
        isSwipeLine
        visible={showSwipeUpUpload}
        onClose={() => {
          setShowSwipeUpUpload(false);
          handleRemoveData();
        }}
        children={renderSwipeUpUploadContent()}
      />

      <PopUp
        show={showPopUpDeletePackage}
        Icon={IconRobotDelete}
        title="Hapus Paket Soal"
        subtitle={`Apakah Anda yakin untuk menghapus ${title}? Seluruh soal di paket ini akan terhapus.`}
        titleCancel="Hapus"
        actionCancel={() => deletePackageSoal(package_id)}
        titleConfirm="Batal"
        actionConfirm={() => setShowPopUpDeletePackage(false)}
      />

      <PopUp
        show={showPopUpListMore.isShow}
        Icon={IconRobotDelete}
        title={listMode === 'delete' ? 'Hapus Soal' : 'Belum Selesai!'}
        subtitle={
          listMode === 'delete'
            ? `Apakah Anda yakin untuk menghapus ${
                showPopUpListMore.data.length || ''
              } Soal dari ${title} ?`
            : 'Apakah Anda yakin untuk keluar? Perubahan urutan soal belum disimpan.'
        }
        titleCancel={listMode === 'delete' ? 'Hapus' : 'Keluar'}
        actionCancel={actionCancelListMore}
        titleConfirm={listMode === 'delete' ? 'Batal' : 'Lanjutkan'}
        actionConfirm={actionConfirmListMore}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default DetailPaketSoalListScreen;
