import {combineReducers} from 'redux';

import authenticationReducer from './authentication/reducer';
import loginReducer from './login/reducer';
import xpReducer from './getXp/reducer';
import coinReducer from './getCoin/reducer';
import imageReducer from './getImage/reducer';
import blogReducer from './blog/reducer';
import packageDetailReducer from './getPackageDetail/reducer';
import subjectsFavReducer from './subjectsFav/reducer';
import subjectsReducer from './subjects/reducer';
import rankReducer from './rank/reducer';
import tagsReducer from './tags/reducer';
import selectRoleReducer from './selectRole/reducer';
import listClassReducer from './getListClass/reducer';
import preRegisterReducer from './preRegister/reducer';
import checkPhoneNumberReducer from './checkPhoneNumber/reducer';
import BlogDReducer from './blogDetail/reducer';
import getActivityReducer from './getActivity/reducer';
import getPromoReducer from './getPromo/reducer';
import updateReadActivityReducer from './updateReadActivity/reducer';
import updateReadPromoReducer from './updateReadPromo/reducer';
import updateReadAllActivityReducer from './updateReadAllActivity/reducer';
import updateReadAllPromoReducer from './updateReadAllPromo/reducer';
import promoReducer from './promo/reducer';
import rewardReducer from './reward/reducer';
import resendVerifyOtpReducer from './resendVerifyOtp/reducer';
import verifyOtpReducer from './verifyOtp/reducer';
import specificSectionSearchReducer from './search/specificSectionSearch/reducer';
import catalogReducer from './getCatalog/reducer';
import detailPackageReducer from './getDetailPackage/reducer';
import getAllChildrenReducer from './getAllChildren/reducer';
import getHistoryCoinReducer from './getHistoryCoin/reducer';
import kpRegularSearchReducer from './search/kpRegular/reducer';
import changeNumberOTPReducer from './changeNumberOTP/reducer';
import changeNumberReducer from './changeNumber/reducer';
import scheduleByDateReducer from './scheduleByDate/reducer';
import announcementReducer from './announcement/reducer';
import schoolReducer from './school/reducer';
import getAllChapterReducer from './getAllChapter/reducer';
import changePasswordOTPReducer from './changePasswordOTP/reducer';
import forgetOtpReducer from './forgetOtp/reducer';
import verifyForgetReducer from './verifyForget/reducer';
import listActivityReducer from './getListActivity/reducer';
import purchaseReducer from './getPurchaseHistory/reducer';
import purchaseDetailReducer from './getPurchaseDetail/reducer';
import changePasswordReducer from './changePassword/reducer';
import removeVideoDownloadReducer from './removeVideoDownload/reducer';
import startDurationLearnReducer from './startDurationLearn/reducer';
import endDurationLearnReducer from './endDurationLearn/reducer';
import notesReducer from './notes/reducer';
import getSubjectsByUserClassReducer from './getSubjectsByUserClass/reducer';
import getSubjectsFavoriteReducer from './getSubjectsFavorite/reducer';
import updateSubjectsFavoriteReducer from './updateSubjectsFavorite/reducer';
import changeForgetPasswordReducer from './changeForgetPassword/reducer';
import getSubjectsByClassReducer from './getSubjectsByClass/reducer';
import videoReducer from './video/reducer';
import fileReducer from './getFile/reducer';
import getAllPracticeChapterReducer from './getAllPracticeChapter/reducer';
import getAllPracticeChapterQuestionReducer from './getAllPracticeChapterQuestion/reducer';
import getUserReducer from './getUser/reducer';
import getAllTestChapterReducer from './getAllTestChapter/reducer';
import getAllAkmReducer from './getAllAkm/reducer';
import getAllAkmTypePackageReducer from './getAllAkmTypePackage/reducer';
import saveVideoReducer from './saveVideo/reducer';
import deleteVideoReducer from './deleteVideo/reducer';
import essayPracticeReducer from './getEssayPractice/reducer';
import getSubjectsReportReducer from './getSubjectsReport/reducer';
import getUlanganHarianChapterReducer from './getUlanganHarianChapter/reducer';
import getUlanganHarianChapterPracticePackageReducer from './getUlanganHarianChapterPracticePackage/reducer';
import getUlanganHarianChapterTestPackageReducer from './getUlanganHarianChapterTestPackage/reducer';
import getSoalVideoReducer from './getSoalVideo/reducer';
import CheckTanyaReducer from './checkTanya/reducer';
import getUjianTengahSemesterPackageReducer from './getUjianTengahSemesterPackage/reducer';
import getUjianAkhirSemesterPackageReducer from './getUjianAkhirSemesterPackage/reducer';
import getUjianAkhirTahunPackageReducer from './getUjianAkhirTahunPackage/reducer';
import getUjianSekolahPackageReducer from './getUjianSekolahPackage/reducer';
import askReducer from './ask/reducer';
import getAllSessionClassReducer from './getAllSessionClass/reducer';
import historyTanyaReducer from './tanya/historyTanya/reducer';
import getTodayAttendanceReducer from './getTodayAttendance/reducer';
import getAllExamReducer from './getAllExam/reducer';
import getAllAdministrativeHistoryReducer from './getAdministrativeHistory/reducer';
import getAdministrativeHistoryDetailReducer from './getAdministrativeHistoryDetail/reducer';
import getPaymentAdministrativeCategoryReducer from './getPaymentAdministrativeCategory/reducer';
import getAllKuisChapterReducer from './getAllKuisChapter/reducer';
import getKuisPackagesReducer from './getKuisPackage/reducer';
import getKuisQuestionReducer from './getKuisQuestion/reducer';
import getLMSMateriSekolahReducer from './getLMSMateriSekolah/reducer';
import getLMSMateriSekolahBabReducer from './getLMSMateriSekolahBab/reducer';
import getLMSMateriSekolahMateriReducer from './getLMSMateriSekolahMateri/reducer';
import guruReducer from './getClassSession/reducer';
import classSessionReducer from './getClassSession/reducer';
import classSessionDetailReducer from './getClassSessionDetail/reducer';
import classSessionRekamanReducer from './getClassSessionRekaman/reducer';
import joinLiveClassSessionReducer from './guru/joinLiveClassSession/reducer';
import updateReadActivityConfirmReducer from './updateReadActivityConfirm/reducer';
import getCurriculumReducer from './getCurriculum/reducer';
import getDetailSessionClassReducer from './getDetailSessionClass/reducer';
import getRecordTaskDetailReducer from './getRecordTaskDetail/reducer';
import lmsPRProjekTugas from './lms/PRProjekTugas/reducer';
import guruPRProjekTugas from './guru/PRProjekTugas/reducer';
import getLMSListUjianReducer from './lms/getLMSListUjian/reducer';
import updateMapelFilter from '@components/pages/LMSUjian/reducer';
import freeCoinReducer from './getFreeCoin/reducer';
import presensiReducer from './getPresensi/reducer';
import taskReducer from './getTaskReport/reducer';
import examReducer from './getExamReport/reducer';
import AKMReducer from './getAKMReport/reducer';
import mapelReducer from './getMapelReport/reducer';
import presensiAttendReducer from './getPresensiAttend/reducer';
import presensiAbsentReducer from './getPresensiAbsent/reducer';
import mapelDetailMateriReducer from './getMapelDetailMateri/reducer';
import getMaterialTypesReducer from './getMaterialsType/reducer';
import getSubjectByCurriculumAndClassReducer from './getSubjectsByCurriculumAndClass/reducer';
import getClassByDegreeReducer from './getClassByDegree/reducer';
import lmsTeacherStartMeetingReducer from './lms/startMeeting/reducer';
import lmsTeacherJoinMeetingReducer from './lms/teacherJoinMeeting/reducer';
import getTeacherMaterialsReducer from './getTeacherMaterials/reducer';
import getTeacherChapterReducer from './getTeacherChapter/reducer';
import typeMateriReducer from './getTypeMateri/reducer';
import durationSummaryReducer from './getDurationSummary/reducer';
import academicYearReducer from './getAcademicYear/reducer';
import mapelExamValueReducer from './getMapelExamValue/reducer';
import rombelReducer from './getRombelList/reducer';
import getAllExamHistoryReducer from './getAllExamHistory/reducer';
import getAllExamHistoryParentReducer from './getAllExamHistoryParent/reducer';
import assesmentSetReducer from './getAssesmentSettings/reducer';
import eraportShareListReducer from './getShareListEraport/reducer';
import eraportDetailReducer from './getDetailEraport/reducer';
import storeAcademicYearReducer from './storeAcademicYear/reducer';
import storeIssueDateReducer from './storeIssueDate/reducer';
import getAllTaskHistoryReducer from './getAllTaskHistory/reducer';
import examDetailReducer from './getExamDetail/reducer';
import getTeacherAttendanceReducer from './teacherAttendanceSummary/reducer';
import getRombelUserListReducer from './rombelUserList/reducer';
import getPancasilaProjectReducer from './getPancasilaProject/reducer';
import getRombelClassListReducer from './rombelClassList/reducer';
import getStudentAttendanceReducer from './studentAttendanceSummary/reducer';
import getStudentInRombelReducer from './studentInRombel/reducer';
import getStudentsOnlineAttendanceSummaryReducer from './getStudentsOnlineAttendanceSummary/reducer';
import getStudentsOfflineAttendanceSummaryReducer from './getStudentsOfflineAttendanceSummary/reducer';
import getTeacherClassesInfoReducer from './getTeacherClassesInfo/reducer';
import getOfflineClassAttendanceDetailReducer from './getOfflineClassAttendanceDetail/reducer';
import academicYearOngoingReducer from './getAcademicYearOngoing/reducer';
import getRaporHistoryListReducer from './raportHistoryList/reducer';
import getRaporPreviewReducer from './raportPreview/reducer';
import getRombelWithStudentRequestsReducer from './getRombelWithStudentRequests/reducer';
import startSoalOrAkmReducer from './startSoalOrAkm/reducer';
import getStudentsAbsentRequestHistoryReducer from './getStudentsAbsentRequestHistory/reducer';
import getTaskTeacherDetailReducer from './getTaskTeacherDetail/reducer';
import getPRProjectHistoryReducer from './getPRProjectHistory/reducer';
import PTNScheduleReducer from './PTNScheduleToday/reducer';
import summaryTryoutReducer from './summaryTryOutResult/reducer';
import leaderboardTryoutReducer from './leaderboardTryout/reducer';
import putAcceptAbsentRequestReducer from './putAcceptAbsentRequest/reducer';
import scoringExamReducer from './ScoringExamStudent/reducer';
import putIgnoreAbsentRequestReducer from './putIgnoreAbsentRequest/reducer';
import PancasilaNotesReducer from './PancasilaNotes/reducer';
import getStudentOnlineAttendanceDetailReducer from './getStudentOnlineAttendanceDetail/reducer';
import getDomicileReducer from './getDomicile/reducer';
import checkDiagnosticReducer from './checkDiagnosticTest/reducer';
import registerDiagnosticReducer from './registerDiagnostic/reducer';
import diagnoticResultReducer from './diagnoticResult/reducer';
import checkOneQuestionReducer from './getOneQuestion/reducer';
import sendEssayScoreReducer from './giveEssayScore/reducer';
import studentDetailReducer from './getStudentDetail/reducer';
import studentYearlyAttendanceReducer from './getCountStudentAttendance/reducer';
import getDetailAttendanceReducer from './getDetailStudentAttendance/reducer';
import getDetailAbsentReducer from './getDetailStudentAbsent/reducer';
import getExplanationTryoutReducer from './getExplanationTryOut/reducer';
import getScheduleClassSessionReducer from './getScheduleClassSession/reducer';
import getAllCoachmarkReducer from './coachMark/reducer';
import getRecordFilterReducer from './getRekamanFilter/reducer';
import getCountTaskReducer from './getCountTask/reducer';
import getCountExamReducer from './getCountExam/reducer';
import getStudentsAttendanceCalendarReducer from './getStudentAttendanceCalendar/reducer';
import virtualMeetingStateReducer from './virtualMeetingState/reducer';
import listUserRapatVirtualReducer from './getListUserRapatVirtual/reducer';
import getExamHistoryReducer from './getExamHistory/reducer';
import getLoadingReducer from './getLoading/reducer';
import ptn from './ptn/reducer';
import getMiniGameListReducer from './getMiniGamesList/reducer';
import saveAnswerReducer from './saveAnswer/reducer';

const rootReducer = combineReducers({
  virtualMeetingListUser: listUserRapatVirtualReducer,
  virtualMeetingState: virtualMeetingStateReducer,
  authentication: authenticationReducer,
  login: loginReducer,
  xp: xpReducer,
  coin: coinReducer,
  image: imageReducer,
  blog: blogReducer,
  packageDetail: packageDetailReducer,
  subjectsFav: subjectsFavReducer,
  rank: rankReducer,
  reward: rewardReducer,
  tags: tagsReducer,
  listRole: selectRoleReducer,
  listClass: listClassReducer,
  listActivity: listActivityReducer,
  checkPhoneNumber: checkPhoneNumberReducer,
  preRegister: preRegisterReducer,
  blogDetail: BlogDReducer,
  getActivity: getActivityReducer,
  getPromo: getPromoReducer,
  getTodayAttendance: getTodayAttendanceReducer,
  getStudentsOfflineAttendanceSummary:
    getStudentsOfflineAttendanceSummaryReducer,
  essayPractice: essayPracticeReducer,
  putAcceptAbsentRequest: putAcceptAbsentRequestReducer,
  putIgnoreAbsentRequest: putIgnoreAbsentRequestReducer,
  updateReadActivity: updateReadActivityReducer,
  getStudentOnlineAttendanceDetail: getStudentOnlineAttendanceDetailReducer,
  updateReadAllActivity: updateReadAllActivityReducer,
  updateReadPromo: updateReadPromoReducer,
  updateReadAllPromo: updateReadAllPromoReducer,
  promo: promoReducer,
  verifyOtp: verifyOtpReducer,
  startSoalOrAkm: startSoalOrAkmReducer,
  resendVerifyOtp: resendVerifyOtpReducer,
  removeVideoDownload: removeVideoDownloadReducer,
  getStudentsAbsentRequestHistory: getStudentsAbsentRequestHistoryReducer,
  specificSearch: specificSectionSearchReducer,
  getStudentsOnlineAttendanceSummary: getStudentsOnlineAttendanceSummaryReducer,
  catalog: catalogReducer,
  detailPackage: detailPackageReducer,
  subjectsAll: subjectsReducer,
  getAllChildren: getAllChildrenReducer,
  getUser: getUserReducer,
  historyCoin: getHistoryCoinReducer,
  changeNumberOTP: changeNumberOTPReducer,
  getTeacherClassesInfo: getTeacherClassesInfoReducer,
  getOfflineClassAttendanceDetail: getOfflineClassAttendanceDetailReducer,
  changeNumber: changeNumberReducer,
  getStudentsAttendanceCalendar: getStudentsAttendanceCalendarReducer,
  scheduleByDate: scheduleByDateReducer,
  announcement: announcementReducer,
  school: schoolReducer,
  getAllChapter: getAllChapterReducer,
  changePasswordOTP: changePasswordOTPReducer,
  changePassword: changePasswordReducer,
  forgetOtp: forgetOtpReducer,
  verifyForget: verifyForgetReducer,
  kpRegularSearch: kpRegularSearchReducer,
  notes: notesReducer,
  purchaseHistory: purchaseReducer,
  purchaseDetail: purchaseDetailReducer,
  startDurationLearn: startDurationLearnReducer,
  endDurationLearn: endDurationLearnReducer,
  getSubjectsByClass: getSubjectsByClassReducer,
  video: videoReducer,
  file: fileReducer,
  getSubjectsByUserClass: getSubjectsByUserClassReducer,
  getSubjectsFavorite: getSubjectsFavoriteReducer,
  changeForgetPassword: changeForgetPasswordReducer,
  updateSubjectsFavorite: updateSubjectsFavoriteReducer,
  getAllPracticeChapter: getAllPracticeChapterReducer,
  getAllPracticeChapterQuestion: getAllPracticeChapterQuestionReducer,
  getAllTestChapter: getAllTestChapterReducer,
  getAllAkm: getAllAkmReducer,
  getAllAkmTypePackage: getAllAkmTypePackageReducer,
  subjectReport: getSubjectsReportReducer,
  getUlanganHarianChapter: getUlanganHarianChapterReducer,
  getUlanganHarianChapterPracticePackage:
    getUlanganHarianChapterPracticePackageReducer,
  getUlanganHarianChapterTestPackage: getUlanganHarianChapterTestPackageReducer,
  saveVideo: saveVideoReducer,
  deleteVideo: deleteVideoReducer,
  getSoalVideo: getSoalVideoReducer,
  cekTanya: CheckTanyaReducer,
  getUjianTengahSemesterPackage: getUjianTengahSemesterPackageReducer,
  getUjianAkhirSemesterPackage: getUjianAkhirSemesterPackageReducer,
  getUjianAkhirTahunPackage: getUjianAkhirTahunPackageReducer,
  getUjianSekolahPackage: getUjianSekolahPackageReducer,
  ask: askReducer,
  getRombelWithStudentRequests: getRombelWithStudentRequestsReducer,
  getAllSessionClass: getAllSessionClassReducer,
  historyTanya: historyTanyaReducer,
  getAllExam: getAllExamReducer,
  getAllAdministrativeHistory: getAllAdministrativeHistoryReducer,
  getAdministrativeHistoryDetail: getAdministrativeHistoryDetailReducer,
  getPaymentAdministrativeCategory: getPaymentAdministrativeCategoryReducer,
  getAllKuisChapter: getAllKuisChapterReducer,
  getKuisQuestion: getKuisQuestionReducer,
  getKuisPackages: getKuisPackagesReducer,
  getLMSMateriSekolah: getLMSMateriSekolahReducer,
  getLMSMateriSekolahBab: getLMSMateriSekolahBabReducer,
  getLMSMateriSekolahMateri: getLMSMateriSekolahMateriReducer,
  getClassSession: guruReducer,
  classSession: classSessionReducer,
  classSessionRekaman: classSessionRekamanReducer,
  classSessionDetail: classSessionDetailReducer,
  joinLiveClassSession: joinLiveClassSessionReducer,
  updateReadActivityConfirm: updateReadActivityConfirmReducer,
  curriculum: getCurriculumReducer,
  getDetailSessionClass: getDetailSessionClassReducer,
  getRecordTaskDetail: getRecordTaskDetailReducer,
  lmsPRProjekTugas,
  guruPRProjekTugas,
  getLMSListUjian: getLMSListUjianReducer,
  updateMapelFilter: updateMapelFilter,
  freeCoin: freeCoinReducer,
  presensi: presensiReducer,
  task: taskReducer,
  exam: examReducer,
  akm: AKMReducer,
  mapel: mapelReducer,
  presensiAttend: presensiAttendReducer,
  presensiAbsent: presensiAbsentReducer,
  mapelMateri: mapelDetailMateriReducer,
  getMaterialTypes: getMaterialTypesReducer,
  getSubjectByCurriculumAndClass: getSubjectByCurriculumAndClassReducer,
  getClassByDegree: getClassByDegreeReducer,
  lmsTeacherStartMeeting: lmsTeacherStartMeetingReducer,
  lmsTeacherJoinMeeting: lmsTeacherJoinMeetingReducer,
  getTeacherMaterials: getTeacherMaterialsReducer,
  getTeacherChapter: getTeacherChapterReducer,
  typeMateri: typeMateriReducer,
  durationSummary: durationSummaryReducer,
  academicYear: academicYearReducer,
  getMapelExamValue: mapelExamValueReducer,
  rombelList: rombelReducer,
  getExamHistory: getAllExamHistoryReducer,
  getExamHistoryParent: getAllExamHistoryParentReducer,
  assesmentSettings: assesmentSetReducer,
  eraportShareList: eraportShareListReducer,
  eraportDetail: eraportDetailReducer,
  storeAcademicYear: storeAcademicYearReducer,
  storeIssueDate: storeIssueDateReducer,
  getTaskHistory: getAllTaskHistoryReducer,
  examDetail: examDetailReducer,
  getTeacherAttendance: getTeacherAttendanceReducer,
  rombelUserList: getRombelUserListReducer,
  getPancasilaProject: getPancasilaProjectReducer,
  getRombelClassList: getRombelClassListReducer,
  getStudentAttendance: getStudentAttendanceReducer,
  getStudentInRombel: getStudentInRombelReducer,
  academicYearOngoing: academicYearOngoingReducer,
  raporHistoryList: getRaporHistoryListReducer,
  raporPreview: getRaporPreviewReducer,
  getTaskTeacherDetail: getTaskTeacherDetailReducer,
  getPRProjectHistory: getPRProjectHistoryReducer,
  ptnSchedule: PTNScheduleReducer,
  summaryTryout: summaryTryoutReducer,
  leaderboardTryout: leaderboardTryoutReducer,
  scoringExam: scoringExamReducer,
  pancasilaNotes: PancasilaNotesReducer,
  domicile: getDomicileReducer,
  checkDiagnostic: checkDiagnosticReducer,
  registerDiagnostic: registerDiagnosticReducer,
  diagnoticResult: diagnoticResultReducer,
  checkOneQuestion: checkOneQuestionReducer,
  resEssayScoreSended: sendEssayScoreReducer,
  studentDetail: studentDetailReducer,
  studentYearlyAttendance: studentYearlyAttendanceReducer,
  getDetailAttendance: getDetailAttendanceReducer,
  getDetailAbsent: getDetailAbsentReducer,
  getExplanationTryout: getExplanationTryoutReducer,
  getScheduleClassSession: getScheduleClassSessionReducer,
  coachmark: getAllCoachmarkReducer,
  getRecordFilter: getRecordFilterReducer,
  getCountTask: getCountTaskReducer,
  getCountExam: getCountExamReducer,
  getTeacherExamHistory: getExamHistoryReducer,
  getLoading: getLoadingReducer,
  ptn,
  miniGameList: getMiniGameListReducer,
  saveAnswer: saveAnswerReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
