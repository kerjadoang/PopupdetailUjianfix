import {URL_PATH} from '@constants/url';
import client from '@api/alternate';
import {
  IAnswerPerTryoutQuestionPayload,
  IDiagnoticTestQuestion,
  IStartTryoutPerSubjectPayload,
  ISubmitTryoutPayload,
} from './type';
import {} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import apiWithoutToken from '@api/withoutToken';
const config = {
  timeout: 0,
};
const provider = {
  getDiagnoticTestQuestion: (params: IDiagnoticTestQuestion) =>
    client.get(URL_PATH.get_diagnotic_test_question, {
      params: params,
      ...config,
    }),
  submitDiagnoticTest: (body: any) =>
    client.post(URL_PATH.submit_diagnostic_test, body, config),
  getDiagnoticTestResult: (user_id: any) =>
    client.get(URL_PATH.get_diagnotic_test_result(user_id), config),
  getMajorsUsingProfession: (profession_id: any) =>
    client.get(URL_PATH.get_major_using_profession, {
      params: {profession_id: profession_id},
      ...config,
    }),
  getSaveUniversityRecomendation: (major_id: any, params?: any) =>
    client.get(URL_PATH.get_save_university_recommendation(major_id), {
      params: params,
      ...config,
    }),
  setProfession: (profession_id: any) =>
    client.patch(URL_PATH.set_profession(profession_id), config),
  getUserUniversityMajor: (user_id: any) =>
    client.get(URL_PATH.get_user_university_majors(user_id), config),
  getUserUniversityMajorKp: (user_id: any) =>
    client.get(URL_PATH.get_user_university_majors_kp(user_id), config),
  searchUniversityMajor: (params: any) =>
    client.get(URL_PATH.search_university_major, {params: params, ...config}),
  searchUniversity: (params: any) =>
    client.get(URL_PATH.search_university, {params: params, ...config}),
  getResultUniversityMajorMultipleById: (body: any) =>
    client.post(URL_PATH.get_result_university_major, body, config),
  submitRating: (body: any) =>
    client.post(URL_PATH.rate_diagnotic_test, body, config),
  getRating: () => client.get(URL_PATH.get_rating_diagnotic_test, config),
  setUserPersonalMajor: (body: any) =>
    client.post(URL_PATH.set_user_personal_major, body, config),

  //storage
  getDiagnoticProfession: async () => {
    const value: any = await AsyncStorage?.getItem(Keys.profession);
    return JSON.parse(value);
  },
  setDiagnoticProfession: async (profession: any, callback?: any) => {
    await AsyncStorage.setItem(
      Keys.profession,
      JSON.stringify(profession),
      callback,
    );
  },
  getDiagnoticMajors: async () => {
    const value: any = await AsyncStorage?.getItem(Keys.majors);
    return JSON.parse(value);
  },
  setDiagnoticMajors: async (majors: any) =>
    await AsyncStorage.setItem(Keys.majors, JSON.stringify(majors)),
  resetDiagnotcMajors: async (callback?: any) =>
    await AsyncStorage.setItem(Keys.majors, JSON.stringify([]), callback),

  // tryout
  startTryOutPerSubject: (bodyPayload: IStartTryoutPerSubjectPayload) =>
    client.post(URL_PATH.start_try_out_per_subject, bodyPayload),
  tryoutPerQuestion: (tryoutHistoryId: any, subjectId: any, order: any) =>
    client.get(URL_PATH.tryout_per_question(tryoutHistoryId, subjectId, order)),
  answerPerTryoutQuestion: (bodyPayload: IAnswerPerTryoutQuestionPayload) =>
    client.put(URL_PATH.answer_per_tryout_question, bodyPayload),
  submitTryout: (bodyPayload: ISubmitTryoutPayload) =>
    client.post(URL_PATH.submit_tryout, bodyPayload),
  getListSubject: () => client.get(URL_PATH.get_bank_soal_list_subject),
  getListQuestion: (subject_id: number) =>
    URL_PATH.get_bank_soal_list_question(subject_id),
  getQuestionExplanation: (question_id: number, question_option_id: number) =>
    URL_PATH.get_bank_soal_question_explanation(
      question_id,
      question_option_id,
    ),
  postStartPractice: (subject_id: number) =>
    URL_PATH.post_bank_soal_start_practice(subject_id),
  postSubmitPractice: () => URL_PATH.post_bank_soal_submit_practice,
  getReportListTryOut: (user: any) =>
    !user?.access_token
      ? client.get(URL_PATH.get_report_list_tryout)
      : apiWithoutToken.get(URL_PATH.get_report_list_tryout, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }),
  getListModule: (user: any) =>
    !user?.access_token
      ? client.get(URL_PATH.get_list_module)
      : apiWithoutToken.get(URL_PATH.get_list_module, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }),

  getListSubjectProgress: (id: any) =>
    client.get(URL_PATH.get_list_subject_progress(id)),
  getReportPassingGrade: ({tryoutId, type}: any, user: any) =>
    !user?.access_token
      ? client.get(URL_PATH.get_report_passing_grade({tryoutId, type}))
      : apiWithoutToken.get(
          URL_PATH.get_report_passing_grade({tryoutId, type}),
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          },
        ),
  getReportGraphTryOut: (user: any) =>
    !user?.access_token
      ? client.get(URL_PATH.get_report_graph_tryout)
      : apiWithoutToken.get(URL_PATH.get_report_graph_tryout, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }),
  getSubjectReportGraphTryout: (module: any, user: any) =>
    !user?.access_token
      ? client.get(URL_PATH.get_subject_report_graph_tryout(module))
      : apiWithoutToken.get(URL_PATH.get_subject_report_graph_tryout(module), {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }),
  getReportSummaryPoint: ({tryoutId, module}: any, user: any) =>
    !user?.access_token
      ? client.get(URL_PATH.get_report_summary_point({tryoutId, module}))
      : apiWithoutToken.get(
          URL_PATH.get_report_summary_point({tryoutId, module}),
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          },
        ),
  getHistoryDiscussion: (
    practiceUserHistoryId: number,
    subject_id: number,
    status: string,
  ) =>
    URL_PATH.get_bank_soal_history_discussion(
      practiceUserHistoryId,
      subject_id,
      status,
    ),
};

export default provider;
