import React, {useLayoutEffect} from 'react';
import {View, ScrollView} from 'react-native';
import styles from './styles';
import useUploadFileIkm from './useUploadFileIkm';
import {Button, Header, InputText, MainText, MainView} from '@components/atoms';
import Colors from '@constants/colors';
import IconUpload from '@assets/svg/ic24_upload.svg';
import UploadCardComponent from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/atoms/uploadCardComponent';
import LembarKerjaImageView from '@features/IKM/shared/pages/LembarKerjaScreen/components/LembarKerjaImageView';

const UploadFileIkmScreen = () => {
  const {
    navigation,
    serviceType,
    defaultValue,
    type,
    data,
    setTitle,
    fileData,
    thumbnailData,
    progressUpload,
    _handlerDocumentSelection,
    onUploadImage,
    handleRemoveData,
    handleRemoveThumbnail,
    submitCreate,
    errorTitleMessage,
    isUploadFileError,
  } = useUploadFileIkm();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={`${type || 'Unggah'} ${serviceType}`} />,
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.cardContainer}>
        <ScrollView style={{flexGrow: 1}}>
          <MainView gap={24}>
            {/* MARK: START Fase */}
            <MainView>
              <MainText
                fontSize={14}
                color={Colors.dark.neutral100}
                paddingBottom={8}>
                Fase
              </MainText>
              <InputText
                onChangeText={() => {}}
                disabled={true}
                value={data?.phase}
                backgroundColor={Colors.dark.neutral20}
              />
            </MainView>
            {/* MARK: END Fase */}

            {/* MARK: START Subject */}
            <MainView>
              <MainText
                fontSize={14}
                color={Colors.dark.neutral100}
                paddingBottom={8}>
                Mata Pelajaran
              </MainText>
              <InputText
                onChangeText={() => {}}
                disabled={true}
                value={data?.name}
                backgroundColor={Colors.dark.neutral20}
              />
            </MainView>
            {/* MARK: END Subject */}

            {/* MARK: START Title */}
            <MainView>
              <MainText
                fontSize={14}
                color={Colors.dark.neutral100}
                paddingBottom={8}>
                Judul {serviceType}
              </MainText>
              <InputText
                onChangeText={text => setTitle(text)}
                defaultValue={defaultValue?.name || ''}
                placeholder="Masukan Judul"
                errorMessage={errorTitleMessage}
                backgroundColor={Colors.dark.neutral20}
              />
            </MainView>
            {/* MARK: END Title */}

            {/* MARK: START Attachment */}
            <MainView>
              <MainText
                fontSize={14}
                color={Colors.dark.neutral100}
                paddingBottom={8}>
                Upload File
              </MainText>
              {!fileData?.file_name ? (
                <Button
                  label="Unggah File"
                  iconLeft={<IconUpload />}
                  background={Colors.primary.light2}
                  color={Colors.primary.base}
                  action={() => {
                    _handlerDocumentSelection();
                  }}
                />
              ) : (
                <UploadCardComponent
                  fileData={fileData}
                  handleReUpload={_handlerDocumentSelection}
                  handleRemoveData={handleRemoveData}
                  progressUpload={progressUpload}
                />
              )}
              <MainText
                fontSize={12}
                color={isUploadFileError ? Colors.danger.base : '#868E96'}
                paddingTop={8}>
                Maksimum ukuran file 100 MB.{'\n'}File dapat dalam format .pdf
              </MainText>
            </MainView>
            {/* MARK: END Attachment */}

            {/* MARK: START Thumbnail */}
            <MainView paddingBottom={16}>
              <MainText
                fontSize={14}
                color={Colors.dark.neutral100}
                paddingBottom={8}>
                Upload Thumbnail (Opsional)
              </MainText>
              {!thumbnailData?.file_name ? (
                <Button
                  label="Unggah Foto"
                  iconLeft={<IconUpload />}
                  background={Colors.primary.light2}
                  color={Colors.primary.base}
                  action={() => {
                    onUploadImage();
                  }}
                />
              ) : (
                <LembarKerjaImageView
                  fileData={thumbnailData}
                  userRole="MURID"
                  onRemoveImage={handleRemoveThumbnail}
                  imageViewType="upload"
                />
              )}
              <MainText fontSize={12} color={'#868E96'} paddingTop={8}>
                Maksimum ukuran file 100 MB.{'\n'}File dapat dalam format .png/
                .jpg/ .jpeg
              </MainText>
            </MainView>
            {/* MARK: END Thumbnail */}
          </MainView>
        </ScrollView>

        <MainView paddingTop={16}>
          <Button label="Simpan" action={submitCreate} />
        </MainView>
      </View>
    </View>
  );
};

export {UploadFileIkmScreen};
