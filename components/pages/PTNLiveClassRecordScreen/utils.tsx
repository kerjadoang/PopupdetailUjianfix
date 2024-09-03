import {apiGet, apiGetSingleImage, apiPut} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {IPTNType, IResponsePTNRecordSession} from './type';

export const putRecordSession = async (recordId: number, mediaId: string) => {
  try {
    const body = {
      media_id: mediaId,
    };
    await apiPut({
      url: URL_PATH.put_record_session_show(recordId),
      body: body,
    });
  } catch (error) {}
};

export const getDetailRecording = async (
  recordId: number,
  serviceType: 'ptn' | 'guru',
) => {
  try {
    const rekamanData = await apiGet<IResponsePTNRecordSession>({
      url: URL_PATH.get_detail_rekaman_sesi_kelas(serviceType, recordId),
    });

    const imgUrl = await apiGetSingleImage({
      imageId: rekamanData.user?.user_type?.icon_mobile || '',
    });

    rekamanData.path_url = (imgUrl as string) || '';
    return rekamanData;
  } catch (error) {}
};

export const PTNType: BaseFilter<IPTNType>[] = [
  {id: 1, name: 'TPS', value: 'TPS'},
  {id: 2, name: 'Saintek', value: 'Saintek'},
  {id: 3, name: 'Soshum', value: 'Soshum'},
];
