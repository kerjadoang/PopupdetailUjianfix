import client from '@api/alternate';
import {URL_PATH} from '@constants/url';

const provider = {
  getAllRombel: () => client.get(URL_PATH.get_rombel_user),
  getAllSubject: () => client.get(URL_PATH.get_list_subject),
  getAllServices: () => client.get(URL_PATH.get_all_services),
  getQuestionType: () => client.get(URL_PATH.get_question_type),
  getQuestionLevel: () => client.get(URL_PATH.get_question_level),
  getAllCurriculumTeacher: () =>
    client.get(URL_PATH.get_all_curriculum_teacher),
  getChapterListBySubject: (subjectId: any) =>
    client.get(URL_PATH.get_chapter_list_by_subject(subjectId)),
  getChapterListBySubject2: (subjectId: any) =>
    client.get(URL_PATH.get_chapter_list_by_subject2(subjectId)),
  getSubjectByClass: (classId: any, params?: IBasePaginationFilter) =>
    client.get(URL_PATH.get_mapel_by_class(classId), {
      params,
    }),
  getAllRombelClassSchool: (school_id: number) =>
    client.get(URL_PATH.get_rombel_class_school(school_id)),
  getAllSubjectByClass: (params: any) =>
    client.get(URL_PATH.get_list_subject, {params: params}),
};

export default provider;
