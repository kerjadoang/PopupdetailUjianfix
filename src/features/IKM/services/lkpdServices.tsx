import {apiDelete, apiGet, apiPost, apiPut} from '@api/wrapping';
import {URL_PATH} from '@constants/url';

export const getScheduleLKPD: CallBackWithParams<
  Promise<IResScheduleLKPD | undefined>,
  IReqScheduleLKPD
> = async (body: IReqScheduleLKPD) => {
  try {
    const resData = await apiPost<IResScheduleLKPD>({
      url:
        body.userRole === 'GURU'
          ? URL_PATH.post_teacher_lkpd_schedule
          : URL_PATH.post_task_schedule,
      body,
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getHistoryLKPD: CallBackWithParams<
  Promise<IResHistoryLKPD | undefined>,
  IReqHistoryLKPD
> = async (body: IReqHistoryLKPD) => {
  try {
    const resData = await apiPost<IResHistoryLKPD>({
      url:
        body.userRole === 'GURU'
          ? URL_PATH.get_teacher_task_history
          : URL_PATH.post_task_history,
      body,
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCheckedLKPD: CallBackWithParams<
  Promise<IResCheckedLKPD | undefined>,
  IReqCheckedLKPD
> = async (body: IReqCheckedLKPD) => {
  try {
    const resData = await apiPost<IResCheckedLKPD>({
      url: URL_PATH.post_teacher_lkpd_checked,
      body,
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const studentStartLKPDTask: CallBackWithParams<
  Promise<IResCheckedLKPD | undefined>,
  Pick<IStudentFinishLKPD, 'task_id'>
> = async (body: Pick<IStudentFinishLKPD, 'task_id'>) => {
  try {
    const resData = await apiGet<IResCheckedLKPD>({
      url: URL_PATH.start_pr_projek_tugas(body.task_id),
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const studentFinishLKPDTask: CallBackWithParams<
  Promise<IStudentFinishLKPD | undefined>,
  IStudentFinishLKPD
> = async (body: IStudentFinishLKPD) => {
  try {
    const resData = await apiPost<IStudentFinishLKPD>({
      url: URL_PATH.post_finish_lkpd,
      body,
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const teacherFinishCheckedLKPDTask: CallBackWithParams<
  Promise<boolean | undefined>,
  ITeacherFinishCheckedLKPD
> = async (body: ITeacherFinishCheckedLKPD) => {
  try {
    const resData = await apiPut<boolean>({
      url: URL_PATH.submit_finish_checked_task,
      body,
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDetailLKPD: CallBackWithParams<
  Promise<ILKPDTask | undefined>,
  IReqGetDetailLKPD
> = async params => {
  try {
    const resData = await apiGet<ILKPDTask>({
      url:
        params.user_role === 'GURU'
          ? URL_PATH.get_teacher_lkpd_history_show_detail(
              params.task_id,
              params.task_student_id || 0,
            )
          : URL_PATH.get_task_detail(params.task_id),
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getChapterById: CallBackWithParams<
  Promise<Chapter[] | undefined>,
  IReqChapterById
> = async params => {
  try {
    const resData = await apiGet<Chapter[]>({
      url: URL_PATH.get_dropdown_task_chapter_teacher(params.subject_id),
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMapelById: CallBackWithParams<
  Promise<Subject[] | undefined>,
  IReqMapelById
> = async params => {
  try {
    const resData = await apiGet<Subject[]>({
      url: URL_PATH.get_mapel_by_class(params.class_id),
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getWorksheetMaster: CallBackWithParams<
  Promise<IWorksheet[] | undefined>,
  IReqWorksheetMaster
> = async params => {
  try {
    const resData = await apiGet<IWorksheet[]>({
      url: URL_PATH.get_worksheet_master(params.is_active, params.pagination),
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getAllRombelIKM: CallBackWithParams<
  Promise<IKMRombel[] | undefined>,
  IReqAllRombelIKM
> = async () => {
  try {
    const resData = await apiGet<IKMRombel[]>({
      url: URL_PATH.get_all_rombel_ikm(),
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const teacherCreateLembarKerja: CallBackWithParams<
  Promise<IReqCreateLembarKerja | undefined>,
  IReqCreateLembarKerja
> = async params => {
  try {
    const resData = await apiPost<IReqCreateLembarKerja>({
      url: URL_PATH.post_teacher_task,
      body: params,
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const teacherEditLembarKerja: CallBackWithParams<
  Promise<IReqCreateLembarKerja | undefined>,
  IReqEditLembarKerja
> = async params => {
  try {
    const resData = await apiPut<IReqCreateLembarKerja>({
      url: URL_PATH.put_teacher_task(params.task_id),
      body: params.body,
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const teacherDeleteLembarKerja: CallBackWithParams<
  Promise<IReqCreateLembarKerja | undefined>,
  IReqDeleteLembarKerja
> = async params => {
  try {
    const resData = await apiDelete<IReqCreateLembarKerja>({
      url: URL_PATH.put_teacher_task(params.task_id),
    });
    return Promise.resolve(resData);
  } catch (error) {
    return Promise.reject(error);
  }
};
