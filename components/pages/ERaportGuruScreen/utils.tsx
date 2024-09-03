import {getHeaders} from '@api/utils';
import {apiPost} from '@api/wrapping';
import {downloadFile, kebabCase} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import dayjs from 'dayjs';

export interface IDatePicker {
  date: any;
  month: any;
  year: any;
}

export type SettingName =
  | 'tahun ajaran'
  | 'penilaian raport'
  | 'tanggal terbit'
  | 'kertas';

export interface formSettings {
  name: SettingName;
  data?: string;
  errorMessage?: string;
}

export const initListFormSettings: formSettings[] = [
  {name: 'tahun ajaran', data: '', errorMessage: ''},
  {name: 'penilaian raport', data: '', errorMessage: ''},
  {name: 'tanggal terbit', data: '', errorMessage: ''},
  {name: 'kertas', data: '', errorMessage: ''},
];

export const initDatePicker: IDatePicker = {
  date: dayjs().get('date'),
  month: dayjs().get('month') + 1,
  year: dayjs().get('year'),
};

export const downloadEraport = async (
  studentName = '',
  assessment_erapor_share_id: number,
) => {
  const fullDate = dayjs().format('YYYY-MM-DD_HH-mm-ss');
  const fileName = `e-rapor_${kebabCase(studentName)}_${fullDate}.pdf`;
  const fullPath =
    URL_PATH.get_eraport_download(assessment_erapor_share_id) || '';
  const headers = await getHeaders();

  const reqData: IDownloadDataOption = {
    fileNameWithExt: fileName,
    full_path: fullPath,
    fileExt: 'pdf',
    headers: headers,
  };

  const resData = await downloadFile(reqData);
  return resData;
};

export const shareEraport = async (idHome: number, listUserId: any[]) => {
  const body = {
    id_home: idHome,
    user_id: listUserId,
  };
  const resData = await apiPost({
    url: URL_PATH.post_bagikan_eraport(),
    body: body,
  });
  return resData;
};
