import {URL_PATH} from '@constants/url';
import client from '@api/alternate';
import {
  IDetailQuestionFilter,
  ISoalAndAKMSubmitSingleAnswerBody,
  ISoalSubmitAnswerBody,
} from './type';

const provider = {
  getAllSoalUlanganHarianQuestion: (question_package_id: any) =>
    client.get(
      URL_PATH.get_all_soal_ulangan_harian_question(question_package_id),
    ),
  getAllSoalUTSUASUATPackageQuestion: (question_package_id: any) =>
    client.get(
      URL_PATH.get_all_uts_uas_at_package_question(question_package_id),
    ),
  getAllKuisQuestion: (question_package_id: any) =>
    client.get(URL_PATH.get_all_kuis_question(question_package_id)),
  submitSoalAnswer: (body: ISoalSubmitAnswerBody) =>
    client.post(URL_PATH.submit_soal_answer, body),
  startSoalOrAkm: (body: {
    question_package_service_id: number;
    question_package_id: number;
    duration_minutes: number;
  }) => client.post(URL_PATH.start_soal_or_akm(), body),
  getDetailQuestion: (
    package_history_id: any,
    order: any,
    params?: IDetailQuestionFilter,
  ) =>
    client.get(URL_PATH.get_detail_question(package_history_id, order), {
      params,
    }),
  soalAkmAnswerSingle: (bodyPayload: ISoalAndAKMSubmitSingleAnswerBody) =>
    client.put(URL_PATH.soal_akm_answer_single, bodyPayload),
  storeQuestionToReview: (package_history_id: any, question_id: any) =>
    client.get(
      URL_PATH.store_question_to_review(package_history_id, question_id),
    ),
  unstoreQuestionToReview: (package_history_id: any, question_id: any) =>
    client.get(
      URL_PATH.unstore_question_to_review(package_history_id, question_id),
    ),
  getReviewQuestion: (package_history_id: any) =>
    client.get(URL_PATH.get_review_question(package_history_id)),
  finishTest: (package_history_id: any) =>
    client.get(URL_PATH.finish_test(package_history_id)),
  leaveTest: (package_history_id: any) =>
    client.delete(URL_PATH.leave_test(package_history_id)),
  pauseTest: (package_history_id: any) =>
    client.get(URL_PATH.pause_test(package_history_id)),
  resumeTest: (package_history_id: any) =>
    client.get(URL_PATH.resume_test(package_history_id)),
  checkUnfinished: (package_history_id: any) =>
    client.get(URL_PATH.check_unfinished(package_history_id)),
};

export default provider;
