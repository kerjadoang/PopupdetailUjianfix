import {URL_PATH} from '@constants/url';
import client from '@api/alternate';
import {
  CreateNoteBody,
  IAKMEssayBody,
  IAKMMCQBody,
  IDeleteMyNoteParam,
  ISubmitQuestionSinglePayload,
  ITestEssayBody,
  ITestMCQBody,
  PracticeTypeProgressBody,
} from './type';

const provider = {
  createNote: (body: CreateNoteBody, isPancasila?: boolean) =>
    isPancasila
      ? client.post(URL_PATH.create_note_pancasila, body)
      : client.post(URL_PATH.create_note, body),
  editNote: (body: CreateNoteBody, note_id?: string, isPancasila?: boolean) =>
    isPancasila
      ? client.put(URL_PATH.edit_note_pancasila(note_id), body)
      : client.put(URL_PATH.edit_note(note_id), body),
  deleteMyNote: (params: IDeleteMyNoteParam, isPancasila?: boolean) =>
    isPancasila
      ? client.delete(URL_PATH.delete_my_note_pancasila(params.note_id))
      : client.delete(URL_PATH.delete_my_note(params.note_id)),
  deleteSharedNote: (params: IDeleteMyNoteParam) =>
    client.delete(URL_PATH.delete_shared_note(params.note_id)),
  getAllPracticeChapterQuestion: (
    chapter_id: string,
    question_service_type_id: any,
  ) =>
    client.get(
      URL_PATH.get_all_practice_chapter_question(
        chapter_id,
        question_service_type_id,
      ),
    ),
  practiceTypeProgress: (body: PracticeTypeProgressBody) =>
    client.post(URL_PATH.practice_type_progress, {
      ...body,
      is_done: true,
    }),
  getAllTestTypeQuestion: (
    chapter_id: string,
    question_service_type_id: any,
    level_id: any,
  ) =>
    client.get(
      URL_PATH.get_all_test_type_question(
        chapter_id,
        question_service_type_id,
        level_id,
      ),
    ),
  getAllTestTypeQuestionEssay: (
    chapter_id: string,
    question_service_type_id: any,
  ) =>
    client.get(
      URL_PATH.get_all_test_type_question_essay(
        chapter_id,
        question_service_type_id,
      ),
    ),
  getAllPackageQuestionAkm: (question_package_id: any) =>
    client.get(URL_PATH.get_all_package_question_akm(question_package_id)),
  submitTestMCQAnswer: (body: ITestMCQBody) =>
    client.post(URL_PATH.submit_test_mcq_answer, body),
  submitAKMMCQAnswer: (body: IAKMMCQBody) =>
    client.post(URL_PATH.submit_akm_mcq_answer, body),
  submitTestEssayAnswer: (body: ITestEssayBody) =>
    client.post(URL_PATH.submit_test_essay_answer, body),
  submitSingleTestEssayAnswer: (body: ITestEssayBody) =>
    client.post(URL_PATH.submit_single_test_essay_answer, body),
  submitAKMEssayAnswer: (body: IAKMEssayBody) =>
    client.post(URL_PATH.submit_akm_essay_answer, body),
  submitSingleQuestionTest: (bodyPayload: ISubmitQuestionSinglePayload) =>
    client.post(URL_PATH.submit_single_question_test, bodyPayload),
  submitQuestionAnswerTest: (bodyPayload: ISubmitQuestionSinglePayload) =>
    client.post(URL_PATH.submit_question_answer_test, bodyPayload),
  createUserLearnProgress: ({
    userId,
    bodyPayload,
  }: {
    userId: any;
    bodyPayload: {
      chapter_material_id: number;
      is_done: boolean;
    };
  }) => client.post(URL_PATH.create_user_learn_progress(userId), bodyPayload),
};

export default provider;
