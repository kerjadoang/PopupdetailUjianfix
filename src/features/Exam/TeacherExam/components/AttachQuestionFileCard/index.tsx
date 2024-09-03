import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Button, PoppinsText} from '@components/atoms';
import IcGallery from '@assets/svg/ic_gallery.svg';
import {UploadFileWrapperCard} from '../UploadFileWrapperCard';

type Props = {};

const AttachQuestionFileCard = ({}: Props) => {
  return (
    <UploadFileWrapperCard>
      <IcGallery />
      <View style={styles.titleContainer}>
        <PoppinsText type="BoldPoppins" style={styles.title}>
          Lampirkan File Soal
        </PoppinsText>
        <PoppinsText type="RegularPoppins" style={styles.formatFile}>
          Format file : mirosoft word atau .docx
        </PoppinsText>
      </View>
      <Button
        action={() => {}}
        label="Lampirkan file"
        outline
        style={styles.button}
      />
    </UploadFileWrapperCard>
  );
};

export {AttachQuestionFileCard};
