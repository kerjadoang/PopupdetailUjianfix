/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import provider from './provider';
import mediaProvider from '../media/provider';
import {
  IAddToPaketSoalPayload,
  IAnsweredLMSUjianResponse,
  IBankSoalFilterParam,
  ICreatePaketSoalUjianPayload,
  ICreateSoalSendiriPayload,
  IDetailLKSResponse,
  IDetailPRProjectTugasResponse,
  IDetailPaketSoalUjianListResponse,
  IDetailProgressQuestionPRProjectTugasResponse,
  IDetailSoalResponse,
  IDetailUjianResponse,
  IGetLMSStudentExamQuestionStartCheckResponse,
  IGetTeacherClassSessionResponse,
  IHistoryLKSReportResponse,
  IJadwalkanUjianPayload,
  ILKSHistoryListFilter,
  ILKSHistoryListResponse,
  ILKSReportResponse,
  ILKSSummaryReportResponse,
  ILMSTeacherClassSessionFilter,
  ILMSUjianAnswerSingleQuestionPayload,
  ILMSUjianSingleQuestionResponse,
  ILMSUjianStartResponse,
  ILMSUjianSubmitResponse,
  IListBankSoalResponse,
  IListChapterBySubjectResponse,
  IListPaketUjianByChapterResponse,
  IListRombelUserResponse,
  IListScheduledAndNeedToBeCheckFilter,
  IListScheduledAndNeedToBeCheckResponse,
  IListSubjectByCurriculumAndClassResponse,
  IRombelListClassResponse,
  IRombelUserFilterParam,
  ISubmitLMSUjianViolationPayload,
  ISummaryLMSUjianResponse,
  ITeacherClassSubjectResponse,
  TGetAllListHistoryAttendance,
} from './type';
import {AxiosResponse, isAxiosError} from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {CreateNoteBody, IDeleteMyNoteParam} from '@services/lpt/type';
import {
  dismissLoading,
  getTimezoneOffset,
  removeDuplicatesByKey,
  showLoading,
  showSuccessToast,
} from '@constants/functional';
import {apiGet, apiGetBulkImage, apiPost} from '@api/wrapping';
import {URL_PATH} from '@constants/url';

const useServiceGetListHistoryAttendaces = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const getListHistoryAttendace = async (
    params: TGetAllListHistoryAttendance,
  ) => {
    setLoading(true);
    setError(undefined);

    try {
      let res;
      res = await provider.getAllListHistoryAttendance(params);

      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: getListHistoryAttendace,
  };
};

const useDetailPRProjectDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IDetailPRProjectTugasResponse>();

  const getData = async (taskId: any, number: any) => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IDetailPRProjectTugasResponse> =
        await provider.getDetailPRProjectTugas(taskId, number);

      if (res.data.data?.image_id) {
        const imgRes = await mediaProvider.getImage(res.data.data.image_id);
        res.data.data.path_url = imgRes?.data?.path_url;
      }

      setLoading(false);
      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    }
  };

  return {
    isLoading: loading,
    error,
    data,
    refetch: getData,
  };
};

const useDetailUjianQuestion = (school_exam_schedule_id?: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] =
    useState<IGetLMSStudentExamQuestionStartCheckResponse>();

  const getData = async (schoolExamScheduleId: any) => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IGetLMSStudentExamQuestionStartCheckResponse> =
        await provider.getAllLMSStudentExamQuestionStart(schoolExamScheduleId);

      const promises = res?.data?.data?.package?.package_question?.map(
        async (obj: any) => {
          if (obj?.file_id) {
            const imgRes = await mediaProvider.getImage(obj.image_id);
            obj.path_url = imgRes?.data?.path_url;
          }
        },
      );

      if (promises) {
        await Promise.all(promises);
      }

      setLoading(false);
      setData(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (school_exam_schedule_id) {
      getData(school_exam_schedule_id);
    }
  }, [school_exam_schedule_id]);

  return {
    isLoading: loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetClassSession = (params: ILMSTeacherClassSessionFilter) => {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IGetTeacherClassSessionResponse>();
  const [nextPage, setNextPage] = useState<boolean>(true);

  const getData = async () => {
    setError(undefined);

    try {
      showLoading();
      const res: AxiosResponse<IGetTeacherClassSessionResponse> =
        await provider.getallLMSTeacherClassSession(params);
      if (!res.data.data) {
        setNextPage(false);
      }
      if (params.page === 1) {
        setData(res.data);
        setNextPage(true);
      } else {
        setData(prevState => {
          return {
            ...prevState,
            data: [...(prevState?.data || [])!, ...(res?.data?.data || [])!],
          };
        });
      }
    } catch (err: any) {
      setError(err);
    } finally {
      dismissLoading();
    }
  };

  return {
    error,
    data,
    nextPage,
    refetch: getData,
  };
};

const useLMSTeacherGetExamsSchedule = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IListScheduledAndNeedToBeCheckResponse>();
  const [nextPage, setNextPage] = useState<boolean>(true);

  const getData = async (filter?: IListScheduledAndNeedToBeCheckFilter) => {
    setLoading(true);
    setError(undefined);

    try {
      showLoading();
      const res: AxiosResponse<IListScheduledAndNeedToBeCheckResponse> =
        await provider.getLmsTeacherExamsSchedule(filter!);
      if (res.data.data && res.data.data?.length < 1) {
        setNextPage(false);
      }
      if (filter?.page === 1) {
        setData(res.data);
        setNextPage(true);
      } else {
        setData(prevState => ({
          ...prevState,
          data: [...(prevState?.data || []), ...(res.data.data || [])],
        }));
      }
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    } finally {
      dismissLoading();
    }
  };

  return {
    isLoading: loading,
    error,
    data,
    nextPage,
    mutate: getData,
  };
};

const useLMSTeacherGetExamsHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IListScheduledAndNeedToBeCheckResponse>();
  const [nextPage, setNextPage] = useState<boolean>(true);

  const getData = async (filter?: IListScheduledAndNeedToBeCheckFilter) => {
    setLoading(true);
    setError(undefined);

    try {
      showLoading();
      const res: AxiosResponse<IListScheduledAndNeedToBeCheckResponse> =
        await provider.getLmsTeacherExamsHistory(filter);
      if (res.data.data && res.data.data?.length < 1) {
        setNextPage(false);
      }
      if (filter?.page === 1) {
        setData(res.data);
        setNextPage(true);
      } else {
        setData(prevState => ({
          ...prevState,
          data: removeDuplicatesByKey(
            [...(prevState?.data || []), ...(res.data.data || [])],
            'id',
          ),
        }));
      }
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    } finally {
      dismissLoading();
    }
  };

  return {
    isLoading: loading,
    error,
    data,
    nextPage,
    mutate: getData,
  };
};

const useLMSLKSHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<ILKSHistoryListResponse>();
  const [nextPage, setNextPage] = useState<boolean>(true);

  const getData = async (filter?: ILKSHistoryListFilter) => {
    setLoading(true);
    setError(undefined);

    try {
      showLoading();
      const res: AxiosResponse<ILKSHistoryListResponse> =
        await provider.historyLks(filter!);
      if (res.data.data || (res.data.data ?? []).length < 1) {
        setNextPage(false);
      }
      if (filter?.page === 0) {
        setData(res.data);
        setNextPage(true);
      } else {
        if (res.data.data || (res.data.data ?? []).length > 0) {
          setData(prevState => ({
            ...prevState,
            data: [...prevState?.data!, ...res.data.data!],
          }));
        }
      }
      setLoading(false);
      dismissLoading();
    } catch (err: any) {
      setError(err);
      setLoading(false);
      dismissLoading();
    }
  };

  return {
    isLoading: loading,
    error,
    data,
    nextPage,
    mutate: getData,
  };
};

const useGetRombelClassList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IRombelListClassResponse>();

  const getData = async (
    callback?: (res: IRombelListClassResponse) => void,
  ) => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IRombelListClassResponse> =
        await provider.getRombelClassList();

      setData(res.data);
      callback?.(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetTeacherClassSubject = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<ITeacherClassSubjectResponse>();

  const getData = async (classId: any) => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<ITeacherClassSubjectResponse> =
        await provider.getTeacherClassSubject(classId);

      const promises = res?.data?.data?.map(async obj => {
        if (obj?.icon_mobile) {
          const imgRes = await mediaProvider.getImage(obj.icon_mobile);
          obj.path_url = imgRes?.data?.path_url;
        }
      });

      if (promises) {
        await Promise.all(promises);
      }

      setData(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetChaptersBySubject = (subjectId: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IListChapterBySubjectResponse>();

  const getData = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IListChapterBySubjectResponse> =
        await provider.getChaptersBySubject(subjectId);

      res.data.data?.forEach(element => {
        if (!element.id) {
          element.subtitle = 'Akses kumpulan paket soal yang Anda buat di sini';
        }
      });

      setData(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) {
      getData();
    }
  }, [subjectId]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetPaketUjianByChapter = (
  schoolOnly: any,
  subjectId: any,
  classId: string,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IListPaketUjianByChapterResponse>();

  const getData = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IListPaketUjianByChapterResponse> =
        await provider.getListPaketUjianByChapter(
          schoolOnly,
          subjectId,
          classId,
        );

      setData(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (subjectId && classId) {
  //     getData();
  //   }
  // }, [subjectId, classId]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useCreatePaketSoalUjian = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (
    bodyPayload: ICreatePaketSoalUjianPayload,
  ): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.createPaketSoalUjian(bodyPayload);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mutate: setData,
  };
};

const useGetDetailPaketSoalList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IDetailPaketSoalUjianListResponse>();

  const getData = async (package_id: any) => {
    setLoading(true);
    setError(undefined);

    try {
      showLoading();
      const res: AxiosResponse<IDetailPaketSoalUjianListResponse> =
        await provider.getDetailPaketSoalUjianList(package_id);
      setData(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    } finally {
      dismissLoading();
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetDetailSoal = (packageId: any, order: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IDetailSoalResponse>();

  const getData = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IDetailSoalResponse> =
        await provider.getDetailSoal(packageId, order);
      if (res?.data?.data?.question?.file_id) {
        let resImage = await mediaProvider.getImage(
          res?.data?.data?.question?.file_id,
        );
        res.data.data.question.path_url = resImage?.data?.path_url;
      }

      if (res?.data?.data) {
        res.data.data.question.options = await apiGetBulkImage({
          datas: res.data.data.question.options || [],
          dottedString: 'file_id',
          newParams: 'path_url',
        });
      }

      setData(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (packageId && order) {
      getData();
    }
  }, [packageId, order]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};
const useGetDetailSoalNew = (questionId: any) => {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IDetailSoalResponse>();

  const getData = async () => {
    try {
      showLoading();
      setError(undefined);
      const res: AxiosResponse<IDetailSoalResponse> =
        await provider.getDetailSoalNew(questionId);
      // logApi({nameFunction: 'apiget', res: res, tags: 'getDetailSoalNew'});
      if (res?.data?.data?.file_id) {
        let resImage = await mediaProvider.getImage(res?.data?.data?.file_id);
        res.data.data.path_url = resImage?.data?.path_url;
      }

      if (res.data?.data?.options) {
        res.data.data.options = await apiGetBulkImage({
          datas: res.data.data.options || [],
          dottedString: 'file_id',
          newParams: 'path_url',
        });
      }

      setData(res?.data);
    } catch (err: any) {
      setError(err);
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    if (questionId) {
      getData();
    }
  }, [questionId]);

  return {
    error,
    data,
    refetch: getData,
  };
};

const useBatalkanUjian = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (examId: any): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      await provider.batalkanUjian(examId);
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mutate: setData,
  };
};

const useGetBankSoal = (subjectId: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IListBankSoalResponse>();

  const getData = async (params?: IBankSoalFilterParam) => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IListBankSoalResponse> =
        await provider.getBankSoal(subjectId, params);

      setData(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) {
      getData();
    }
  }, []);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useAddSoalToPaketSoalUjian = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (
    packageId: any,
    bodyPayload: IAddToPaketSoalPayload,
  ): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      await provider.addSoalToPaketSoal(packageId, bodyPayload);
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mutate: setData,
  };
};

const useCreateSoalSendiri = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (
    packageId: any,
    bodyPayload: ICreateSoalSendiriPayload,
    isEditMode?: boolean,
  ): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      if (!isEditMode) {
        await provider.createSoalSendiriUjian(packageId, bodyPayload);
      } else {
        await provider.editSoalSendiriUjian(packageId, bodyPayload);
      }
      Toast.show({
        type: 'success',
        text1: 'Soal berhasil disimpan.',
      });
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mutate: setData,
  };
};

const useDeleteSoal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (packageId: any, questionId: any): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      await provider.deleteSoal(packageId, questionId);
      Toast.show({
        type: 'success',
        text1: 'Soal berhasil dihapus.',
      });
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
      });
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mutate: setData,
  };
};

const useGetSubjecByCurriculumAndClass = (
  curriculumId?: any,
  classId?: any,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IListSubjectByCurriculumAndClassResponse>();

  const getData =
    async (): Promise<IListSubjectByCurriculumAndClassResponse> => {
      setLoading(true);
      setError(undefined);

      try {
        const res: AxiosResponse<IListSubjectByCurriculumAndClassResponse> =
          await provider.getDropdownSubjectMatterTeacher(curriculumId, classId);

        setData(res.data);
        return Promise.resolve(res.data);
      } catch (err: any) {
        setError(err);
        setLoading(false);
        return Promise.reject(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (curriculumId && classId) {
      getData();
    }
  }, [curriculumId, classId]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetAllRombelUser = (
  userTypeId: any,
  params?: IRombelUserFilterParam,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IListRombelUserResponse>();

  const getData = async (): Promise<IListRombelUserResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IListRombelUserResponse> =
        await provider.getRombelUser(userTypeId, params);

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userTypeId) {
      getData();
    }
  }, [userTypeId, params]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetDetailJadwalUjian = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IDetailUjianResponse>();

  const getData = async (scheduleId: any): Promise<IDetailUjianResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IDetailUjianResponse> =
        await provider.getDetailJadwalUjian(scheduleId);

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useCreateJadwalUjian = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (
    bodyPayload: IJadwalkanUjianPayload,
  ): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      await provider.createJadwalUjian(bodyPayload);
      Toast.show({
        type: 'success',
        text1: 'Ujian berhasil dijadwalkan.',
      });
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: err?.reponse?.data?.message ?? 'Terjadi Kesalahan',
      });
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mutate: setData,
  };
};

const useUpdateJadwalUjian = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (
    scheduleId: any,
    bodyPayload: IJadwalkanUjianPayload,
  ): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      await provider.updateJadwalUjian(scheduleId, bodyPayload);
      Toast.show({
        type: 'success',
        text1: 'Ujian berhasil disimpan.',
      });
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: err?.reponse?.data?.message ?? 'Terjadi Kesalahan',
      });
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mutate: setData,
  };
};

const useCreateQuestionProjectTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setData = async (
    payload: any,
    task_teacher_id?: number,
  ): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      await provider.createQuestionTask(payload, task_teacher_id);
      Toast.show({
        type: 'success',
        text1: 'Soal berhasil disimpan.',
      });
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    mutate: setData,
  };
};

const useDeleteNote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const deleteNote = async (
    type: 'mynotes' | 'sharednotes',
    param: IDeleteMyNoteParam,
  ) => {
    setLoading(true);
    setError(undefined);

    try {
      let res;
      if (type === 'mynotes') {
        res = await provider.deleteMyNote(param);
      } else {
        res = await provider.deleteMyNote(param);
      }

      setLoading(false);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
      });
      return Promise.reject(err);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: deleteNote,
  };
};

const useCreateNote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const createNote = async (body: CreateNoteBody) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.createNote(body);
      Toast.show({
        type: 'success',
        text1: 'Catatan berhasil ditambahkan.',
      });
      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err);
      Toast.show({
        type: 'error',
        text1: err?.message,
      });
      setLoading(false);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: createNote,
  };
};

const useEditNote = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const editNote = async (body: CreateNoteBody, note_id?: string) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.editNote(body, note_id);
      Toast.show({
        type: 'success',
        text1: 'Catatan berhasil ditambahkan.',
      });
      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err);
      Toast.show({
        type: 'error',
        text1: err?.message,
      });
      setLoading(false);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: editNote,
  };
};

const useGetDetailProgressPRProjectTugas = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] =
    useState<IDetailProgressQuestionPRProjectTugasResponse>();

  const getData = async (
    questionUUID: any,
  ): Promise<IDetailProgressQuestionPRProjectTugasResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IDetailProgressQuestionPRProjectTugasResponse> =
        await provider.getDetailProgressQuestionPRProjectTugas(questionUUID);

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetLKSDetail = (rombelId: any, subjectId: any, chapterId: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IDetailLKSResponse>();

  const getData = async (
    idRombel: any,
    idSubject: any,
    idChapter: any,
  ): Promise<IDetailLKSResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IDetailLKSResponse> =
        await provider.getLKSDetail(idRombel, idSubject, idChapter);

      const promises = res?.data?.data?.student?.map(async obj => {
        if (obj?.avatar) {
          const imgRes = await mediaProvider.getImage(obj.avatar);
          obj.path_url = imgRes?.data?.path_url;
        }
      });

      if (promises) {
        await Promise.all(promises);
      }

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rombelId && subjectId && chapterId) {
      getData(rombelId, subjectId, chapterId);
    }
  }, [rombelId, subjectId, chapterId]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetLKSReport = (userId: any, subjectId: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<ILKSReportResponse>();

  const getData = async (
    idUser: any,
    idSubject: any,
  ): Promise<ILKSReportResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<ILKSReportResponse> = await provider.lksReport(
        idUser,
        idSubject,
      );

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && subjectId) {
      getData(userId, subjectId);
    }
  }, [userId, subjectId]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetLKSHistoryReport = (userId: any, subjectId: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<IHistoryLKSReportResponse>();

  const getData = async (
    idUser: any,
    idSubject: any,
  ): Promise<IHistoryLKSReportResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<IHistoryLKSReportResponse> =
        await provider.lksReportHistory(idUser, idSubject);

      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && subjectId) {
      getData(userId, subjectId);
    }
  }, [userId, subjectId]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useDuplicateTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const duplicateTask = async (list_id: number) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.duplicate_task_teacher(list_id);

      setLoading(false);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: duplicateTask,
  };
};

const useGetLKSSummaryReport = (userId: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<ILKSSummaryReportResponse>();

  const getData = async (idUser: any): Promise<ILKSSummaryReportResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<ILKSSummaryReportResponse> =
        await provider.lksReportSummary(idUser);
      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getData(userId);
    }
  }, [userId]);

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useStartLMSUjian = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<ILMSUjianStartResponse>();

  const getData = async (
    school_exam_schedule_id: any,
  ): Promise<ILMSUjianStartResponse> => {
    setLoading(true);
    setError(undefined);

    try {
      const res: AxiosResponse<ILMSUjianStartResponse> =
        await provider.startLMSUjian(
          school_exam_schedule_id,
          getTimezoneOffset(),
        );
      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1:
          err?.response?.data?.message ?? `${err?.message} Terjadi Kesalahan`,
        visibilityTime: 2000,
      });
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    refetch: getData,
  };
};

const useGetLMSUJianSingleQuestionDetail = (
  question_package_id: any,
  order: any,
  school_exam_schedule_id: any,
) => {
  const [data, setData] = useState<ILMSUjianSingleQuestionResponse>();

  const getData = async (): Promise<ILMSUjianSingleQuestionResponse> => {
    try {
      const res: AxiosResponse<ILMSUjianSingleQuestionResponse> =
        await provider.getLmsUjianDetailQuestion(
          question_package_id,
          order,
          school_exam_schedule_id,
        );
      if (res?.data?.data?.question?.file_id) {
        let resImage = await mediaProvider.getImage(
          res?.data?.data?.question?.file_id,
        );
        res.data.data.question.path_url = resImage?.data?.path_url;
      }

      if (res?.data?.data) {
        if (res.data?.data?.question?.options) {
          res.data.data.question.options = await apiGetBulkImage({
            datas: res.data.data.question.options || [],
            dottedString: 'file_id',
            newParams: 'path_url',
          });
        }
      }
      setData(res.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    if (order && school_exam_schedule_id) {
      getData();
    }
  }, []);

  return {
    data,
    refetch: getData,
  };
};

const useAnswerLMSUjianSingleQuestion = () => {
  const setData = async (
    student_exam_id: any,
    bodyPayload: ILMSUjianAnswerSingleQuestionPayload,
  ): Promise<void> => {
    try {
      const res = await provider.answerLMSUjianSingleQuestion(
        student_exam_id,
        bodyPayload,
      );
      return Promise.resolve(res.data);
    } catch (err: any) {
      if (isAxiosError(err)) {
        Toast.show({
          type: 'error',
          text1: err?.response?.data?.message ?? 'Terjadi Kesalahan',
        });
        return;
      }
      if (isAxiosError(err)) {
        Toast.show({
          type: 'error',
          text1: err?.response?.data?.message ?? 'Terjadi Kesalahan',
        });
        return;
      }
      Toast.show({
        type: 'error',
        text1: err?.reponse?.data?.message ?? 'Terjadi Kesalahan',
      });
      return Promise.reject(err);
    }
  };

  return {
    mutate: setData,
  };
};

const useSubmitLmsUjianWithUUID = () => {
  const hitData = async (
    student_exam_id: string,
    uuid: string,
  ): Promise<ILMSUjianSubmitResponse> => {
    try {
      const res: AxiosResponse<ILMSUjianSubmitResponse> =
        await provider.submitLMSUjianWithUUID(student_exam_id, uuid);
      return Promise.resolve(res.data);
    } catch (err: any) {
      const data = err?.response?.data;
      return Promise.reject(data);
    }
  };

  return {
    mutate: hitData,
  };
};

const useSummaryLMSUjian = () => {
  const getData = async (
    student_exam_id: any,
  ): Promise<ISummaryLMSUjianResponse> => {
    try {
      const res: AxiosResponse<ISummaryLMSUjianResponse> =
        await provider.summaryLMSUjian(student_exam_id);
      return Promise.resolve(res.data);
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err?.reponse?.data?.message ?? 'Terjadi Kesalahan',
      });
      return Promise.reject(err);
    } finally {
    }
  };

  return {
    refeth: getData,
  };
};

const useAnsweredLMSUjian = () => {
  const getData = async (
    student_exam_id: any,
  ): Promise<IAnsweredLMSUjianResponse> => {
    try {
      const res: AxiosResponse<IAnsweredLMSUjianResponse> =
        await provider.answeredLMSUjian(student_exam_id);

      return Promise.resolve(res.data);
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err?.reponse?.data?.message ?? 'Terjadi Kesalahan',
      });
      return Promise.reject(err);
    }
  };

  return {
    refetch: getData,
  };
};

const useSubmitLMSUjianViolation = () => {
  const hitData = async (
    bodyPayload: ISubmitLMSUjianViolationPayload,
  ): Promise<void> => {
    try {
      await provider.submitLMSUjianViolation(bodyPayload);
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err?.reponse?.data?.message ?? 'Terjadi Kesalahan',
      });
      return Promise.reject(err);
    }
  };

  return {
    mutate: hitData,
  };
};

const useRemoveTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const removeTask = async (task_teacher_id: number) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.remove_task_teacher(task_teacher_id);
      setLoading(false);
      Toast.show({type: 'success', text1: res?.data?.message});
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      Toast.show({type: 'error', text1: err?.message});
      return Promise.reject(err);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: removeTask,
  };
};

const useGetTaskHistory = (id: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();

  const getTask = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.get_task_teacher_history(id);
      const userFinish = res?.data?.data?.finish ?? [];
      const userNotYet = res?.data?.data?.not_yet ?? [];
      res.data.data.concat = userFinish?.concat(userNotYet);
      setLoading(false);
      setData(res?.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    if (id) {
      getTask();
    }
  }, [id]);

  return {
    isLoading: loading,
    error,
    data,
    refetch: getTask,
  };
};

const useGetTaskDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();

  const getTaskDetail = async (id: number) => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await provider.getDetailTeacherTask(id);
      setLoading(false);
      setData(res?.data);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    }
  };

  return {
    isLoading: loading,
    error,
    data,
    refetch: getTaskDetail,
  };
};

const useGetSchoolMaterialsDetail = () => {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getSchoolMaterialsDetail = async (id: number) => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await provider.get_detail_school_materials(id);
      setData(res?.data);
      setLoading(false);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    }
  };

  return {
    error,
    data,
    refetch: getSchoolMaterialsDetail,
    loading,
  };
};

const useDeleteMaterial = () => {
  const removeMaterial = async (chapter_material_id: number) => {
    showLoading();
    try {
      await apiPost({
        url: URL_PATH.post_school_material_delete(),
        body: {
          chapter_material_id: [chapter_material_id],
        },
      });
      dismissLoading();
      showSuccessToast('Materi berhasil dihapus.');
    } catch (err: any) {
      dismissLoading();
    }
  };

  return {
    mutate: removeMaterial,
  };
};

const useGetCurriculumActive = (renderOnFunc?: boolean) => {
  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getCurriculumActive = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await provider.get_user_active_curriculum();
      setData(res?.data?.data);
      setLoading(false);
      return Promise.resolve(res.data?.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    if (renderOnFunc) {
      getCurriculumActive();
    }
  }, [renderOnFunc]);

  return {
    error,
    data,
    refetch: getCurriculumActive,
    loading,
  };
};

const useUpdateActiveCurrriculum = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const removeTask = async (curriculumId: number) => {
    setLoading(true);
    setError(undefined);
    try {
      const body = {
        curricullum_id: curriculumId,
      };
      const res = await provider.post_user_active_curriculum(body);
      setLoading(false);
      return Promise.resolve(res.data);
    } catch (err: any) {
      setError(err);
      setLoading(false);
      return Promise.reject(err);
    }
  };

  return {
    isLoading: loading,
    error,
    mutate: removeTask,
  };
};

const useGetAllSubject: CallBackWithParams<
  Promise<IKMSubject[] | undefined>,
  IReqAllSubject
> = async (body: IReqAllSubject) => {
  try {
    const resData = await apiGet<IKMSubject[]>({
      url: URL_PATH.get_all_subject(body),
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  useServiceGetListHistoryAttendaces,
  useDetailPRProjectDetail,
  useGetClassSession,
  useDetailUjianQuestion,
  useLMSTeacherGetExamsSchedule,
  useLMSTeacherGetExamsHistory,
  useGetRombelClassList,
  useGetTeacherClassSubject,
  useGetChaptersBySubject,
  useGetPaketUjianByChapter,
  useCreatePaketSoalUjian,
  useGetDetailPaketSoalList,
  useGetDetailSoal,
  useBatalkanUjian,
  useGetBankSoal,
  useAddSoalToPaketSoalUjian,
  useCreateSoalSendiri,
  useDeleteSoal,
  useGetSubjecByCurriculumAndClass,
  useGetAllRombelUser,
  useCreateJadwalUjian,
  useGetDetailJadwalUjian,
  useUpdateJadwalUjian,
  useCreateQuestionProjectTask,
  useDeleteNote,
  useEditNote,
  useCreateNote,
  useGetDetailProgressPRProjectTugas,
  useLMSLKSHistory,
  useGetLKSDetail,
  useGetLKSReport,
  useGetLKSHistoryReport,
  useGetLKSSummaryReport,
  useStartLMSUjian,
  useGetLMSUJianSingleQuestionDetail,
  useAnswerLMSUjianSingleQuestion,
  useSummaryLMSUjian,
  useDuplicateTask,
  useSubmitLMSUjianViolation,
  useRemoveTask,
  useGetTaskHistory,
  useGetTaskDetail,
  useGetDetailSoalNew,
  useGetSchoolMaterialsDetail,
  useDeleteMaterial,
  useGetCurriculumActive,
  useUpdateActiveCurrriculum,
  useGetAllSubject,
  useSubmitLmsUjianWithUUID,
  useAnsweredLMSUjian,
};
