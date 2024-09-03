import {Button} from '@components/atoms';
import Colors from '@constants/colors';
import React from 'react';
import {Text, View} from 'react-native';
import DownloadIcon from '@assets/svg/downloadBlue.svg';
import UploadIcon from '@assets/svg/ic24_uploadWhite.svg';
import UploadCardComponent from '../../atoms/uploadCardComponent';
import {styles} from '../../style';

const UnggahFilePresensi = ({
  handleDownload,
  handleSubmit,
  handleUpload,
  handleRemoveData,
  fileData,
  handleReUpload,
  progressUpload,
}: {
  handleDownload: any;
  handleUpload: any;
  handleSubmit: any;
  handleRemoveData: any;
  handleReUpload: any;
  fileData: {path_url: string; type: string; file_name: string};
  progressUpload?: string;
}) => {
  return (
    <View style={styles.UFPContainer}>
      <View style={styles.w100}>
        <Text allowFontScaling={false} style={styles.UFPTitle}>
          Unggah File Presensi
        </Text>
        <Text allowFontScaling={false} style={styles.UFPSubTitle}>
          Belum memiliki format presensi?
        </Text>
        <Button
          label="Unduh Format Presensi"
          action={handleDownload}
          iconLeft={<DownloadIcon />}
          background={Colors.primary.light3}
          color={Colors.primary.base}
        />
        <Text allowFontScaling={false} style={styles.UFpSubTitle2}>
          Unggah presensi Murid menggunakan file{'\n'}yang telah diunduh.
        </Text>
        {fileData?.path_url === '' && (
          <View>
            <Button
              label="Unggah Presensi"
              action={handleUpload}
              iconLeft={<UploadIcon />}
              background={Colors.primary.base}
              color={Colors.white}
            />
          </View>
        )}
        {fileData?.path_url !== '' && (
          <UploadCardComponent
            fileData={fileData}
            handleRemoveData={handleRemoveData}
            handleReUpload={handleReUpload}
            progressUpload={progressUpload}
          />
        )}
        <View style={styles.mt30}>
          <Button
            label="Simpan"
            isDisabled={fileData?.path_url === '' || progressUpload !== '100%'}
            action={handleSubmit}
            background={Colors.primary.base}
            color={Colors.white}
          />
        </View>
      </View>
    </View>
  );
};

export default UnggahFilePresensi;
