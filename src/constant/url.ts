import {Platform} from 'react-native';
import {convertToQueryString, defaultLimitOffset} from './functional';

export const BASE_NAME_UAA = '/uaa/v1';
const BASE_NAME_AUTH = '/auth/v1';
const BASE_NAME_MEDIA = '/media/v1';
const BASE_NAME_LPT = '/lpt/v1';
const BASE_NAME_SOAL = '/soal/v1';
const BASE_NAME_CHAT = 'chat/v1';
const BASE_NAME_LMS = 'lms/v1';
const BASE_NAME_LMS_V2 = 'lms/v2';
const BASE_NAME_TANYA = 'tanya/v1';
const BASE_NAME_GURU = 'guru/v1';
const BASE_NAME_MASTER = 'master/v1';
const BASE_NAME_BACKOFFICE = 'backoffice';
const BASE_NAME_PANCASILA = 'pancasila/v1';
const BASE_NAME_SEARCH = 'search/v1';
const BASE_NAME_SCHEDULE = 'schedule/v1';
const BASE_NAME_TRYOUT = 'tryout/v1';
const BASE_NAME_PTN = 'ptn_soal/v1';
const BASE_NAME_DIAGNOSTIC_TEST = 'diagnostic-test/v1';
const BASE_NAME_PURCHASE = 'purchase/v1';
const BASE_NAME_CAMPAIGN = 'marketingtools/v1';
const BASE_NAME_NODE_HELPER = 'nodehelper';
export const TELEGRAM_URL = 'https://api.telegram.org/';

export const defaultAvatar =
  'https://storage.googleapis.com/kp-bucket-dev/kelas_pintar/image/user/default_avatar/5ad2440c-35e4-4385-81c0-e4be17c5b346/5ad2440c-35e4-4385-81c0-e4be17c5b346.png';

export const bantuanWhatsapp = (appLogId?: string) =>
  `https://api.whatsapp.com/send/?phone=6281513003999&text=${
    appLogId ? '(' + appLogId + ')+' : ''
  }Hi+Kelas+Pintar%21+Saya+butuh+penjelasan+mengenai...&type=phone_number&app_absent=0`;

export const URL_PATH = {
  // UAA
  get_user: `${BASE_NAME_UAA}/user/get-user`,
  check_version: `${BASE_NAME_AUTH}/check/version`,
  check_token: (isAdmin: boolean) =>
    `${BASE_NAME_AUTH}/check-token?is_admin=${isAdmin}`,
  post_check_username: `${BASE_NAME_AUTH}/check/username`,
  post_login: `${BASE_NAME_AUTH}/login`,
  refresh_token: `${BASE_NAME_UAA}/auth/refresh-token`,
  post_logout: () => `${BASE_NAME_UAA}/user/logout`,
  start_vid_xp_timer: `${BASE_NAME_UAA}/user/start-vid-xp-timer`,
  end_vid_xp_timer: (object_id: any) =>
    `${BASE_NAME_UAA}/user/end-vid-xp-timer/${object_id}`,
  change_avatar: `${BASE_NAME_UAA}/user/change_avatar`,
  edit_profil: `${BASE_NAME_UAA}/user/edit_profil`,
  put_edit_class: (classId: number) =>
    `${BASE_NAME_UAA}/user/edit-class/${classId}`,
  get_list_class: `${BASE_NAME_MASTER}/class`,
  search_by_orangtua: `${BASE_NAME_UAA}/user/search_orang_tua`,
  get_all_prefered_quality_video: `${BASE_NAME_MASTER}/video-quality`,
  put_download_with_wifi: `${BASE_NAME_UAA}/user/download-with-wifi`,
  put_prefered_quality_video: (video_quality_id: number) =>
    `${BASE_NAME_UAA}/user/prefered-video-quality/${video_quality_id}`,
  search_by_student: `${BASE_NAME_UAA}/user/search-student`,
  get_list_activity: (
    limit: number,
    page: number,
    startDate: any,
    endDate: any,
  ) =>
    `${BASE_NAME_UAA}/user/my-activity?limit=${limit}&page=${page}&start_date=${startDate}&end_date=${endDate}`,
  send_connect_request_to_orangtua: `${BASE_NAME_UAA}/user/send_connect_request_to_orangtua/`,
  send_connect_request_to_anak: `${BASE_NAME_UAA}/user/add-student-account`,
  cancel_parent_connection: `${BASE_NAME_UAA}/user/cancel_parent_connection/`,
  cancel_student_connection: `${BASE_NAME_UAA}/user/cancel-student-connection`,
  post_check_password: `${BASE_NAME_UAA}/user/check_password`,
  get_orang_tua: `${BASE_NAME_UAA}/user/get-orang-tua`,
  check_phone_book: `${BASE_NAME_UAA}/auth/check/phonebook`,
  get_pre_deactived_account: `${BASE_NAME_UAA}/user/request-otp-deactivate-account`,
  verify_otp_deactived_account: `${BASE_NAME_UAA}/user/verify-otp-deactivate-account`,
  check_coachmark: `${BASE_NAME_UAA}/user/coachmark`,
  update_coachmark: `${BASE_NAME_UAA}/user/update-coachmark`,
  get_fcm_token: (platform: typeof Platform.OS) =>
    `${BASE_NAME_UAA}/user/get-user-fcm/${platform}`,
  put_fcm_token: () => `${BASE_NAME_UAA}/user/update-user-fcm`,
  // MEDIA
  get_image: (id_media: string) => `${BASE_NAME_MEDIA}/image/${id_media}`,
  get_file: (id_media: string) => `${BASE_NAME_MEDIA}/file/${id_media}`,
  get_file_html: (file_id: string) => `${BASE_NAME_MEDIA}/file/${file_id}`,
  get_ebook: (file_id: string) =>
    `${BASE_NAME_MEDIA}/file/html/${file_id || ''}`,
  get_video_recording: (id_media: string) =>
    `${BASE_NAME_MEDIA}/video/recording/${id_media}`,
  get_video_recording_by_resolution: (id_media: string, resolution: string) =>
    `${BASE_NAME_MEDIA}/video/recording/${id_media}/${resolution}`,
  upload_image: `${BASE_NAME_MEDIA}/image/`,
  upload_file: `${BASE_NAME_MEDIA}/file/`,
  upload_video: `${BASE_NAME_MEDIA}/video/`,

  // LPT
  create_user_learn_progress: (user_id: any) =>
    `${BASE_NAME_LPT}/learn/new_progress?user_id=${user_id}`,
  get_all_notes: (chapter_id: string) =>
    `${BASE_NAME_LPT}/learn/notes/${chapter_id}`,
  get_all_chapter_lesson: (chapter_id: string) =>
    `${BASE_NAME_LPT}/learn/${chapter_id}`,
  get_all_chapter_test: (chapter_id: string) =>
    `${BASE_NAME_LPT}/tests/go_test/test_type?chapter_id=${chapter_id}`,
  get_all_akm: () => `${BASE_NAME_LPT}/akm`,
  get_ulangan_harian_chapter: (subject_id: number) =>
    `${BASE_NAME_SOAL}/service/ulangan-harian/${subject_id}`,
  get_ujian_tengah_semester_package: (subject_id: number) =>
    `${BASE_NAME_SOAL}/service/ujian/ujian-tengah-semester/${subject_id?.toString()}`,
  get_ujian_akhir_semester_package: (subject_id: number) =>
    `${BASE_NAME_SOAL}/service/ujian/ujian-akhir-semester/${subject_id}`,
  get_ujian_akhir_tahun_package: (subject_id: number) =>
    `${BASE_NAME_SOAL}/service/ujian/ujian-akhir-tahun/${subject_id}`,
  get_ujian_sekolah_package: (subject_id: number) =>
    `${BASE_NAME_SOAL}/service/ujian/ujian-sekolah/${subject_id}`,
  get_ulangan_harian_chapter_practice_package: (chapter_id: number) =>
    `${BASE_NAME_SOAL}/service/ulangan-harian/practice/${chapter_id}`,
  get_ulangan_harian_chapter_test_package: (chapter_id: number) =>
    `${BASE_NAME_SOAL}/service/ulangan-harian/test/${chapter_id}`,
  get_all_akm_type_package: (
    _question_package_service_id: string,
    _question_type_id: string,
  ) =>
    `${BASE_NAME_LPT}/akm/${_question_package_service_id}?question_type_id=${_question_type_id}`,
  update_terbaca_update_confirm: () =>
    `${BASE_NAME_UAA}/user/update_parent_connection/`,
  update_terbaca_parent_update_confirm: `${BASE_NAME_UAA}/user/update_student_connection/`,
  get_shared_notes: (chapter_id: string) =>
    `${BASE_NAME_LPT}/learn/notes/${chapter_id}/shared`,
  get_detail_note: (note_id: string) =>
    `${BASE_NAME_LPT}/learn/note/one/${note_id}`,
  create_note: `${BASE_NAME_LPT}/learn/notes`,
  edit_note: (note_id?: string) => `${BASE_NAME_LPT}/learn/notes/${note_id}`,
  share_learn_note: `${BASE_NAME_LPT}/learn/notes/share`,
  delete_my_note: (note_id: string) =>
    `${BASE_NAME_LPT}/learn/notes?note_id=${note_id}`,
  delete_shared_note: (note_id: string) =>
    `${BASE_NAME_LPT}/learn/note/${note_id}/shared`,
  submit_single_question_test: `${BASE_NAME_LPT}/tests/go_test/user_history/single`,
  get_history_detail_test: (
    chapterId: string,
    userHistoryId: string | number,
    studentId?: string | number,
  ) =>
    `${BASE_NAME_LPT}/tests/go_test/user_history/${chapterId}?user_question_service_history_id=${userHistoryId}${
      studentId ? `&studentId=${studentId}` : ''
    }`,
  submit_question_answer_test: `${BASE_NAME_LPT}/tests/go_test/user_history/submit`,
  get_all_subject_chapter_report: (
    subject_id: number,
    chapter_id?: any,
    student_id?: any,
  ) =>
    `${BASE_NAME_LPT}/report/${subject_id}/${chapter_id}?studentId=${student_id}`,
  get_all_subject_report: (subject_id: number, student_id?: any) =>
    `${BASE_NAME_LPT}/report/${subject_id}?studentId=${student_id}`,
  get_all_subject_report_kpreg: (
    subject: string,
    test_type_id: string,
    student_id?: string,
  ) =>
    `${BASE_NAME_LPT}/report/${subject}/${test_type_id}${
      student_id ? `?studentId=${student_id}` : ''
    }`,
  get_all_test_type: (subject_id: number) =>
    `${BASE_NAME_LPT}/tests/go_test/service/${subject_id}/test`,
  get_all_subject_chapter_report_teacher: (
    subject_id: number,
    chapter_id?: any,
    student_id?: number,
  ) =>
    `${BASE_NAME_LMS}/student-report/material/test/history/${subject_id}/${chapter_id}?studentId=${student_id}`,
  get_next_content_video_presentation: (
    chapterId: number,
    learningMethodId: number,
    isFromLMS?: boolean,
  ) =>
    `${BASE_NAME_LPT}/learn/next-materials/${chapterId}/${learningMethodId}${
      isFromLMS ? '?service=SCHOOL_MATERIAL' : ''
    }`,
  get_practice_chapter_by_id: (subject_id: number) =>
    `${BASE_NAME_LPT}/practice?subject_id=${subject_id}`,
  get_test_chapter_by_id: (subject_id: number) =>
    `${BASE_NAME_LPT}/tests/go_test?subject_id=${subject_id}`,
  get_learn_chapter_by_id: (subject_id: number) =>
    `${BASE_NAME_LPT}/learn/progress?subject_id=${subject_id}`,

  // LMS
  get_subject_all: (classIds?: string, type?: string) =>
    `${BASE_NAME_LMS}/teacher/subject/all?class_ids=${classIds || ''}&type=${
      type || ''
    }`,
  get_all_rombel_with_student_requests: () =>
    `${BASE_NAME_LMS}/attendance/all-rombel-with-student-requests`,
  get_absent_history_detail: (absence_id: any) =>
    `${BASE_NAME_LMS}/attendance/absent-history-detail/${absence_id}`,
  get_report: (user_id: any) => `${BASE_NAME_LMS}/report/?user_id=${user_id}`,
  put_accept_absent_request: (absence_id: any) =>
    `${BASE_NAME_LMS}/attendance/accept-absent-request/${absence_id}`,
  put_reject_absent_request: () =>
    `${BASE_NAME_LMS}/attendance/reject-absent-request/`,
  get_teachers_absent_request_history: ({
    limit,
    offset,
    keyword,
  }: {
    limit: number;
    offset: number;
    keyword: string;
  }) =>
    `${BASE_NAME_LMS}/attendance/get-teachers-absent-request-history?limit=${
      limit ?? 5
    }&offset=${offset ?? 0}&keyword=${keyword ?? ''}`,
  put_ignore_absent_request: () =>
    `${BASE_NAME_LMS}/attendance/reject-absent-request/`,
  get_students_absent_request_history: () =>
    `${BASE_NAME_LMS}/attendance/get-students-absent-request-history/`,
  get_offline_class_attendance_detail: (sort?: string) =>
    `${BASE_NAME_LMS}/attendance/teacher/get-offline-class-attendance-detail?sort_by=${sort}`,
  get_download_attendance_format: (rombel_class_school_id?: any) =>
    `${BASE_NAME_LMS}/attendance/teacher/download-attendance-format/${rombel_class_school_id}`,
  get_teacher_classes_info: (limit?: number, offset?: number) =>
    `${BASE_NAME_LMS}/attendance/teacher/teacher-classes-info?limit=${
      limit ?? 1
    }&offset=${offset ?? 0}`,
  get_student_attendance_calendar: (student_id: any, month?: string) =>
    !month
      ? `${BASE_NAME_LMS}/attendance/teacher/get-student-attendance-calendar/${student_id}`
      : `${BASE_NAME_LMS}/attendance/teacher/get-student-attendance-calendar/${student_id}?year_month=${month}`,
  change_student_offline_attendance: `${BASE_NAME_LMS}/attendance/teacher/change-student-offline-attendance`,
  delete_student_offline_attendance: (attendance_id: any) =>
    `${BASE_NAME_LMS}/attendance/teacher/delete-student-offline-attendance/${attendance_id}`,
  get_student_online_attendance_detail: (sortBy: string) =>
    `${BASE_NAME_LMS}/attendance/teacher/get-student-online-attendance-detail/?sort_by=${sortBy}`,
  get_students_online_attendance_summary: () =>
    `${BASE_NAME_LMS}/attendance/teacher/get-students-online-attendance-summary`,
  get_students_offline_attendance_summary: () =>
    `${BASE_NAME_LMS}/attendance/teacher/get-students-offline-attendance-summary`,
  get_detail_murid: (userId: number) =>
    `${BASE_NAME_LMS}/rombel-user/detail/${userId}`,
  get_report_check_download: ({
    murid_id,
    rombel_class_school_id,
    academic_year_id,
    academic_phase_id,
    school_id,
  }: any) =>
    `${BASE_NAME_LMS}/assessment/erapor/share/cekdownload/${murid_id}/${rombel_class_school_id}/${academic_year_id}/${academic_phase_id}/${school_id}`,
  get_all_list_class_admin: `${BASE_NAME_LMS}/administration/class/list`,
  get_list_class_rombel: (class_id: number) =>
    `${BASE_NAME_LMS}/administration/class-rombel/list/${class_id}`,
  get_class_rombel_detail: (
    user_id: number,
    status: string,
    limit: number,
    page: number,
  ) =>
    `${BASE_NAME_LMS}/administration/class-rombel/user/${user_id}?status=${status}&limit=${limit}&page=${page}`,
  get_list_history_admin: (
    rombel_class_id: number,
    user_type_id: any,
    search: any,
    limit: number,
    page: number,
  ) =>
    `${BASE_NAME_LMS}/rombel-user/${user_type_id}?rombelClassId=${rombel_class_id}&search=${search}&limit=${limit}&page=${page}`,
  get_list_class_rombel_detail: (rombel_class_school_id: number) =>
    `${BASE_NAME_LMS}/administration/class-rombel/detail/${rombel_class_school_id}`,
  get_evidence_detail: (evidence_id: number) =>
    `${BASE_NAME_LMS}/administration/detail/${evidence_id}`,
  get_list_registration_number: (search: any) =>
    `${BASE_NAME_LMS}/administration/student/list?search=${search}`,
  get_list_payment_method: `${BASE_NAME_LMS}/administration/payment-method-category/list`,
  get_list_school_bank_account: `${BASE_NAME_LMS}/administration/payment-method-category/list`,
  get_list_payment_category: `${BASE_NAME_LMS}/payment-for/`,
  post_submit_payment_evidence: `${BASE_NAME_LMS}/administration/`,
  generate_erapor_murid: (id_rapor: number) =>
    `${BASE_NAME_LMS}/assessment/erapor/share/detail/download/${id_rapor}`,
  get_detail_erapor_murid: (id_rapor: number) =>
    `${BASE_NAME_LMS}/assessment/erapor/share/detail/${id_rapor}`,
  put_accept_decline_administration: (id: number) =>
    `${BASE_NAME_LMS}/administration/${id}`,
  get_lms_materi_sekolah: () => `${BASE_NAME_MASTER}/list-subject`,
  get_list_saved_video: (device_id: any) =>
    `${BASE_NAME_MASTER}/user-videos/${device_id}`,
  get_lms_materi_sekolah_bab: (subject_id: string) =>
    `${BASE_NAME_LMS}/school-material/progress/${subject_id}`,
  get_lms_list_ujian: () => `${BASE_NAME_LMS}/student/ujian/schedule/`,
  get_lms_history_exam: (school_exam_schedule_id: any, student_exam_id: any) =>
    `${BASE_NAME_LMS}/student/ujian/schedule/${school_exam_schedule_id}/${student_exam_id}`,
  get_lms_materi_sekolah_materi: (chapter_id: string) =>
    `${BASE_NAME_LMS}/school-material/${chapter_id}`,
  get_detail_pr_project_tugas: (task_id: any, number: any) =>
    `${BASE_NAME_LMS}/student/task/question/show/${task_id}/${number}`,
  answer_pr_project_tugas: `${BASE_NAME_LMS}/student/task`,
  answer_lms_student_exam: (student_exam_id: any) =>
    `${BASE_NAME_LMS}/student/ujian/schedule/history/${student_exam_id}`,
  answer_single_question_pr_project_tugas: (taskId: any) =>
    `${BASE_NAME_LMS}/student/task/question/${taskId}`,
  answer_submit_task_pr_project_tugas: `${BASE_NAME_LMS}/student/task/finish`,
  get_detail_progress_question_pr_project_tugas: (questionUUID: any) =>
    `${BASE_NAME_LMS}/student/task/question/numberprogress/${questionUUID}`,
  get_all_lms_teacher_class_session: `${BASE_NAME_LMS}/class-session/`,
  get_all_lms_student_exam_question_start: (school_exam_schedule_id: any) =>
    `${BASE_NAME_LMS}/student/ujian/schedule/${school_exam_schedule_id}`,
  get_time_student_exam: (school_exam_schedule_id: any) =>
    `${BASE_NAME_LMS}/student/ujian/schedule/${school_exam_schedule_id}/time/`,
  get_all_practice_chapter_question: (
    chapter_id: string,
    question_service_type_id: any,
  ) =>
    `${BASE_NAME_LPT}/practice/go_practice/question/${chapter_id}?question_service_type_id=${question_service_type_id}`,
  get_practice_games: (chapter_id: any) =>
    `${BASE_NAME_LPT}/practice/go_practice/${chapter_id}`,
  get_all_kuis_chapter: (subject_id: string) =>
    `${BASE_NAME_SOAL}/service/kuis/${subject_id}`,
  get_kuis_packages: (chapter_id: string) =>
    `${BASE_NAME_SOAL}/service/kuis/packages/${chapter_id}`,
  get_kuis_question: (question_package_id: string) =>
    `${BASE_NAME_SOAL}/service/kuis/question/${question_package_id}`,
  get_all_test_type_question: (
    chapter_id: string,
    question_service_type_id: any,
    level_id: any,
  ) =>
    `${BASE_NAME_LPT}/tests/go_test/question/${chapter_id}?question_service_type_id=${question_service_type_id}&level_id=${level_id}`,
  get_all_test_type_question_essay: (
    chapter_id: string,
    question_service_type_id: any,
  ) =>
    `${BASE_NAME_LPT}/tests/go_test/question/${chapter_id}?question_service_type_id=${question_service_type_id}`,
  get_all_package_question_akm: (question_package_id: string) =>
    `${BASE_NAME_LPT}/akm/question/${question_package_id}`,
  practice_type_progress: `${BASE_NAME_LPT}/practice/go_practice/practice_type`,
  submit_test_mcq_answer: `${BASE_NAME_LPT}/tests/go_test/user_history/objective`,
  submit_akm_mcq_answer: `${BASE_NAME_LPT}/akm/user_history/pilihan_ganda`,
  get_list_paket_ujian_by_chapter: (
    school_only: boolean,
    subjectId: any,
    classId: any,
  ) =>
    `${BASE_NAME_LMS}/teacher/ujian/package?school_only=${school_only}&subject_id=${subjectId}&chapter_id=${classId}`,
  create_paket_soal_ujian: `${BASE_NAME_LMS}/teacher/ujian/package`,
  get_detail_paket_soal_list: (packageId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/package/${packageId}`,
  delete_detail_paket_soal_list: (packageId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/package/${packageId}`,
  delete_bulk_detail_paket_soal_list: (packageId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/package/many/${packageId}`,
  put_reoder_detail_paket_soal_list: (packageId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/package/${packageId}`,
  get_detail_soal: (packageId: any, order: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/question/navigation/${packageId}/${order}`,
  get_detail_soal_new: (question_id: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/question/${question_id}`,
  get_bank_soal: (subject_id: any) =>
    `${BASE_NAME_LMS}/packages-list-grouped/${subject_id}`,
  delete_soal: (packageId: any, questionId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/question/${packageId}/${questionId}`,
  upload_bulk_soal: (packageId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/question/bulk/${packageId}`,
  rapor_history_list: (
    academic_year: any,
    class_id: any,
    rombel_id: any,
    phase_id: any,
  ) =>
    `${BASE_NAME_LMS}/rapor-sekolah/riwayat/list/${academic_year}/${class_id}?rombel_id=${rombel_id}&phase_id=${phase_id}`,
  preview_rapor: (rapor_id: any) =>
    `${BASE_NAME_LMS}/rapor-sekolah/riwayat/preview/${rapor_id}`,
  get_all_note_pancasila: `${BASE_NAME_PANCASILA}/notes/`,
  get_detail_note_pancasila: (note_id?: string) =>
    `${BASE_NAME_PANCASILA}/notes/${note_id}`,
  create_note_pancasila: `${BASE_NAME_PANCASILA}/notes/`,
  edit_note_pancasila: (note_id?: string) =>
    `${BASE_NAME_PANCASILA}/notes/${note_id}`,
  share_learn_note_pancasila: `${BASE_NAME_PANCASILA}/learn/notes/share/`,
  delete_my_note_pancasila: (note_id: string) =>
    `${BASE_NAME_PANCASILA}/notes/${note_id}`,
  get_announcements: ({
    status,
    offset,
    limit,
    search,
    dateStart,
    dateEnd,
    userType,
  }: any) =>
    `${BASE_NAME_LMS}/announcement/?status=${status}&page=${offset}&limit=${limit}&search=${search}&dateStart=${dateStart}&dateEnd=${dateEnd}&user_type=${userType}`,
  post_announcement: `${BASE_NAME_LMS}/announcement/`,
  put_announcement: (announcement_id: number) =>
    `${BASE_NAME_LMS}/announcement/${announcement_id}`,
  get_announcement: (announcement_id: number) =>
    `${BASE_NAME_LMS}/announcement/${announcement_id}`,
  delete_announcement: (announcement_id: number) =>
    `${BASE_NAME_LMS}/announcement/${announcement_id}`,
  lks_history: `${BASE_NAME_LMS}/student-report/lks/history`,
  get_download_lks_history: (rombelId: any, subjectId: any, chapterId: any) =>
    `${BASE_NAME_LMS}/student-report/lks/history/download/${rombelId}/${subjectId}/${chapterId}`,
  lks_report: (userId: any, subjectId: any) =>
    `${BASE_NAME_LMS}/student-report/lks/report/${userId}/${subjectId}`,
  lks_report_history: (userId: any, subjectId: any) =>
    `${BASE_NAME_LMS}/student-report/lks/report/riwayat/${userId}/${subjectId}`,
  lks_report_summary: (userId: any) =>
    `${BASE_NAME_LMS}/student-report/lks/report/${userId}`,
  get_announcement_list_receivers: (degree_id: number) =>
    `${BASE_NAME_LMS}/announcement/announcement-receiver/${degree_id}`,
  start_lms_ujian: (school_exam_schedule_id: any, timeZoneOffset: string) => {
    return `${BASE_NAME_LMS}/student/ujian/schedule/${school_exam_schedule_id}?utc=${timeZoneOffset}`;
  },
  get_lms_ujian_detail_question: (
    question_package_id: any,
    order: any,
    student_exam_id: any,
  ) =>
    `${BASE_NAME_LMS}/student/ujian/schedule/navigation/${question_package_id}/${order}/${student_exam_id}`,
  answer_lms_ujian_single_question: (student_exam_id: any) =>
    `${BASE_NAME_LMS}/student/ujian/schedule/history/${student_exam_id}/single`,
  submit_lms_ujian: (student_exam_id: any) =>
    `${BASE_NAME_LMS}/student/ujian/schedule/history/${student_exam_id}/submit`,
  submit_lms_ujian_with_uuid: (student_exam_id: string, uuid: string) =>
    `${BASE_NAME_LMS_V2}/student/ujian/schedule/history/${student_exam_id}/submit?uuid=${uuid}`,
  put_uuid_lms_ujian: (uuid: string) =>
    `${BASE_NAME_LMS}/student/ujian/schedule/submit-uuid/${uuid}`,
  summary_lms_ujian: (student_exam_id: any) =>
    `${BASE_NAME_LMS}/student/ujian/schedule/history/${student_exam_id}`,
  answered_lms_ujian: (student_exam_id: any) =>
    `${BASE_NAME_LMS}/student/ujian/scoring/${student_exam_id}/answered/`,
  unscored_lms_ujian: (student_exam_id: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/scoring/${student_exam_id}/unscored/`,
  submit_lms_ujian_violation: `${BASE_NAME_LMS}/student/ujian/schedule/violation/`,
  get_lms_teacher_ujian_violation: (student_exam_id: string) =>
    `${BASE_NAME_LMS}/teacher/ujian/schedule/violation/${student_exam_id}`,
  get_eraport_download: (assessment_erapor_share_student_id: any) =>
    `${BASE_NAME_LMS}/assessment/erapor/share/detail/download/${assessment_erapor_share_student_id}`,
  post_school_material_delete: () =>
    `${BASE_NAME_LMS}/teacher/school-material/delete`,

  // SOAL
  start_soal_or_akm: () => `${BASE_NAME_SOAL}/start`,
  get_all_soal_ulangan_harian_question: (question_package_id: any) =>
    `${BASE_NAME_SOAL}/service/question-package/${question_package_id}`,
  submit_soal_answer: `${BASE_NAME_SOAL}/history`,
  submit_test_essay_answer: `${BASE_NAME_LPT}/tests/go_test/user_history/submit`,
  submit_single_test_essay_answer: `${BASE_NAME_LPT}/tests/go_test/user_history/single`,
  submit_akm_essay_answer: `${BASE_NAME_LPT}/akm/user_history/essay`,
  get_all_uts_uas_at_package_question: (question_package_id: any) =>
    `${BASE_NAME_SOAL}/service/question-package/${question_package_id}`,
  get_all_kuis_question: (question_package_id: any) =>
    `${BASE_NAME_SOAL}/service/kuis/question/${question_package_id}`,
  create_jadwal_ujian: `${BASE_NAME_LMS}/teacher/ujian/schedule/create`,
  update_jadwal_ujian: (scheduleId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/schedule/${scheduleId}`,
  get_detail_jadwal_ujian: (scheduleId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/schedule/${scheduleId}`,
  get_detail_virtual_meeting: (meetingId: any) =>
    `${BASE_NAME_LMS}/virtual-meeting/${meetingId}`,
  get_attandence_virtual_meeting: (meetingId: any) =>
    `${BASE_NAME_LMS}/virtual-meeting/list-attendance/${meetingId}`,
  post_join_virtual_meeting: (meetingId: any) =>
    `${BASE_NAME_LMS}/virtual-meeting/join/${meetingId}`,
  post_leave_virtual_meeting: (meetingId: any) =>
    `${BASE_NAME_LMS}/virtual-meeting/leave/${meetingId}`,
  put_cancel_virtual_meeting: (meetingId: any) =>
    `${BASE_NAME_LMS}/virtual-meeting/cancel/${meetingId}`,
  put_update_virtual_meeting: (meetingId: any) =>
    `${BASE_NAME_LMS}/virtual-meeting/${meetingId}`,

  // LMS
  class_session_rate: () => `${BASE_NAME_LMS}/class-session/rate`,
  download_attendance_report: () =>
    `${BASE_NAME_LMS}/attendance/attendance-report/download`,
  insert_offline_attendance: () =>
    `${BASE_NAME_LMS}/attendance/teacher/insert-offline-attendance`,
  insert_offline_attendance_csv: () =>
    `${BASE_NAME_LMS}/attendance/teacher/insert-offline-attendance-csv`,
  get_one_class_attendance: () =>
    `${BASE_NAME_LMS}/attendance/teacher/get-one-class-attendance`,
  get_schedule_exam_lms_home: (date: string) =>
    `${BASE_NAME_SCHEDULE}/exam/${date}`,
  get_schedule_class_session_lms_home: (date: string) =>
    `${BASE_NAME_SCHEDULE}/class-session/${date}`,
  get_teacher_absent_requests: ({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  }) =>
    `${BASE_NAME_LMS}/attendance/get-teachers-absent-request-history?limit=${
      limit ?? 10
    }&offset=${offset ?? 0}`,
  get_student_absent_requests: ({
    limit,
    offset,
    keyword,
  }: {
    limit?: number;
    offset?: number;
    keyword?: string;
  }) =>
    `${BASE_NAME_LMS}/attendance/get-students-absent-request-history/?limit=${
      limit ?? 10
    }&offset=${offset ?? 0}&keyword=${keyword}`,
  get_rombel_with_student_requests: () =>
    `${BASE_NAME_LMS}/attendance/teacher/rombel-with-student-requests`,
  get_all_session_class: `${BASE_NAME_LMS}/class-session/`,
  get_exam_total_and_value: (id: any) =>
    `${BASE_NAME_LMS}/student-report/exam?subject=${id}`,
  get_detail_session_class: (id: any) => `${BASE_NAME_LMS}/class-session/${id}`,
  get_detail_member_info: (id: any) =>
    `${BASE_NAME_LMS}/discussion-group/get-member-info/${id}`,

  get_meeting_live_session_message: (
    academiClassSessionId: number,
    limit: number,
    offset: number,
  ) =>
    `${BASE_NAME_CHAT}/class_session/chat/${academiClassSessionId}/${limit}/${offset}`,
  get_meeting_live_session_realtime_message: (academiClassSessionId: number) =>
    `${BASE_NAME_CHAT}/class_session/newchat/${academiClassSessionId}`,
  post_meeting_live_session_message: (service_type: string) =>
    `${BASE_NAME_CHAT}/class_session/${service_type}`,

  get_check_unfinished_question_essay: (package_history_id: number) =>
    `${BASE_NAME_SOAL}/check-unfinished/${package_history_id}`,
  get_navigate_question_essay: (package_history_id: number, order: number) =>
    `${BASE_NAME_SOAL}/question/navigation/${package_history_id}/${order}`,
  put_submit_answer_question: `${BASE_NAME_SOAL}/submit`,
  get_finish_question_essay: (package_history_id: number) =>
    `${BASE_NAME_SOAL}/finish/${package_history_id}`,
  get_pause_question_essay: (package_history_id: number) =>
    `${BASE_NAME_SOAL}/pause/${package_history_id}`,
  get_resume_question_essay: (package_history_id: number) =>
    `${BASE_NAME_SOAL}/resume/${package_history_id}`,
  get_tag_question_essay: (package_history_id: number, question_id: number) =>
    `${BASE_NAME_SOAL}/tag/${package_history_id}/${question_id}`,
  get_untag_question_essay: (package_history_id: number, question_id: number) =>
    `${BASE_NAME_SOAL}/untag/${package_history_id}/${question_id}`,
  get_review_question_essay: (package_history_id: number) =>
    `${BASE_NAME_SOAL}/tinjau/${package_history_id}`,
  delete_leave_question_essay: (package_history_id: number) =>
    `${BASE_NAME_SOAL}/leave/${package_history_id}`,

  get_discussion_group_unreads: `${BASE_NAME_LMS}/discussion-group/get-unreads`,
  get_discussion_group_information: `${BASE_NAME_LMS}/discussion-group/get-group-info`,
  get_discussion_group_information_by_keyword: (keyword: any) =>
    `${BASE_NAME_LMS}/discussion-group/get-group-info?keyword=${keyword}`,
  get_discussion_group_message: (limit: number) =>
    `${BASE_NAME_CHAT}/discussion_group/chat/all/${limit}`,
  get_discussion_group_next_previous_page: (
    limit: number,
    type: string,
    created_at: any,
  ) =>
    `${BASE_NAME_CHAT}/discussion_group/chat/next_prev/${limit}?type=${type}&created_at=${created_at}`,
  post_discussion_group_next_previous_search: (limit: number, number: number) =>
    `${BASE_NAME_CHAT}/discussion_group/search/next_prev/${limit}?number=${number}`,
  post_discussion_group_message_search: (limit: number) =>
    `${BASE_NAME_CHAT}/discussion_group/search/${limit}`,
  get_discussion_group_realtime_message: `${BASE_NAME_CHAT}/discussion_group/chat/realtime`,
  get_discussion_potensial_group_member: `${BASE_NAME_LMS}/discussion-group/get-potential-group-members`,
  get_discussion_potensial_group_member_by_keyword: (keyword: any) =>
    `${BASE_NAME_LMS}/discussion-group/get-potential-group-members?keyword=${keyword}`,
  post_discussion_group_message: `${BASE_NAME_CHAT}/discussion_group/store`,
  post_discussion_add_member: `${BASE_NAME_LMS}/discussion-group/add-member`,
  post_discussion_create_group: `${BASE_NAME_LMS}/discussion-group/admin/create-group`,
  put_set_online: `${BASE_NAME_LMS}/discussion-group/set-online`,
  put_set_offline: `${BASE_NAME_LMS}/discussion-group/set-offline`,
  put_delete_avatar_group: `${BASE_NAME_LMS}/discussion-group/delete-avatar`,
  put_change_avatar_group: `${BASE_NAME_LMS}/discussion-group/change-avatar`,
  put_change_group_name: `${BASE_NAME_LMS}/discussion-group/change-group-name`,
  put_set_admin: (id: any) =>
    `${BASE_NAME_LMS}/discussion-group/set-admin/${id}`,
  put_unset_admin: (id: any) =>
    `${BASE_NAME_LMS}/discussion-group/unset-admin/${id}`,
  put_delete_member: (id: any) =>
    `${BASE_NAME_LMS}/discussion-group/delete-member/${id}`,
  delete_leave_group: `${BASE_NAME_LMS}/discussion-group/leave-group`,
  get_unreads_group_message: `${BASE_NAME_LMS}/discussion-group/get-unreads`,
  get_count_exam: `${BASE_NAME_LMS}/count/exam/`,
  get_count_task: `${BASE_NAME_LMS}/task/count/`,
  get_dropdown_filter_recording_history: `${BASE_NAME_GURU}/murid/guru/sesi-kelas/rekaman/dropdown/filter`,
  get_absent_history: (offset: number, limit: number) =>
    `${BASE_NAME_LMS}/attendance/get-absent-history?offset=${offset}&limit=${limit}`,
  absent_history_detail: (absence_id: any) =>
    `${BASE_NAME_LMS}/attendance/absent-history-detail/${absence_id}`,
  get_attendance_history: `${BASE_NAME_LMS}/attendance/get-attendance-history`,
  post_teacher_task: `${BASE_NAME_LMS}/teacher/task/`,
  put_teacher_task: (task_teacher_id?: number) =>
    `${BASE_NAME_LMS}/teacher/task/${task_teacher_id}`,
  get_dropdown_curriculum_teacher: `${BASE_NAME_LMS}/teacher/task/dropdown/curriculum`,
  get_dropdown_class_teacher: `${BASE_NAME_LMS}/teacher/task/dropdown/class`,
  get_dropdown_task_type_teacher: `${BASE_NAME_LMS}/teacher/task/dropdown/task_type`,
  get_dropdown_task_chapter_teacher: (subject_id: number) =>
    `${BASE_NAME_LMS}/teacher/task/dropdown/chapter/${subject_id}`,
  get_dropdown_subject_matter_teacher: (curriculum_id: any, class_id: any) =>
    `${BASE_NAME_LMS}/teacher/subject/readall/${curriculum_id}/${class_id}`,
  post_request_absent: `${BASE_NAME_LMS}/attendance/request-absent`,
  post_create_class_session: `${BASE_NAME_LMS}/class-session/`,
  post_check_class_session: `${BASE_NAME_LMS}/class-session/check-available`,
  put_create_class_session: (classSessionId: any) =>
    `${BASE_NAME_LMS}/class-session/${classSessionId}`,
  post_start_attendance: `${BASE_NAME_LMS}/attendance/start-attendance`,
  put_finish_attendance: `${BASE_NAME_LMS}/attendance/finish-attendance`,
  get_task_detail: (id: any) =>
    `${BASE_NAME_LMS}/student/task/home/history/${id}`,
  get_record_detail: (id: any) => `${BASE_NAME_LMS}/class-session/${id}`,
  get_class_session_list: (
    page: number,
    limit: number,
    status: string,
    rombelClassId: number,
    subjectId: number,
    type: string,
    platform: string,
  ) =>
    `${BASE_NAME_LMS}/class-session?page=${page}&limit=${limit}&status=${status}&rombelClass=${rombelClassId}&subject=${subjectId}&type=${type}&platform=${platform}`,
  get_materials_type: `${BASE_NAME_LMS}/teacher/school-material/learning-method/all`,
  get_subject_by_curriculum_and_class: (curriculum_id: any, class_id: any) =>
    `${BASE_NAME_LMS}/teacher/subject/readall/${curriculum_id}/${class_id}`,
  get_class_by_degree: (id: any) =>
    `${BASE_NAME_MASTER}/class/find-by-degree/${id}`,
  post_teacher_subject: `${BASE_NAME_LMS}/teacher/subject`,
  start_meeting_session: `${BASE_NAME_LMS}/class-session/start`,
  teacher_leave_meeting: (class_session_id: any) =>
    `${BASE_NAME_LMS}/class-session/leave/${class_session_id}`,
  teacher_join_meeting: (class_session_id: any) =>
    `${BASE_NAME_LMS}/class-session/join/${class_session_id}`,
  teacher_cancel_meeting: (class_session_id: any) =>
    `${BASE_NAME_LMS}/class-session/cancel/${class_session_id}`,
  teacher_finish_meeting: `${BASE_NAME_LMS}/class-session/finish`,
  get_teacher_materials: (curriculum_id: number) =>
    `${BASE_NAME_LMS}/teacher/school-material/list/materibyclass/${curriculum_id}`,
  get_teacher_chapter: (id: any) => `${BASE_NAME_LMS}/teacher/chapter/${id}`,
  post_teacher_chapter: `${BASE_NAME_LMS}/teacher/chapter`,
  post_school_materials: `${BASE_NAME_LMS}/teacher/school-material`,
  get_presensi: `${BASE_NAME_LMS}/student-report/presence`,
  get_presensi_attend: `${BASE_NAME_LMS}/student-report/presence-detail`,
  get_presensi_absent: `${BASE_NAME_LMS}/student-report/absence`,
  get_report_task: `${BASE_NAME_LMS}/student-report/task`,
  get_report_exam: `${BASE_NAME_LMS}/student-report/exam`,
  get_report_akm: `${BASE_NAME_LMS}/student-report/akm`,
  get_mapel_by_class: (class_id: any) =>
    `${BASE_NAME_MASTER}/subject-by-class/${class_id}`,
  get_mapel_detail_materi: (id: number) => `${BASE_NAME_LPT}/report/${id}`,
  get_type_materi_sekolah: (id: number) =>
    `${BASE_NAME_LMS}/student-report/material/school/summary/${id}`,
  get_duration_summary: (id: number) =>
    `${BASE_NAME_LMS}/student-report/material/summary/duration/${id}`,
  get_report_subjects: (class_id: number, user_id: number) =>
    `${BASE_NAME_LPT}/report/class_id=${class_id}&user_id=${user_id}`,
  get_school_materials_subject: (subject_id: number) =>
    `${BASE_NAME_LMS}/student-report/material/school/summary/${subject_id}`,
  get_presensi_class_session: (subject_id: number, student_id: number) =>
    `${BASE_NAME_LMS}/student-report/class-session/presence/${subject_id}?studentId=${student_id}`,
  get_presensi_class_session_detail: (subject_id: number, student_id: number) =>
    `${BASE_NAME_LMS}/student-report/class-session/presence-detail/${subject_id}?studentId=${student_id}`,
  get_absent_class_session: (subject_id: number, student_id: number) =>
    `${BASE_NAME_LMS}/student-report/class-session/absence/${subject_id}?studentId=${student_id}`,
  post_exam_history: `${BASE_NAME_LMS}/student-report/exam/history`,
  post_task_history: `${BASE_NAME_LMS}/student/task/home/history`,
  post_task_schedule: `${BASE_NAME_LMS}/student/task/home/dijadwalkan`,
  get_exam_history: (question_package_id: any) =>
    `${BASE_NAME_LMS}/student-report/exam/history/${question_package_id}`,
  get_task_history: (id: any) =>
    `${BASE_NAME_LMS}/student/task/home/history/${id}`,
  get_list_bab: (id: any) => `${BASE_NAME_LMS}/teacher/chapter/${id}`,
  get_subject_material_study_report: (subject_id: number) =>
    `${BASE_NAME_LMS}/student-report/material/${subject_id}`,
  get_all_task_history_student: (student_id: number) =>
    `${BASE_NAME_LMS}/student-report/task/history?studentId=${student_id}`,
  get_task_history_student_detail: (task_id: number, student_id: number) =>
    `${BASE_NAME_LMS}/student-report/task/history/${task_id}?studentId=${student_id}`,
  get_task_history_student_detail_v2: (task_id: number, student_id: number) =>
    `${BASE_NAME_LMS}/student/task/home/history/${task_id}?user_id=${student_id}`,
  get_task_history_student_discussion: (task_id: number, student_id?: number) =>
    `${BASE_NAME_LMS}/student-report/task/history/discussion/${task_id}?studentId=${student_id}`,
  get_exam_detail: (id: number) =>
    `${BASE_NAME_LMS}/teacher/ujian/schedule/${id}`,
  batalkan_ujian: (examId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/schedule/${examId}`,
  add_soal_to_paket_soal: (packageId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/package/add/${packageId}`,
  create_soal_sendiri_ujian: (packageId: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/question/${packageId}`,
  get_ongoing_administrative_report: (school_id: number) =>
    `${BASE_NAME_LMS}/academic-year/get-ongoing/${school_id}`,
  get_all_administrative_report: (school_id: number) =>
    `${BASE_NAME_LMS}/academic-year/get-all/${school_id}`,
  get_administrative_report: `${BASE_NAME_LMS}/administration/summary-payment`,
  get_month_year: (id: number) =>
    `${BASE_NAME_LMS}/administration/generate-month-year?academic_year_id=${id}`,
  get_pancasila_project: `${BASE_NAME_PANCASILA}/project/send`,
  get_task_teacher_checked_detail: (id: number) =>
    `${BASE_NAME_LMS}/teacher/task/home/checked/${id}`,
  reminder_task_teacher_checked_detail: (id: number) =>
    `${BASE_NAME_LMS}/teacher/task/home/checked/reminder/${id}`,
  get_teacher_task_history: `${BASE_NAME_LMS}/teacher/task/home/histories`,
  get_dropdown_mapel_teacher: (id: number) =>
    `${BASE_NAME_LMS}/teacher/task/dropdown/subject/${id}`,
  get_teacher_task_history_detail: (id: number) =>
    `${BASE_NAME_LMS}/teacher/task/home/histories/${id}`,
  get_teacher_task_report_download: (id: number) =>
    `${BASE_NAME_LMS}/teacher/task/home/report/download/${id}`,
  get_teacher_ujian_report_download: (id: number, timeZoneOffset: string) =>
    `${BASE_NAME_LMS}/teacher/ujian/history/report/download/${id}?utc=${timeZoneOffset}`,
  get_teacher_task_history_show_detail: (id: number) =>
    `${BASE_NAME_LMS}/teacher/task/show/${id}`,
  get_all_teacher_task_question: `${BASE_NAME_LMS}/teacher/task/question/cek`,
  get_teacher_task_question: (id: any, number: number) =>
    `${BASE_NAME_LMS}/teacher/task/question/cek/${id}/${number}`,
  create_question_task: (task_teacher_id?: number) =>
    `${BASE_NAME_LMS}/teacher/task/question?task_teacher_id=${task_teacher_id}`,
  delete_question_task: (_id: any, uuid: number) =>
    `${BASE_NAME_LMS}/teacher/task/question/${_id}/${uuid}`,
  scoring_exam_student: (student_exam_id: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/scoring/${student_exam_id}`,
  end_scoring_exam_student: (student_exam_id: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/scoring/end/${student_exam_id}`,
  end_scoring_exam_single_student: (student_exam_id: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/scoring/${student_exam_id}/end/`,
  get_all_teacher_check_task: (id: number) =>
    `${BASE_NAME_LMS}/teacher/task/schedule/question/cek/${id}`,
  get_teacher_check_task: (
    task_student_id: number,
    _id: number,
    number: number,
  ) =>
    `${BASE_NAME_LMS}/teacher/task/question/checked/${task_student_id}/${_id}/${number}`,
  submit_finish_checked_task: `${BASE_NAME_LMS}/teacher/task/finish/correction`,
  narrate_task: (id_task: number) =>
    `${BASE_NAME_LMS}/teacher/task/home/checked/correction/finish/${id_task}`,
  get_finish_check_task: (id: number) =>
    `${BASE_NAME_LMS}/teacher/task/cek/finish/${id}`,
  get_student_report_class_session_rating: (student_id: number) =>
    `${BASE_NAME_LMS}/student-report/class-session/rating?studentId=${student_id}`,
  post_class_session_access_record: `${BASE_NAME_LMS}/class-session/access-record`,
  get_download_detail_kehadiran_report: (
    rombelClassSchoolId: any,
    semester?: any,
  ) =>
    `${BASE_NAME_LMS}/attendance/attendance-report/download/${rombelClassSchoolId}/${
      semester ?? 'Genap'
    }/offline`,
  get_check_exam_score: (student_exam_id: number) =>
    `${BASE_NAME_LMS}/teacher/ujian/scoring/${student_exam_id}/check_score/`,
  get_active_curriculum: `${BASE_NAME_LMS}/curriculumn/getactiveuser`,
  post_active_curriculum: `${BASE_NAME_LMS}/curriculumn/setactiveuser`,
  download_paket_soal: (id: number | string) =>
    `${BASE_NAME_LMS}/teacher/ujian/package/download/${id}`,

  // TANYA
  get_home_tanya: () => `${BASE_NAME_TANYA}/home`,
  get_history_tanya: (status: 'terjawab' | 'belum_dijawab' | 'tidak_sesuai') =>
    `${BASE_NAME_TANYA}/${status}`,
  get_detail_history_tanya: (tanya_id: any) =>
    `${BASE_NAME_TANYA}/detail/${tanya_id}`,
  get_lms_teacher_exams_schedule: `${BASE_NAME_LMS}/teacher/ujian/schedule`,
  get_rombel_class_list: `${BASE_NAME_LMS}/rombel-user/list-class`,
  get_teacher_class_subject: (classId: any) =>
    `${BASE_NAME_LMS}/teacher/subject/all/${classId}`,
  get_student_report_exam_detail: (exam_id: number, student_id: number) =>
    `${BASE_NAME_LMS}/student-report/exam/history/${exam_id}?studentId=${student_id}`,
  teacher_attendance_summary: `${BASE_NAME_LMS}/attendance/get-teacher-attendance-summary`,
  rombel_user: (userTypeId: any) =>
    `${BASE_NAME_LMS}/rombel-user/${userTypeId}`,
  rombel_class_list: (classId: number, schoolId: number) =>
    `${BASE_NAME_LMS}/rombel-class-school/list-class?class_id=${classId}&school_id=${schoolId}`,
  student_attendance_summary: `${BASE_NAME_LMS}/attendance/get-all-student-attendance-summary`,
  rombel_student_list: (rombelClassId: number, keyword: string) =>
    `${BASE_NAME_LMS}/rombel-user/1?rombelClassId=${rombelClassId}&search=${keyword}`,
  get_lks_detail: (rombelId: any, subjectId: any, chapterId: any) =>
    `${BASE_NAME_LMS}/student-report/lks/history/${rombelId}/${subjectId}/${chapterId}`,
  duplicate_task_teacher: (id_list: number) =>
    `${BASE_NAME_LMS}/teacher/task/duplicate/${id_list}`,
  remove_task_teacher: (task_teacher_id: number) =>
    `${BASE_NAME_LMS}/teacher/task/${task_teacher_id}`,
  post_bagikan_eraport: () =>
    `${BASE_NAME_LMS}/assessment/erapor/share/student`,
  // this might be put or post
  post_teacher_input_basic_competency: () =>
    `${BASE_NAME_LMS}/assessment/basiccompetency/`,
  get_teacher_basic_competency_list: ({
    school_id,
    academic_year_id,
    class_id,
    user_id,
  }: IReqBasicCompetencyList) =>
    `${BASE_NAME_LMS}/assessment/basiccompetency/listdetail/${school_id}/${academic_year_id}/${class_id}/${user_id}`,

  // GURU
  send_request_call: (
    service_type: ServiceType,
    academy_class_session_id: any,
  ) =>
    `${BASE_NAME_CHAT}/class_session/call/request/${service_type}/${academy_class_session_id}`,
  delete_call_request: (academi_class_session_id: number) =>
    `${BASE_NAME_CHAT}/class_session/call/batalkan/${
      academi_class_session_id || 0
    }`,
  check_request_call: (uuid: any) =>
    `${BASE_NAME_CHAT}/class_session/call/get/${uuid}`,
  get_live_class: (type: string, offset?: number, limit?: number) =>
    `${BASE_NAME_GURU}/murid/${type}/sesi-kelas/home?offset=${
      offset || 0
    }&limit=${limit || 10}`,
  get_live_class_detail: (type: ServiceType, id: number) =>
    `${BASE_NAME_GURU}/murid/${type}/sesi-kelas/${id}`,
  get_live_class_detail_from_LMS: (id: number) =>
    `${BASE_NAME_LMS}/class-session/${id}`,
  get_rekaman_class: (type: string, offset: number, limit: number) =>
    `${BASE_NAME_GURU}/murid/${type}/sesi-kelas/rekaman?offset=${offset}&limit=${limit}`,
  join_live_class_session: (
    service_type: ServiceType,
    academy_class_session_id: any,
  ) =>
    `${BASE_NAME_GURU}/murid/${service_type}/sesi-kelas/gabung/${academy_class_session_id}`,
  leave_live_class_session: (
    service_type: ServiceType,
    academy_class_session_id: any,
  ) =>
    `${BASE_NAME_GURU}/murid/${service_type}/sesi-kelas/finishlive/${academy_class_session_id}/finish`,
  get_record_session: (service_type: ServiceType) =>
    `${BASE_NAME_GURU}/murid/${service_type}/sesi-kelas/rekaman?offset=0&limit=10`,
  put_record_session_show: (record_id: number) =>
    `${BASE_NAME_GURU}/murid/guru/sesi-kelas/rekaman/show/${record_id}`,
  get_academic_year: (school_id: any) =>
    `${BASE_NAME_LMS}/academic-year/get-all/${school_id}`,
  get_rombel: `${BASE_NAME_LMS}/rombel-user/list-class`,
  get_assesment: (
    rombel_id: number,
    class_id: number,
    academic_year_id: number,
    school_id: number,
    academic_phase_id?: number,
  ) =>
    `${BASE_NAME_LMS}/assessment/erapor/share/assessment_setting/${rombel_id}/${class_id}/${academic_year_id}/${school_id}${
      academic_phase_id ? `/${academic_phase_id}` : ''
    }`,
  get_check_student_eraport: (
    murid_id: number,
    rombel_class_school_id: number,
    academic_year_id: number,
    school_id: number,
  ) =>
    `${BASE_NAME_LMS}/assessment/erapor/share/piliherapor/${murid_id}/${rombel_class_school_id}/${academic_year_id}/${school_id}`,
  get_sharelist_eraport: (
    rombel_id: number,
    academic_year_id: number,
    academic_phase_id: number,
    school_id: number,
    class_id: number,
  ) =>
    `${BASE_NAME_LMS}/assessment/erapor/share/${rombel_id}/${academic_year_id}/${academic_phase_id}/${school_id}/${class_id}`,
  get_history_sharelist_eraport: (
    rombel_id: number,
    academic_year_id: number,
    school_id: number,
    class_id: number,
  ) =>
    `${BASE_NAME_LMS}/assessment/erapor/share/riwayat/listgage/${rombel_id}/${academic_year_id}/${school_id}/${class_id}`,
  get_history_sharelist_student_eraport: (
    rombel_id: number,
    academic_year_id: number,
    academic_phase_id: number,
    school_id: number,
    class_id: number,
  ) =>
    `${BASE_NAME_LMS}/assessment/erapor/share/riwayat/listgage_murid/${rombel_id}/${academic_year_id}/${academic_phase_id}/${school_id}/${class_id}`,
  store_academic_year: `${BASE_NAME_LMS}/assessment/erapor/share/academic_year_setting`,
  store_issue_date: `${BASE_NAME_LMS}/assessment/erapor/share/date_issue_setting`,
  store_paper_size: `${BASE_NAME_LMS}/assessment/erapor/share/paper_setting`,
  start_pr_projek_tugas: (prProjeckTugasId: any) =>
    `${BASE_NAME_LMS}/student/task/show/${prProjeckTugasId}`,
  cek_pr_projek_tugas: (prProjekTugasId: any) =>
    `${BASE_NAME_LMS}/student/task/question/cek/${prProjekTugasId}`,
  get_single_task_pr_projek_tugas: (historyId: any, order: any) =>
    `${BASE_NAME_LMS}/student/task/question/show/${historyId}/${order}`,
  get_one_question_package: (
    question_package_id: any,
    order: any,
    student_exam_id: any,
  ) =>
    `${BASE_NAME_LMS}/teacher/ujian/question/navigation/${question_package_id}/${order}/${student_exam_id}`,
  give_essay_score: (student_exam_id: any, order: any) =>
    `${BASE_NAME_LMS}/teacher/ujian/scoring/${student_exam_id}/${order}`,
  get_student_detail: (student_id: number) =>
    `${BASE_NAME_LMS}/rombel-user/detail/${student_id}`,
  count_yearly_student_attendance: (student_id: number) =>
    `${BASE_NAME_LMS}/attendance/count-yearly-attendance/${student_id}`,
  detail_student_attendance: `${BASE_NAME_LMS}/attendance/student-attendance-report/`,
  detail_student_absent: `${BASE_NAME_LMS}/attendance/student-absent-report/`,
  get_report_live_class_summary_total: ({
    startRegistrasi,
    startTryout,
    module,
  }: any) =>
    `${BASE_NAME_GURU}/murid/ptn/report/summary-total?startRegistrasi=${startRegistrasi}&startTryout=${startTryout}&module=${module}`,
  get_report_live_class_graph: ({startRegistrasi, startTryout, module}: any) =>
    `${BASE_NAME_GURU}/murid/ptn/report/graph?startRegistrasi=${startRegistrasi}&startTryout=${startTryout}&module=${module}`,
  get_detail_rekaman_sesi_kelas: (service: 'ptn' | 'guru', id: number) =>
    `${BASE_NAME_GURU}/murid/${service}/sesi-kelas/rekaman/${id}`,
  get_teacher_exam_history: `${BASE_NAME_LMS}/teacher/ujian/history`,
  get_teacher_exam_history_v2: (from?: string, to?: string) =>
    `${BASE_NAME_LMS}/teacher/ujian/history${from ? `?from=${from}` : ''}${
      to ? `&to=${to}` : ''
    }`,
  get_teacher_exam_history_explanation: (id?: string) =>
    `${BASE_NAME_LMS}/teacher/ujian/history/explanation/${id}`,
  get_teacher_exam_history_detail: (id: number) =>
    `${BASE_NAME_LMS}/teacher/ujian/history/${id}`,
  get_analisis_butir_soal_preview: (id: number) =>
    `${BASE_NAME_LMS}/teacher/ujian/history/analysis-question/preview/${id}`,
  detail_school_materials: (id: number) =>
    `${BASE_NAME_LMS}/teacher/school-material/${id}`,

  // GLOBAL
  get_rombel_user: `${BASE_NAME_LMS}/rombel-user/list`,
  get_rombel_user_admin: (teacherId: number) =>
    `${BASE_NAME_LMS}/rombel-user/list?teacherId=${teacherId}`,
  get_list_subject: `${BASE_NAME_MASTER}/list-subject`,
  get_live_class_list_subject_ptn: `${BASE_NAME_MASTER}/ptn/list-mapel_by_module`,
  get_free_coin: `${BASE_NAME_UAA}/user/claim-daily-checkin`,
  get_question_type: `${BASE_NAME_LMS}/ujian/question-type`,
  get_list_chapter_by_subject: (subjectId: any) =>
    `${BASE_NAME_LMS}/chapter-with-packages-count/${subjectId}`,
  get_all_services: `${BASE_NAME_BACKOFFICE}/question/package/service?order_by=id&sort=asc&search=["service","=","'EXAM'"]`,
  get_question_level: `${BASE_NAME_BACKOFFICE}/question/level?limit=6&page=0&order_by=id&show_all=true&sort=asc&search=["name","!=","DELETE"]`,
  get_all_curriculum_teacher: `${BASE_NAME_MASTER}/curriculum`,
  get_chapter_list_by_subject: (subjectId: any) =>
    `${BASE_NAME_MASTER}/chapter-list-by-subject/${subjectId}`,
  get_chapter_list_by_subject2: (subjectId: any) =>
    `${BASE_NAME_MASTER}/chapter-list-all?subject=${subjectId}`,
  get_domicile: (key: any) => `${BASE_NAME_MASTER}/domicile?name=${key}`,
  get_rombel_class_school: (school_id: number) =>
    `${BASE_NAME_LMS}/rombel-class-school/list-class?class_id=0&school_id=${school_id}`,
  get_search_kpreg: (subjectId: number | string, words?: string) =>
    `/search/v1/global/kp-regular/${subjectId ?? 0}/?words=${words || ''}`,

  // SEARCH
  get_popular_search: `${BASE_NAME_SEARCH}/global/popular-search`,
  latest_search: `${BASE_NAME_SEARCH}/global/latest-search`,
  delete_latest_search_item: (latestSearchId: any) =>
    `${BASE_NAME_SEARCH}/global/latest-search/${latestSearchId}/`,
  delete_all_latest_search: `${BASE_NAME_SEARCH}/global/latest-search/all`,

  //SCHEDULE
  get_ptn_schedule_today: (date: any, type: any) =>
    `${BASE_NAME_SCHEDULE}/ptn/${date}?types=${type}`,

  //TRY OUT
  get_list_subject_progress: (id: any) =>
    `${BASE_NAME_TRYOUT}/list-subject-progress/${id}`,
  get_summary_tryout: `${BASE_NAME_TRYOUT}/dashboard/graph-tryout`,
  get_ranking_tryout: `${BASE_NAME_TRYOUT}/dashboard/leaderboard`,
  start_try_out_per_subject: `${BASE_NAME_TRYOUT}/start/subject`,
  tryout_per_question: (try_out_history_id: any, subject_id: any, order: any) =>
    `${BASE_NAME_TRYOUT}/list-question/${try_out_history_id}/${subject_id}/${order}`,
  answer_per_tryout_question: `${BASE_NAME_TRYOUT}/answer`,
  submit_tryout: `${BASE_NAME_TRYOUT}/submit`,
  get_explanation_tryout: (tryoutHistoryId: any, subjectId: any, status: any) =>
    `${BASE_NAME_TRYOUT}/history/discussion/${tryoutHistoryId}/${subjectId}?status=${status}`,
  get_report_list_tryout: `${BASE_NAME_TRYOUT}/report/list-tryout`,
  get_list_module: `${BASE_NAME_TRYOUT}/list-module`,
  get_report_passing_grade: ({tryoutId, type}: any) =>
    `${BASE_NAME_TRYOUT}/report/passing-grade?tryoutId=${tryoutId}&type=${type}`,
  get_report_graph_tryout: `${BASE_NAME_TRYOUT}/report/graph-tryout`,
  get_subject_report_graph_tryout: (module: any) =>
    `${BASE_NAME_TRYOUT}/report/graph-tryout/subject?module=${module}`,
  get_report_summary_point: ({tryoutId, module}: any) =>
    `${BASE_NAME_TRYOUT}/report/summary-point?tryoutId=${tryoutId}&module=${module}`,

  // PTN
  get_bank_soal_list_subject: `${BASE_NAME_PTN}/list-subject-progress`,
  get_bank_soal_list_question: (subject_id: any) =>
    `${BASE_NAME_PTN}/list-question/${subject_id}`,
  get_bank_soal_question_explanation: (
    question_id: number,
    question_option_id: number,
  ) => `${BASE_NAME_PTN}/check-correction/${question_id}/${question_option_id}`,
  post_bank_soal_start_practice: (subject_id: any) =>
    `${BASE_NAME_PTN}/start-practice/${subject_id}`,
  post_bank_soal_submit_practice: `${BASE_NAME_PTN}/submit-practice`,
  get_bank_soal_history_discussion: (
    practiceUserHistoryId: any,
    subject_id: any,
    status: any,
  ) =>
    `${BASE_NAME_PTN}/history/discussion/${practiceUserHistoryId}/${subject_id}?status=${status}`,
  //PTN LIVE CLASS
  post_ptn_record_session: (
    service_type: ServiceType,
    offset?: number,
    limit?: number,
  ) =>
    `${BASE_NAME_GURU}/murid/${service_type}/sesi-kelas/rekaman/home/riwayat?offset=${
      offset ?? 0
    }&limit=${limit ?? 20}`,
  get_ptn_subject_list: (module: PTNModule, feature: PTNFeature) =>
    `${BASE_NAME_MASTER}/ptn/list-subject/${module}/${feature}`,

  // PROJECT PANCASILA
  pancasila_get_list_status_proyek: () => `${BASE_NAME_PANCASILA}/project/send`,
  get_pancasila_daftar_proyek: (phaseId?: any, isRecommend?: any) =>
    `${BASE_NAME_PANCASILA}/project/list?phase=${phaseId || ''}&recommended=${
      isRecommend || ''
    }`,
  get_pancasila_list_phase: () => `${BASE_NAME_PANCASILA}/phase/`,
  get_pancasila_detail_proyek: (projectId: any) =>
    `${BASE_NAME_PANCASILA}/project/${projectId}`,
  get_pancasila_list_status: (
    phase?: any,
    recommended?: any,
    status?: any,
    page?: any,
    limit?: any,
  ) =>
    `${BASE_NAME_PANCASILA}/project/send?page=${page || 0}&limit=${
      limit || 10
    }&recommended=${recommended || ''}&phase=${phase || ''}&status=${status}`,
  post_pancasila_kirim_proyek: () => `${BASE_NAME_PANCASILA}/project/send`,
  put_pancasila_update_proyek: (send_id: string) =>
    `${BASE_NAME_PANCASILA}/project/send/${send_id}`,
  post_pancasila_kirim_rekomendasi_proyek: () =>
    `${BASE_NAME_PANCASILA}/project/recommendation`,
  put_pancasila_hapus_status_send_proyek: (projectId: any) =>
    `${BASE_NAME_PANCASILA}/project/send/status/${projectId}`,
  put_pancasila_edit_status_send_proyek: (projectId: any) =>
    `${BASE_NAME_PANCASILA}/project/send/${projectId}`,
  get_pancasila_list_notes: () => `${BASE_NAME_PANCASILA}/notes/`,
  delete_pancasila_list_notes: (idNotes?: number) =>
    `${BASE_NAME_PANCASILA}/notes/${idNotes}`,
  put_pancasila_notes: (idNotes?: number) =>
    `${BASE_NAME_PANCASILA}/notes/${idNotes}`,

  // SOAL & AKM - ADJUST
  get_detail_question: (package_history_id: any, order: any) =>
    `${BASE_NAME_SOAL}/question/navigation/${package_history_id}/${order}`,
  soal_akm_answer_single: `${BASE_NAME_SOAL}/submit`,
  store_question_to_review: (package_history_id: any, question_id: any) =>
    `${BASE_NAME_SOAL}/tag/${package_history_id}/${question_id}`,
  unstore_question_to_review: (package_history_id: any, question_id: any) =>
    `${BASE_NAME_SOAL}/untag/${package_history_id}/${question_id}`,
  get_review_question: (package_history_id: any) =>
    `${BASE_NAME_SOAL}/tinjau/${package_history_id}`,
  finish_test: (package_history_id: any) =>
    `${BASE_NAME_SOAL}/finish/${package_history_id}`,
  leave_test: (package_history_id: any) =>
    `${BASE_NAME_SOAL}/leave/${package_history_id}`,
  pause_test: (package_history_id: any) =>
    `${BASE_NAME_SOAL}/pause/${package_history_id}`,
  resume_test: (package_history_id: any) =>
    `${BASE_NAME_SOAL}/resume/${package_history_id}`,
  check_unfinished: (package_history_id: any) =>
    `${BASE_NAME_SOAL}/check-unfinished/${package_history_id}`,

  // DIAGNOSTIC TEST
  check_isregistered_test: `${BASE_NAME_DIAGNOSTIC_TEST}/check`,
  register_diagnostic_test: `${BASE_NAME_DIAGNOSTIC_TEST}/register`,
  get_diagnotic_test_question: `${BASE_NAME_DIAGNOSTIC_TEST}/questions`,
  submit_diagnostic_test: `${BASE_NAME_DIAGNOSTIC_TEST}/submit`,

  get_diagnotic_test_result: (user_id: any) =>
    `${BASE_NAME_DIAGNOSTIC_TEST}/result/${user_id}`,
  get_major_using_profession: `${BASE_NAME_MASTER}/profession-major`,
  get_save_university_recommendation: (major_id: any) =>
    `${BASE_NAME_DIAGNOSTIC_TEST}/university-recommendation/${major_id}`,
  get_save_batch_university_recommendation: (save: boolean) =>
    `${BASE_NAME_DIAGNOSTIC_TEST}/batch-university-recommendation?save=${save}`,
  set_profession: (profession_id: any) =>
    `${BASE_NAME_DIAGNOSTIC_TEST}/set-profession/${profession_id}`,
  get_user_university_majors: (user_id: any) =>
    `${BASE_NAME_DIAGNOSTIC_TEST}/user-university-major/${user_id}?type=personal`,
  get_user_university_majors_kp: (user_id: any) =>
    `${BASE_NAME_DIAGNOSTIC_TEST}/user-university-major/${user_id}?type=kp`,
  rate_diagnotic_test: `${BASE_NAME_DIAGNOSTIC_TEST}/submit-rating`,
  get_rating_diagnotic_test: `${BASE_NAME_DIAGNOSTIC_TEST}/get-rating`,
  post_diagnostic_match_university: `${BASE_NAME_DIAGNOSTIC_TEST}/match-major-university`,

  //Diagnotic Test - choose another major
  list_university_major: (major_id: any) =>
    `${BASE_NAME_MASTER}/university-major?major_id=${major_id}`,
  list_university: `${BASE_NAME_MASTER}/university`,
  set_user_personal_major: `${BASE_NAME_DIAGNOSTIC_TEST}/set-user-personal-major`,
  get_university_major_detail: (university_major_id: any) =>
    `${BASE_NAME_MASTER}/university-major/${university_major_id}`,
  search_university_major: `${BASE_NAME_MASTER}/university-major`,
  search_university_major_v2: (params: IReqSearchUniversityMajorV2) => {
    const qString = convertToQueryString(params, {toSnakeCase: true});
    return `${BASE_NAME_MASTER}/profession-major?${qString}`;
  },
  search_university: `${BASE_NAME_MASTER}/university`,
  search_university_v2: (params: IReqSearchUniversityV2) => {
    const qString = convertToQueryString(params, {toSnakeCase: true});
    return `${BASE_NAME_MASTER}/university?${qString}`;
  },
  get_result_university_major: `${BASE_NAME_MASTER}/university-major/multiple-by-ids`,

  //PURCHASE
  get_purchase_coin_history: (filter?: string) =>
    `${BASE_NAME_PURCHASE}/coin/history?${filter}`,
  get_purchase_list_class: (packageId: number) =>
    `${BASE_NAME_PURCHASE}/package/${packageId}/class`,
  get_package_detail: (id: number) =>
    `${BASE_NAME_PURCHASE}/package-category/${id}`,
  get_payment_method: () => `${BASE_NAME_PURCHASE}/payment-method/`,
  post_ios_payment_receipt: () =>
    `${BASE_NAME_PURCHASE}/inapp/ios/checkReceipt`,
  post_android_payment_check_receipt_subscription: () =>
    `${BASE_NAME_PURCHASE}/inapp/android/checkReceiptSubscription`,
  post_android_payment_check_receipt_purchase: () =>
    `${BASE_NAME_PURCHASE}/inapp/android/checkReceiptPurchase`,
  post_check_discount: () => `${BASE_NAME_PURCHASE}/discount/check`,
  get_package_coin_list: () => `${BASE_NAME_PURCHASE}/package-category/coin`,

  //CAMPAIGN
  post_campaign_tracker: () => `${BASE_NAME_CAMPAIGN}/campaign/tracker`,

  //IKM
  get_curiculums: () => `${BASE_NAME_MASTER}/curriculum`,
  post_set_active_curiculum: () => `${BASE_NAME_MASTER}/curriculum/active`,
  get_list_phase_class: () => `${BASE_NAME_MASTER}/class/?all=1`,
  set_active_phase_class: () => `${BASE_NAME_MASTER}/phase-curriculum/active`,
  post_finish_lkpd: `${BASE_NAME_LMS}/student/task/finish`,
  post_teacher_lkpd_schedule: `${BASE_NAME_LMS}/teacher/task/home/schedule`,
  post_teacher_lkpd_checked: `${BASE_NAME_LMS}/teacher/task/home/checked`,
  get_general_content: (flag: string) =>
    `${BASE_NAME_MASTER}/general-data/flag/${flag}?is_active=true`,
  get_capaian_pembelajaran_subject: (subjectId: number) =>
    `${BASE_NAME_MASTER}/learning_achievement/read_by_subject/${subjectId}?is_active=true`,
  post_alur_tujuan_pembelajaran: () =>
    `${BASE_NAME_MASTER}/learning_objective_flow`,
  put_alur_tujuan_pembelajaran: (id: number) =>
    `${BASE_NAME_MASTER}/learning_objective_flow/${id}`,
  get_alur_tujuan_pembelajaran_subject: (subjectId: number) =>
    `${BASE_NAME_MASTER}/learning_objective_flow/read_by_subject/${subjectId}?is_active=true`,
  get_modul_ajar_subject: (subjectId: number) =>
    `${BASE_NAME_MASTER}/teaching_module/read_by_subject/${subjectId}?is_active=true`,
  post_modul_ajar: () => `${BASE_NAME_MASTER}/teaching_module`,
  put_modul_ajar: (id: number) => `${BASE_NAME_MASTER}/teaching_module/${id}`,
  get_video_tutorial: (page: number, limit: number) =>
    `${BASE_NAME_MASTER}/video_tutorial?page=${page}&limit=${limit}&is_active=true`,
  get_worksheet_master: (isActive: boolean, pagination?: IBasePagination) => {
    const qString = convertToQueryString(
      {isActive, ...(pagination ?? defaultLimitOffset(0, undefined, 1))},
      {toSnakeCase: true},
    );
    return `${BASE_NAME_MASTER}/worksheet_master?${qString}`;
  },
  get_all_rombel_ikm: () => `${BASE_NAME_LMS}/rombel-user/list`,
  get_teacher_lkpd_history_show_detail: (id: number, task_student_id: number) =>
    `${BASE_NAME_LMS}/teacher/task/show/${id}?task_student_id=${task_student_id}`,
  get_all_subject: (data: IReqAllSubject) => {
    const qString = convertToQueryString(data, {toSnakeCase: true});
    return `${BASE_NAME_LMS}/subject/all?${qString}`;
  },

  //Tools
  get_mathml_to_latex: `${BASE_NAME_NODE_HELPER}/math/mathml-to-latex`,
  telegram_send_message: (botId: string, props: ITelegramSendMessage) => {
    const qString = convertToQueryString(props, {toSnakeCase: true});
    return `bot${botId}/sendMessage?${qString}`;
  },
};
