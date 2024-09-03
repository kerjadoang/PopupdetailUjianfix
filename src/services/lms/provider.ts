import {URL_PATH} from '@constants/url';
import client from '@api/alternate';
import {
  IAddToPaketSoalPayload,
  IBankSoalFilterParam,
  ICreatePaketSoalUjianPayload,
  ICreateSoalSendiriPayload,
  IJadwalkanUjianPayload,
  ILMSTeacherClassSessionFilter,
  IListScheduledAndNeedToBeCheckFilter,
  IRombelUserFilterParam,
  IStorePRProjectTugasBody,
  ITeacherCancelMeetingBody,
  ITeacherFinishMeetingBody,
  IStoreUjianBody,
  TGetAllListHistoryAttendance,
  TGetAttendanceHistory,
  TGetDiscussionGroupMessageSearch,
  TPostCreateClassSession,
  TPostDisccusionAddMember,
  TPostDisccusionCreateGroup,
  TPostDiscusssionGroupMessage,
  TPostMeetingLiveSessionMessage,
  TPostRequestAbsent,
  TPutChangeGroupAvatar,
  TPutChangeGroupName,
  IAnswerSingleQuestionPRProjectTugasPayload,
  IAnswerSubmitTaskPRProjectTugasPayload,
  ILKSHistoryListFilter,
  TPostSubmitPaymentEvidence,
  ILMSUjianAnswerSingleQuestionPayload,
  ISubmitLMSUjianViolationPayload,
} from './type';
import {IStartMeetingBody} from 'src/redux/lms/startMeeting/type';
import {CreateNoteBody, IDeleteMyNoteParam} from '@services/lpt/type';

const provider = {
  class_session_rate: (_reqBody: {
    class_session_id: any;
    student_rating: {
      user_id: any;
      rating: number;
    }[];
  }) => {
    client.put(URL_PATH.class_session_rate(), _reqBody);
  },
  getAttendanceReport: (_reqBody: {
    rombel_class_school_id: any;
    semester: string;
    type: string;
  }) => {
    client.post(URL_PATH.download_attendance_report(), _reqBody);
  },
  changeStudentOfflineAttendance: (reqBody: {
    attendance_id: any;
    status: string;
  }) => client.put(URL_PATH.change_student_offline_attendance, reqBody),
  deleteStudentOfflineAttendance: (attendance_id: any) => {
    client.delete(URL_PATH.delete_student_offline_attendance(attendance_id));
  },
  getListSavedVideo: (device_id: any) =>
    client.get(URL_PATH.get_list_saved_video(device_id)),
  getDownloadAttendanceFormat: (rombel_class_school_id: any) =>
    client.get(URL_PATH.get_download_attendance_format(rombel_class_school_id)),
  getReport: (user_id: any) => client.get(URL_PATH.get_report(user_id)),
  getDetailMurid: (userId: number) =>
    client.get(URL_PATH.get_detail_murid(userId)),
  getReportCheckDownload: ({
    murid_id,
    rombel_class_school_id,
    academic_year_id,
    academic_phase_id,
    school_id,
  }: {
    murid_id: number;
    rombel_class_school_id: number;
    academic_year_id: number;
    academic_phase_id: number;
    school_id: number;
  }) =>
    client.get(
      URL_PATH.get_report_check_download({
        murid_id,
        rombel_class_school_id,
        academic_year_id,
        academic_phase_id,
        school_id,
      }),
    ),
  generateERaporMurid: (id_rapor: number) =>
    client.get(URL_PATH.generate_erapor_murid(id_rapor)),
  putAcceptDeclineAdministration: (id: number, body: any) =>
    client.put(URL_PATH.put_accept_decline_administration(id), body),
  getListAllClassAdmin: () => client.get(URL_PATH.get_all_list_class_admin),
  getClassRombelDetailAdmin: (
    user_id: number,
    status: string,
    limit: number,
    page: number,
  ) =>
    client.get(URL_PATH.get_class_rombel_detail(user_id, status, limit, page)),
  getListHistoryAdmin: (
    rombel_class_id: number,
    user_type_id: any,
    search: any,
    limit: number,
    page: number,
  ) =>
    client.get(
      URL_PATH.get_list_history_admin(
        rombel_class_id,
        user_type_id,
        search,
        limit,
        page,
      ),
    ),
  getListClassRombel: (class_id: number) =>
    client.get(URL_PATH.get_list_class_rombel(class_id)),
  getListClassRombelDetail: (rombel_class_school_id: number) =>
    client.get(URL_PATH.get_list_class_rombel_detail(rombel_class_school_id)),
  getEvidenceDetail: (evidence_id: number) =>
    client.get(URL_PATH.get_evidence_detail(evidence_id)),

  getListRegistrationNumber: (search: any) =>
    client.get(URL_PATH.get_list_registration_number(search)),
  getListPaymentMethod: () => client.get(URL_PATH.get_list_payment_method),
  getListSchoolBankAccout: () =>
    client.get(URL_PATH.get_list_school_bank_account),
  getListPaymentCategory: () => client.get(URL_PATH.get_list_payment_category),
  postSubmitPaymentEvidence: (body: TPostSubmitPaymentEvidence) =>
    client.post(URL_PATH.post_submit_payment_evidence, body),

  getAllListHistoryAttendance: (
    offset: number,
    limit: number,
    body: TGetAllListHistoryAttendance,
  ) => client.post(URL_PATH.get_absent_history(offset, limit), body),
  getDetailHistoryAttendance: (absence_id: any) =>
    client.get(URL_PATH.absent_history_detail(absence_id)),
  getAttendanceHistory: (body: TGetAttendanceHistory) =>
    client.post(URL_PATH.get_attendance_history, body),
  postTeacherTask: (body: any) => client.post(URL_PATH.post_teacher_task, body),
  putTeacherTask: (body: any, taskTeacherId?: number) =>
    client.put(URL_PATH.put_teacher_task(taskTeacherId), body),
  getDetailTeacherTask: (taskTeacherId: number) =>
    client.get(URL_PATH.get_teacher_task_history_show_detail(taskTeacherId)),
  getDropdownCurriculumTeacher: () =>
    client.get(URL_PATH.get_dropdown_curriculum_teacher),
  getDropdownClassTeacher: () => client.get(URL_PATH.get_rombel_user),
  getDropdownClassAdmin: (teacherId: number) =>
    client.get(URL_PATH.get_rombel_user_admin(teacherId)),
  getDropdownTaskTypeTeacher: () =>
    client.get(URL_PATH.get_dropdown_task_type_teacher),
  getDropdownTaskChapterTeacher: (subject_id: number) =>
    client.get(URL_PATH.get_dropdown_task_chapter_teacher(subject_id)),
  getDropdownSubjectMatterTeacher: (curriculum_id: any, class_id: any) =>
    client.get(
      URL_PATH.get_dropdown_subject_matter_teacher(curriculum_id, class_id),
    ),
  getLmsTeacherExamsSchedule: (filter?: IListScheduledAndNeedToBeCheckFilter) =>
    client.post(URL_PATH.get_lms_teacher_exams_schedule, filter),
  getLmsTeacherExamsHistory: (filter?: IListScheduledAndNeedToBeCheckFilter) =>
    client.post(
      URL_PATH.get_teacher_exam_history_v2(filter?.from, filter?.to),
      filter,
    ),
  getAllTeacherTaskQuestion: () =>
    client.get(URL_PATH.get_all_teacher_task_question),
  getTeacherTaskQuestion: (_id: any, number: number) =>
    client.get(URL_PATH.get_teacher_task_question(_id, number)),
  getAllTeacherCheckTaskQUestion: (id: number) =>
    client.get(URL_PATH.get_all_teacher_check_task(id)),
  getTeacherCheckTaskQuestion: (
    task_student_id: number,
    _id: number,
    number: number,
  ) =>
    client.get(URL_PATH.get_teacher_check_task(task_student_id, _id, number)),
  submitValueTaskQuestion: (
    task_student_id: number,
    _id: number,
    number: number,
    body: any,
  ) =>
    client.put(
      URL_PATH.get_teacher_check_task(task_student_id, _id, number),
      body,
    ),
  submitFinishCheckedTask: (body: any) =>
    client.put(URL_PATH.submit_finish_checked_task, body),
  narrateTask: (id_task: number) => client.get(URL_PATH.narrate_task(id_task)),
  getCheckFinishTaskQUestion: (id: number) =>
    client.get(URL_PATH.get_finish_check_task(id)),

  getMeetingLiveSessionMessage: (
    academiClassSessionId: number,
    limit: number,
    offset: number,
  ) =>
    client.get(
      URL_PATH.get_meeting_live_session_message(
        academiClassSessionId,
        limit,
        offset,
      ),
    ),
  getMeetingLiveSessionRealtimeMessage: (academiClassSessionId: number) =>
    client.get(
      URL_PATH.get_meeting_live_session_realtime_message(academiClassSessionId),
    ),
  postMeetingLiveSessionMessage: (
    serviceType: string,
    body: TPostMeetingLiveSessionMessage,
  ) =>
    client.post(URL_PATH.post_meeting_live_session_message(serviceType), body),

  getDiscusssionDetailInformation: (user_id: any) =>
    client.get(URL_PATH.get_detail_member_info(user_id)),
  getDiscusssionGroupUnreads: () =>
    client.get(URL_PATH.get_discussion_group_unreads),
  getDiscusssionGroupInformation: () =>
    client.get(URL_PATH.get_discussion_group_information),
  getDiscusssionGroupMessage: (limit: number) =>
    client.get(URL_PATH.get_discussion_group_message(limit)),
  getDiscusssionGroupNextPreviousPage: (
    limit: number,
    type: string,
    created_at: any,
  ) =>
    client.get(
      URL_PATH.get_discussion_group_next_previous_page(limit, type, created_at),
    ),

  getCheckUnfinishedQuestionEssay: (package_history_id: number) =>
    client.get(
      URL_PATH.get_check_unfinished_question_essay(package_history_id),
    ),
  getNavigateQuestionEssay: (package_history_id: number, order: number) =>
    client.get(URL_PATH.get_navigate_question_essay(package_history_id, order)),
  putSubmitAnswerQuestionEssay: (body: any) =>
    client.put(URL_PATH.put_submit_answer_question, body),
  getFinishQuestionEssay: (package_history_id: number) =>
    client.get(URL_PATH.get_finish_question_essay(package_history_id)),
  getPauseQuestionEssay: (package_history_id: number) =>
    client.get(URL_PATH.get_pause_question_essay(package_history_id)),
  getResumeQuestionEssay: (package_history_id: number) =>
    client.get(URL_PATH.get_resume_question_essay(package_history_id)),
  getTagQuestionEssay: (package_history_id: number, question_id: number) =>
    client.get(
      URL_PATH.get_tag_question_essay(package_history_id, question_id),
    ),
  getUntagQuestionEssay: (package_history_id: number, question_id: number) =>
    client.get(
      URL_PATH.get_untag_question_essay(package_history_id, question_id),
    ),
  getReviewQuestionEssay: (package_history_id: number) =>
    client.get(URL_PATH.get_review_question_essay(package_history_id)),
  deleteLeaveQuestionEssay: (package_history_id: number) =>
    client.delete(URL_PATH.delete_leave_question_essay(package_history_id)),

  postDiscusssionGroupNextPreviousSearch: (
    limit: number,
    number: number,
    body: any,
  ) =>
    client.post(
      URL_PATH.post_discussion_group_next_previous_search(limit, number),
      body,
    ),
  postDiscusssionGroupMessageSearch: (
    limit: number,
    body: TGetDiscussionGroupMessageSearch,
  ) => client.post(URL_PATH.post_discussion_group_message_search(limit), body),
  getDiscusssionGroupRealtimeMessage: () =>
    client.get(URL_PATH.get_discussion_group_realtime_message),
  getDiscusssionPotensialGroupMember: () =>
    client.get(URL_PATH.get_discussion_potensial_group_member),
  getDiscusssionGroupInformationByKeyword: (keyword: any) =>
    client.get(URL_PATH.get_discussion_group_information_by_keyword(keyword)),
  getDiscusssionPotensialGroupMemberByKeyword: (keyword: any) =>
    client.get(
      URL_PATH.get_discussion_potensial_group_member_by_keyword(keyword),
    ),
  postDiscusssionGroupMessage: (body: TPostDiscusssionGroupMessage) =>
    client.post(URL_PATH.post_discussion_group_message, body),
  putSetOnline: () => client.put(URL_PATH.put_set_online),
  putSetOffline: () => client.put(URL_PATH.put_set_offline),
  putDeleteAvatarGroup: () => client.put(URL_PATH.put_delete_avatar_group),
  putChangeAvatarGroup: (body: TPutChangeGroupAvatar) =>
    client.put(URL_PATH.put_change_avatar_group, body),
  postDiscussionAddMember: (body: TPostDisccusionAddMember) =>
    client.post(URL_PATH.post_discussion_add_member, body),
  postDiscussionCreateGroup: (body: TPostDisccusionCreateGroup) =>
    client.post(URL_PATH.post_discussion_create_group, body),
  putChangeGroupName: (body: TPutChangeGroupName) =>
    client.put(URL_PATH.put_change_group_name, body),
  putSetAdmin: (user_id: any) => client.put(URL_PATH.put_set_admin(user_id)),
  putUnsetAdmin: (user_id: any) =>
    client.put(URL_PATH.put_unset_admin(user_id)),
  putDeleteMember: (user_id: any) =>
    client.delete(URL_PATH.put_delete_member(user_id)),
  deleteLeaveGroup: () => client.delete(URL_PATH.delete_leave_group),
  getUnreadsGroupMessage: () => client.get(URL_PATH.get_unreads_group_message),

  getDetailSessionClass: (classSessionId: any) =>
    client.get(URL_PATH.get_detail_session_class(classSessionId)),
  postCreateClassSession: (body: TPostCreateClassSession) =>
    client.post(URL_PATH.post_create_class_session, body),
  putUpdateClassSession: (body: TPostCreateClassSession, classSessionId: any) =>
    client.put(URL_PATH.put_create_class_session(classSessionId), body),
  postRequestAbsent: (body: TPostRequestAbsent) =>
    client.post(URL_PATH.post_request_absent, body),
  postStartAttendance: () => client.post(URL_PATH.post_start_attendance),
  putFinishAttendance: () => client.put(URL_PATH.put_finish_attendance),
  getDetailPRProjectTugas: (task_id: any, number: any) =>
    client.get(URL_PATH.get_detail_pr_project_tugas(task_id, number)),
  answerPRProjectTugas: (body: IStorePRProjectTugasBody) =>
    client.post(URL_PATH.answer_pr_project_tugas, body),
  answerLMSStudentExam: (student_exam_id: any, body: IStoreUjianBody) =>
    client.post(URL_PATH.answer_lms_student_exam(student_exam_id), body),
  getallLMSTeacherClassSession: (params: ILMSTeacherClassSessionFilter) =>
    client.get(URL_PATH.get_all_lms_teacher_class_session, {
      params,
    }),
  startMeeting: (body: IStartMeetingBody) =>
    client.post(URL_PATH.start_meeting_session, body),
  teacherJoinMeeting: (classSessionId: any) =>
    client.put(URL_PATH.teacher_join_meeting(classSessionId)),
  teacherLeaveMeeting: (classSessionId: any) =>
    client.put(URL_PATH.teacher_leave_meeting(classSessionId)),
  teacherCancelMeeting: (
    classSessionId: any,
    body: ITeacherCancelMeetingBody,
  ) => client.put(URL_PATH.teacher_cancel_meeting(classSessionId), body),
  teacherFinishMeeting: (
    classSessionId: any,
    body: ITeacherFinishMeetingBody,
  ) => client.post(URL_PATH.teacher_finish_meeting, body),
  getAllLMSStudentExamQuestionStart: (school_exam_schedule_id: any) =>
    client.get(
      URL_PATH.get_all_lms_student_exam_question_start(school_exam_schedule_id),
    ),
  getRombelClassList: () => client.get(URL_PATH.get_rombel_class_list),
  getTeacherClassSubject: (classId: any) =>
    client.get(URL_PATH.get_mapel_by_class(classId)),
  getChaptersBySubject: (subjectId: any) =>
    client.get(URL_PATH.get_list_chapter_by_subject(subjectId)),
  getListPaketUjianByChapter: (
    school_only: boolean,
    subjectId: any,
    classId: any,
  ) =>
    client.get(
      URL_PATH.get_list_paket_ujian_by_chapter(school_only, subjectId, classId),
    ),
  createPaketSoalUjian: (bodyPayload: ICreatePaketSoalUjianPayload) =>
    client.post(URL_PATH.create_paket_soal_ujian, bodyPayload),
  getDetailPaketSoalUjianList: (packageId: any) =>
    client.get(URL_PATH.get_detail_paket_soal_list(packageId)),
  getDetailSoal: (packageId: any, soalId: any) =>
    client.get(URL_PATH.get_detail_soal(packageId, soalId)),
  getDetailSoalNew: (questionId: any) =>
    client.get(URL_PATH.get_detail_soal_new(questionId)),
  batalkanUjian: (examId: any) =>
    client.delete(URL_PATH.batalkan_ujian(examId)),
  getBankSoal: (subjectId: any, params?: IBankSoalFilterParam) =>
    client.get(URL_PATH.get_bank_soal(subjectId), {
      params,
    }),
  addSoalToPaketSoal: (packageId: any, bodyPayload: IAddToPaketSoalPayload) =>
    client.post(URL_PATH.add_soal_to_paket_soal(packageId), bodyPayload),
  createSoalSendiriUjian: (
    packageId: any,
    bodyPayload: ICreateSoalSendiriPayload,
  ) => client.post(URL_PATH.create_soal_sendiri_ujian(packageId), bodyPayload),
  editSoalSendiriUjian: (
    packageId: any,
    bodyPayload: ICreateSoalSendiriPayload,
  ) => client.put(URL_PATH.create_soal_sendiri_ujian(packageId), bodyPayload),
  deleteSoal: (packageId: any, questionId: any) =>
    client.delete(URL_PATH.delete_soal(packageId, questionId)),
  getRombelUser: (userTypeId: any, params?: IRombelUserFilterParam) =>
    client.get(URL_PATH.rombel_user(userTypeId), {
      params,
    }),
  createJadwalUjian: (bodyPayload: IJadwalkanUjianPayload) =>
    client.post(URL_PATH.create_jadwal_ujian, bodyPayload),
  updateJadwalUjian: (scheduleId: any, bodyPayload: IJadwalkanUjianPayload) =>
    client.put(URL_PATH.update_jadwal_ujian(scheduleId), bodyPayload),
  getDetailJadwalUjian: (scheduleId: any) =>
    client.get(URL_PATH.get_detail_jadwal_ujian(scheduleId)),
  createQuestionTask: (
    payload: ICreateSoalSendiriPayload,
    task_teacher_id?: number,
  ) => client.post(URL_PATH.create_question_task(task_teacher_id), payload),
  deleteQuestionTask: (_id: any, uuid: any) =>
    client.delete(URL_PATH.delete_question_task(_id, uuid)),

  createNote: (body: CreateNoteBody) =>
    client.post(URL_PATH.create_note_pancasila, body),
  editNote: (body: CreateNoteBody, note_id?: string) =>
    client.put(URL_PATH.edit_note_pancasila(note_id), body),
  deleteMyNote: (params: IDeleteMyNoteParam) =>
    client.delete(URL_PATH.delete_my_note_pancasila(params.note_id)),
  deleteSharedNote: (params: IDeleteMyNoteParam) =>
    client.delete(URL_PATH.delete_shared_note(params.note_id)),
  cekPrProjekTugas: (prProjekTugasId: any) =>
    client.get(URL_PATH.cek_pr_projek_tugas(prProjekTugasId)),
  startPrProjekTugas: (prProjekTugasId: any) =>
    client.get(URL_PATH.start_pr_projek_tugas(prProjekTugasId)),
  getSingleTaskPrProjekTugas: (historyId: any, order: any) =>
    client.get(URL_PATH.get_single_task_pr_projek_tugas(historyId, order)),
  getAnnouncements: ({
    status,
    offset,
    limit,
    search = '',
    dateStart = '',
    dateEnd = '',
    userType = '',
  }: {
    status: 'active' | 'scheduled' | 'history' | 'finish' | 'deleted';
    offset: number;
    limit: number;
    search?: string;
    dateStart?: string;
    dateEnd?: string;
    userType?: string;
  }) =>
    client.get(
      URL_PATH.get_announcements({
        status,
        offset,
        limit,
        search,
        dateStart,
        dateEnd,
        userType,
      }),
    ),
  postAnnouncement: (body: any) =>
    client.post(URL_PATH.post_announcement, body),
  putAnnouncement: (announcementID: number, body: any) =>
    client.put(URL_PATH.put_announcement(announcementID), body),
  getAnnouncement: (announcementID: number) =>
    client.get(URL_PATH.get_announcement(announcementID)),
  deleteAnnouncement: (announcementID: number) =>
    client.delete(URL_PATH.delete_announcement(announcementID)),
  getAnnouncementListReceivers: (degreeId: number) =>
    client.get(URL_PATH.get_announcement_list_receivers(degreeId)),
  answerSingleQuestionPRProjectTugas: (
    taskId: any,
    bodyPayload: IAnswerSingleQuestionPRProjectTugasPayload,
  ) =>
    client.post(
      URL_PATH.answer_single_question_pr_project_tugas(taskId),
      bodyPayload,
    ),
  answerSubmitTaskPRProjectTugas: (
    bodyPayload: IAnswerSubmitTaskPRProjectTugasPayload,
  ) => client.post(URL_PATH.answer_submit_task_pr_project_tugas, bodyPayload),
  getDetailProgressQuestionPRProjectTugas: (questionUUID: any) =>
    client.get(
      URL_PATH.get_detail_progress_question_pr_project_tugas(questionUUID),
    ),
  getAbsentHistoryDetail: (absence_id: any) =>
    client.get(URL_PATH.get_absent_history_detail(absence_id)),
  historyLks: (filter?: ILKSHistoryListFilter) =>
    client.post(URL_PATH.lks_history, filter),
  getLKSDetail: (rombelId: any, subjectId: any, chapterId: any) =>
    client.get(URL_PATH.get_lks_detail(rombelId, subjectId, chapterId)),
  downloadLKS: (rombelId: any, subjectId: any, chapterId: any) =>
    client.get(
      URL_PATH.get_download_lks_history(rombelId, subjectId, chapterId),
      {responseType: 'blob'},
    ),
  lksReport: (userId: any, subjectId: any) =>
    client.get(URL_PATH.lks_report(userId, subjectId)),
  lksReportHistory: (userId: any, subjectId: any) =>
    client.get(URL_PATH.lks_report_history(userId, subjectId)),
  lksReportSummary: (userId: any) =>
    client.get(URL_PATH.lks_report_summary(userId)),
  getTeacherAbsentRequests: ({
    limit,
    offset,
    bodyPayload,
  }: {
    limit: number;
    offset: number;
    bodyPayload: {
      approval_status: 'diterima' | 'ditolak' | 'menunggu';
      start_date: string;
      end_date: string;
    };
  }) =>
    client.post(
      URL_PATH.get_teacher_absent_requests({limit: limit, offset: offset}),
      bodyPayload,
    ),
  getStudentAbsentRequests: ({
    limit,
    offset,
    keyword,
    bodyPayload,
  }: {
    limit?: number;
    offset?: number;
    keyword?: string;
    bodyPayload?: {
      approval_status: 'diterima' | 'ditolak' | 'menunggu';
      start_date: string;
      end_date: string;
      rombel_class_school_id: any;
    };
  }) =>
    client.post(
      URL_PATH.get_student_absent_requests({
        limit: limit,
        offset: offset,
        keyword: keyword,
      }),
      bodyPayload,
    ),
  getTeachersAbsentRequestHistory: ({
    limit,
    offset,
    keyword,
    bodyPayload,
  }: {
    limit: number;
    offset: number;
    keyword: string;
    bodyPayload: {
      approval_status: 'diterima' | 'ditolak' | 'menunggu';
      start_date: string;
      rombel_class_school_id?: any;
      end_date: string;
    };
  }) =>
    client.post(
      URL_PATH.get_teachers_absent_request_history({
        limit: limit,
        keyword: keyword,
        offset: offset,
      }),
      bodyPayload,
    ),
  putAcceptAbsentRequest: (absence_id: any) =>
    client.put(URL_PATH.put_accept_absent_request(absence_id)),
  putRejectAbsentRequest: (bodyPayload: {
    Absence_id: number;
    reviewer_note: string;
  }) => client.put(URL_PATH.put_reject_absent_request(), bodyPayload),
  getOfflineClassAttendanceDetail: (bodyPayload: {
    rombel_class_school_id: number;
    semester: string;
    sort?: string;
  }) =>
    client.post(
      URL_PATH.get_offline_class_attendance_detail(bodyPayload?.sort),
      bodyPayload,
    ),
  getOneClassAttendance: (bodyPayload: {
    rombel_class_school_id?: number;
    date?: string;
  }) => client.post(URL_PATH.get_one_class_attendance(), bodyPayload),
  insertOfflineAttendance: (bodyPayload: {
    rombel_class_school_id: number;
    date: string;
    students: any;
  }) => client.post(URL_PATH.insert_offline_attendance(), bodyPayload),
  insertOfflineAttendanceCsv: (bodyPayload: {
    rombel_class_school_id: number;
    date: string;
    csv_link: any;
  }) => client.post(URL_PATH.insert_offline_attendance_csv(), bodyPayload),
  getAllRombelWithStudentRequests: () =>
    client.get(URL_PATH.get_all_rombel_with_student_requests()),
  startLMSUjian: (school_exam_schedule_id: any, timeZoneOffset: string) =>
    client.get(
      URL_PATH.start_lms_ujian(school_exam_schedule_id, timeZoneOffset),
    ),
  getLmsUjianDetailQuestion: (
    question_package_id: any,
    order: any,
    student_exam_id: any,
  ) =>
    client.get(
      URL_PATH.get_lms_ujian_detail_question(
        question_package_id,
        order,
        student_exam_id,
      ),
    ),
  answerLMSUjianSingleQuestion: (
    student_exam_id: any,
    bodyPayload: ILMSUjianAnswerSingleQuestionPayload,
  ) =>
    client.post(
      URL_PATH.answer_lms_ujian_single_question(student_exam_id),
      bodyPayload,
    ),
  submitLMSUjian: (student_exam_id: any) =>
    client.post(URL_PATH.submit_lms_ujian(student_exam_id)),
  submitLMSUjianWithUUID: (student_exam_id: string, uuid: string) =>
    client.post(URL_PATH.submit_lms_ujian_with_uuid(student_exam_id, uuid)),
  summaryLMSUjian: (student_exam_id: any) =>
    client.get(URL_PATH.summary_lms_ujian(student_exam_id)),
  answeredLMSUjian: (student_exam_id: any) =>
    client.get(URL_PATH.answered_lms_ujian(student_exam_id)),
  duplicate_task_teacher: (id_list: number) =>
    client.get(URL_PATH.duplicate_task_teacher(id_list), {
      timeout: 0, //no timeout
    }),
  getLMSListUjian: (bodyPayload: {
    search: string;
    status: any[];
    status_student: any[];
    subject_id: any[];
    page: number;
    limit: number;
  }) => client.post(URL_PATH.get_lms_list_ujian(), bodyPayload),
  submitLMSUjianViolation: (bodyPayload: ISubmitLMSUjianViolationPayload) =>
    client.post(URL_PATH.submit_lms_ujian_violation, bodyPayload),
  remove_task_teacher: (task_teacher_id: number) =>
    client.delete(URL_PATH.remove_task_teacher(task_teacher_id)),
  get_task_teacher_history: (id: number) =>
    client.get(URL_PATH.get_teacher_task_history_detail(id)),
  postClassSessionAccessRecord: (body: any) =>
    client.post(URL_PATH.post_class_session_access_record, body),
  edit_school_materials: (body: any, id: number) =>
    client.put(URL_PATH.detail_school_materials(id), body),
  get_detail_school_materials: (id: number) =>
    client.get(URL_PATH.detail_school_materials(id)),
  remove_school_materials: (id: number) =>
    client.delete(URL_PATH.detail_school_materials(id)),
  get_user_active_curriculum: () => client.get(URL_PATH.get_active_curriculum),
  post_user_active_curriculum: (body: any) =>
    client.post(URL_PATH.post_active_curriculum, body),
};

export default provider;
