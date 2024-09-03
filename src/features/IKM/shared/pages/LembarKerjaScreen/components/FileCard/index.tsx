import React, {FC} from 'react';
import {IMediaType} from '@api/types';
import {isStringContains, listFileImageExtension} from '@constants/functional';
import LembarKerjaImageView, {
  LembarKerjaImageViewProps,
} from '../LembarKerjaImageView';
import MiniPdf from '@features/IKM/shared/components/MiniPdf';
import UploadCardComponent, {
  UploadCardComponentProps,
} from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/atoms/uploadCardComponent';
import IconUpload from '@assets/svg/ic24_upload.svg';
import {Button} from '@components/atoms';

type Props = {
  file: IMediaType | undefined;
  hidePdfView?: boolean;
  showUploadButton?: boolean;
  onUploadFile?: CallBack<void>;
  uploadBorderColor?: string;
  uploadBackgroundColor?: string;
  uploadTextColor?: string;
  userRole?: UserRole;
} & Partial<UploadCardComponentProps> &
  Omit<Partial<LembarKerjaImageViewProps>, 'hideReUploadButton'>;

const FileCard: FC<Props> = ({
  file,
  hidePdfView = false,
  hideReUploadButton = true,
  showDownloadIcon = true,
  progressUpload = '100%',
  showUploadButton = false,
  onUploadFile,
  hideRemoveIcon = false,
  uploadBackgroundColor,
  uploadBorderColor,
  uploadTextColor,
  userRole = 'MURID',
  handleRemoveData,
  ...props
}) => {
  /* Condition :
  1. return null if content_extention is empty
  2. return ImageView if content_extention is imageList
  3. return Mini Pdf if content_extention is PDF
  4. else return upload card if content_extention is docx
  */

  if (!file && showUploadButton) {
    return (
      <Button
        label="Unggah File"
        action={onUploadFile}
        iconLeft={<IconUpload />}
        color={uploadTextColor}
        borderColor={uploadBorderColor}
        background={uploadBackgroundColor}
      />
    );
  }

  return !file?.content_extention ? null : isStringContains(
      file?.content_extention || '',
      undefined,
      listFileImageExtension,
    ) ? (
    <LembarKerjaImageView
      fileData={file}
      hidePreviewButton
      hideReuploadButton={hideReUploadButton}
      userRole={userRole}
      onReuploadImage={onUploadFile}
      hideRemoveIcon={hideRemoveIcon}
      onRemoveImage={handleRemoveData}
      {...props}
    />
  ) : isStringContains(file?.content_extention || '', 'pdf') && !hidePdfView ? (
    <MiniPdf fileId={file?.ID} showPopupWhenError={false} />
  ) : (
    <UploadCardComponent
      fileData={{
        file_name: file.local_name || file.file_name || '',
        path_url: file.path_url || '',
        type: file.content_extention,
        file_type: file.content_extention as IFileExt,
      }}
      hideReUploadButton={hideReUploadButton}
      progressUpload={progressUpload}
      handleRemoveData={handleRemoveData}
      showDownloadIcon={showDownloadIcon}
      {...props}
    />
  );
};

export default FileCard;
