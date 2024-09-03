/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {ExamDetailDestroy, fetchExamDetail} from '@redux';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';
import {
  dismissLoading,
  downloadFile,
  getTimezoneOffset,
  isText,
  rdxDispatch,
  showErrorToast,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import {getHeaders} from '@api/utils';
const useScreen = (route: any) => {
  const [isCollaps, setIsCollaps] = useState(true);
  const [detail, setDetail] = useState<any>({});
  const [popUp, setPopUp] = useState(false);
  const {examDetail}: any = useSelector((state: RootState) => state);
  const examDetailData: ITeacherExamDetail = examDetail.data?.data;
  useEffect(() => {
    fetchDetail();
    rdxDispatch(fetchExamDetail(route?.params?.id));
    return () => {
      rdxDispatch(ExamDetailDestroy());
    };
  }, []);

  const fetchDetail = async () => {
    try {
      const res = await api.get(
        URL_PATH.get_teacher_exam_history_detail(route?.params?.data?.id),
      );

      if (res?.data?.code === 100) {
        const finish = res?.data?.data?.finish;
        const not_yet = res?.data?.data?.not_yet;
        if (finish) {
          const promises = finish?.map(async (o: any) => {
            if (o?.avatar) {
              const imgRes = await api.get(`/media/v1/image/${o?.avatar}`);
              if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
                o.avatar_path_url = imgRes?.data?.data?.path_url;
                o.avatar_path_id = imgRes?.data?.data?.ID;
              }
            }
          });
          await Promise.all(promises);
        }
        if (not_yet) {
          const promises = not_yet?.map(async (o: any) => {
            if (o?.avatar) {
              const imgRes = await api.get(`/media/v1/image/${o?.avatar}`);
              if (imgRes?.status === 200 && imgRes?.data?.code === 100) {
                o.avatar_path_url = imgRes?.data?.data?.path_url;
                o.avatar_path_id = imgRes?.data?.data?.ID;
              }
            }
          });
          await Promise.all(promises);
        }
        return setDetail(res?.data?.data);
      }
      return setDetail({});
    } catch (err) {
      return;
    }
  };

  const downloadPDF = async () => {
    try {
      setPopUp(false);
      showLoading();

      const fileName = `laporan-ujian-${detail?.schedule?.title}.pdf`;
      const header = await getHeaders();
      const resFile = await downloadFile({
        headers: header,
        fileExt: 'pdf',
        fileNameWithExt: fileName,
        full_path: URL_PATH.get_teacher_ujian_report_download(
          route?.params?.data?.id,
          getTimezoneOffset(),
        ),
      });

      if (resFile?.filePath) {
        showSuccessToast('Laporan ujian berhasil diunduh.');
      }
    } catch (err) {
      showErrorToast(isText(err) ? err : 'Gagal unduh laporan ujian.');
    } finally {
      dismissLoading();
    }
  };

  return {
    isCollaps,
    setIsCollaps,
    detail,
    downloadPDF,
    popUp,
    setPopUp,
    examDetailData,
  };
};
export {useScreen};
