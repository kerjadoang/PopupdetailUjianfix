import React, {FC} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
import {Button, MainText, MainView, SwipeUp} from '@components/atoms';
import IcUploadFile from '@assets/svg/ic_upload_blue.svg';
import Colors from '@constants/colors';
import UploadCardComponent from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/atoms/uploadCardComponent';
import {useStudentAnswerLkpd} from './useStudentAnswerLkpd';
import {isStringContains, listFileImageExtension} from '@constants/functional';
import LembarKerjaImageView from '../LembarKerjaImageView';

type Props = {
  fileData: IFileData;
  setFileData: CallBackWithParams<void, IFileData>;
};

const StudentAnswerLkpd: FC<Props> = ({fileData, setFileData}) => {
  const {
    uploadList,
    isShowSwipeUpUpload,
    toggleSwipeUpUpload,
    progressUpload,
    handleRemoveData,
    isError,
  } = useStudentAnswerLkpd(setFileData);

  const _renderSwipeUpUpload = () => {
    return (
      <View style={styles.swipeUpUpload}>
        <Text style={styles.swipeUpUploadHeaderTitle}>{'Unggah'}</Text>
        {uploadList?.map((value, index) => {
          return (
            <Pressable
              key={index}
              onPress={value?.onPress}
              style={styles.swipeUpUploadContent}>
              {value?.icon}
              <Text style={styles.swipeUpUploadLabel}>{value?.label}</Text>
            </Pressable>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {!fileData.file_name ? (
        <Button
          action={toggleSwipeUpUpload}
          label="Unggah Jawaban"
          outline
          iconLeft={<IcUploadFile />}
        />
      ) : isStringContains(
          fileData.type || '',
          undefined,
          listFileImageExtension,
        ) ? (
        <LembarKerjaImageView
          fileData={fileData}
          userRole="MURID"
          hidePreviewButton
          hideReuploadButton={false}
          onReuploadImage={toggleSwipeUpUpload}
          onRemoveImage={handleRemoveData}
          imageViewType="upload"
        />
      ) : (
        <UploadCardComponent
          fileData={fileData}
          handleReUpload={toggleSwipeUpUpload}
          handleRemoveData={handleRemoveData}
          progressUpload={progressUpload}
        />
      )}
      <MainView marginTop={8}>
        <MainText
          fontSize={12}
          color={isError ? Colors.danger.base : Colors.dark.neutral60}>
          Maksimum ukuran file 100 MB.
        </MainText>
        <MainText
          fontSize={12}
          color={isError ? Colors.danger.base : Colors.dark.neutral60}>
          File dapat dalam format .doc/.pdf/.png/.jpeg.
        </MainText>
      </MainView>
      <SwipeUp
        height={100}
        visible={isShowSwipeUpUpload}
        onClose={toggleSwipeUpUpload}
        children={_renderSwipeUpUpload()}
      />
    </View>
  );
};

export default StudentAnswerLkpd;
