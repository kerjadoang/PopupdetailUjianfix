import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  AutentikasiScreen,
  ChangeNumberScreen,
  ClassScreen,
  DailyCheckInScreen,
  InputPasswordScreen,
  LoginOTPScreen,
  LoginScreen,
  OnboardingScreen,
  PersonalDataScreen,
  ChapterKPRegularScreen,
  SelectRoleScreen,
  SplashScreen,
  SuccessRegisterScreen,
  VerificationScreen,
  LeaderboardScreen,
  CreateScheduleScreen,
  PromoDetailScreen,
  CartHistoryScreen,
  PusatBantuanScreen,
  HomeCoinScreen,
  EditPasswordScreen,
  ForgotPasswordScreen,
  LoginEditProfile,
  ScheduleScreen,
  KPRegularLaporanScreen,
  KPRegularLaporanDetailScreen,
  KPRegularHistoryScoreScreen,
  VideoAnimationScreen,
  CartHistoryDetailScreen,
  MiniGameScreen,
  AnnouncementDetailScreen,
  DetailAnakScreen,
  ThinkNShareScreen,
  ExplanationScreen,
  HotsScreen,
  ResultScreen,
  QuestionScreen,
  LMSReportScreen,
  QuestionDetailScreen,
  AKMLaporanScreen,
  PracticeSoalReportScreen,
  PracticeSoalReportDetailScreen,
  HistoryTestAndExamScreen,
  QuestionBabScreen,
  AskScreen,
  AdministrativeScreen,
  LMSUjian,
  AskCameraScreen,
  AskPreviewPhotoScreen,
  GuruScreen,
  ClassSessionDetailScreen,
  HistoryAndRecordsScreen,
  GuruPencarianScreen,
  LMSTeacherLaporanKehadiranMuridScreen,
  RecordClassSessionScreen,
  LMSPRTugasScreen,
  ReportScreen,
  ListBabScreen,
  SortBabScreen,
  ListMaterialScreen,
  SortMaterialScreen,
  ManageSchoolMaterials,
  AddSchoolMaterials,
  ListSubjectSchoolMaterialsScreen,
  ERaportGuruScreen,
  HistoryTestScreen,
  ListChapterSchoolMaterialsScreen,
  InputScoreKKMScreen,
  ERaportGuruAssesmentScreen,
  ERaportGuruChooseClassScreen,
  StudyReportStudentScreen,
  StudentHistoryExamScreen,
  StudentHistoryTaskScreen,
  ExamDetailGuruScreen,
  LMSTeacherTaskScreen,
  LMSTeacherTaskCreateScreen,
  AnnouncementManageScreen,
  AnnouncementManageHistoryScreen,
  AnnouncementManageCreateScreen,
  ClassReportScreen,
  ChapterLMSScreen,
  InputScoreStudentScreen,
  ChapterSOALScreen,
  AdministrativeReportScreen,
  PancasilaProjectScreen,
  InputDetailKDScreen,
  InputDetailKDReportScreen,
  HistoryTaskScreen,
  DetailTaskScreen,
  TaskDetailTeacherScreen,
  PRProjectTaskHistoryScreen,
  ClassSessionDetailGURUScreen,
  CreateQuestionTaskScreen,
  HistoryExamScreenTeacher,
  DetailTaskScreenTeacher,
  RapatVirtualTeacherScreen,
  DetailTeacherScreen,
  ReportDetailAbsentTeacherScreen,
  DetailReportStudentScreen,
  CheckPRPRojectTeacherScreen,
  ListScheduleScreen,
  ListScheduleHistoryScreen,
  TryOutScreen,
  RemoveAccountScreen,
  TryOutSubjectScreen,
  DiagnoticTestScreen,
  DiagnoticTestResultScreen,
  DiagnoticRecommendationScreen,
  ChapterAKMScreen,
  DiagnoticProfessionScreen,
  DiagnoticCheckOpportunityScreen,
  DiagnoticSearchScreen,
  DiagnoticDescriptionScreen,
  StudentAttendanceReportScreen,
  StudentAbsentReportScreen,
  LearningReportStudentOnParentScreen,
  LMSOnParentScreen,
  ReportOnParentScreen,
  ProjectPancasilaScreen,
  PancasilaAllStatusProyekScreen,
  PancasilaKirimProyekScreen,
  ExplanationTryOutScreen,
  PTNReportScreen,
  HistoryShareEraporScreen,
  DetailEraporScreen,
  RapatVirtualCreateScreen,
  RapatVirtualListParticipantsScreen,
  SchedulePTNScreen,
  NewEbookScreen,
  VerificationRegisterScreen,
  WebViewScreen,
  PackageCoinScreen,
  UjianExplanationScreen,
  TestScreen,
} from '@components/pages';
import TeacherAbsenceApplicationScreen from '@components/pages/TeacherAbsenceApplicationScreen';
import TeacherAbsenceHistoryDetailScreen from '@components/pages/TeacherAbsenceHistoryDetailScreen';
import TeacherAbsenceHistoryScreen from '@components/pages/TeacherAbsenceHistoryScreen';
import StudentAbsenceApplicationScreen from '@components/pages/StudentAbsenceApplicationScreen';
import StudentAbsenceHistoryDetailScreen from '@components/pages/StudentAbsenceHistoryDetailScreen';
import StudentAbsenceHistoryScreen from '@components/pages/StudentAbsenceHistoryScreen';
import StudentAbsenceListRombelScreen from '@components/pages/StudentAbsenceListRombelScreen';
import LearningObjectiveScreen from '@components/pages/LearningObjectiveScreen';

import GlobalSearch from '@components/pages/GlobalSearchScreen';
import BlogScreen from '@components/pages/BlogScreen';
import BlogDetailScreen from '@components/pages/BlogDetailScreen';
import ProfileEditScreen from '@components/pages/ProfileEditScreen';
import PackageScreen from '@components/pages/PackageScreen';

import VideoDownloadScreen from '@components/pages/VideoDownloadScreen';
import MyActivityScreen from '@components/pages/MyActivityScreen';
import SavedVideoScreen from '@components/pages/SavedVideoScreen';
import LinkAccountScreen from '@components/pages/LinkAccountScreen';
import KPRegularDetailBab from '@components/pages/KPRegularDetailBab';
import VideoPresentationScreen from '@components/pages/VideoPresentationScreen';
import NotesScreen from '@components/pages/NotesScreen';
import ConceptScreen from '@components/pages/ConceptScreen';
import EbookScreen from '@components/pages/EbookScreen';
import EssayScreen from '@components/pages/EssayScreen';
import MultipleChoiceQuestionScreen from '@components/pages/MultipleChoiceQuestionScreen';
import HistoryTanyaScreen from '@components/pages/HistoryTanyaScreen';
import DetailHistoryTanyaScreen from '@components/pages/DetailHistoryTanyaScreen';
import MeetingLiveSessionScreen from '@components/pages/MeetingLiveSessionScreen';
import MeetingLiveSessionV2Screen from '@components/pages/MeetingLiveSessionV2Screen';
import MeetingLiveSessionChatScreen from '@components/pages/MeetingLiveSessionChatScreen';
import AttendancePresensiHistoryScreen from '@components/pages/AttendancePresensiHistoryScreen';
import AttendanceApprovalFormScreen from '@components/pages/AttendanceAprovalFormScreen';
import LMSTeacherFormClassSessionScreen from '@components/pages/LMSTeacherFormClassSessionScreen';
import AttendanceAprovalListHistoryScreen from '@components/pages/AttendanceAprovalListHistoryScreen';
import AttendanceApprovalDetailHistoryScreen from '@components/pages/AttendanceApprovalDetailHistoryScreen';
import ViewAttachmentScreen from '@components/pages/ViewAttachmentScreen';
import MultipleQuestionTypeScreen from '@components/pages/MultipleQuestionTypeScreen';
import LMSTeacherClassSessionScreen from '@components/pages/LMSTeacherClassSessionScreen';
import LMSTeacherMeetingLiveSessionScreen from '@components/pages/LMSTeacherMeetingLiveSessionScreen';
import LMSMuridUjianScreen from '@components/pages/LMSMuridUjianScreen';
import LMSTeacherDetailClassSessionScreen from '@components/pages/LMSTeacherDetailClassSessionScreen';
import UjainScreen from '@components/pages/UjianScreen';
import PaketSoalSubjectListScreen from '@components/pages/UjianScreen/PaketSoalSubjectListScreen';
import PaketSoalChapterListScreen from '@components/pages/UjianScreen/PaketSoalChapterListScreen';
import PaketSoalListScreen from '@components/pages/UjianScreen/PaketSoalListScreen';
import LMSTeacherHistoryClassSessionScreen from '@components/pages/LMSTeacherHistoryClassSessionScreen';
import CartScreen from '@components/pages/CartScreen';
import HistoryExamScreen from '@components/pages/HistoryExamScreen';
import HistoryTugasScreen from '@components/pages/HistoryTugasScreen';
import AttendanceScreen from '@components/pages/AttendanceScreen';
import DiscussionCreateGroupScreen from '@components/pages/DiscussionCreateGroupScreen';
import DiscussionGrupSearchMemberScreen from '@components/pages/DiscussionGrupSearchMemberScreen';
import DiscussionGrupMessageScreen from '@components/pages/DiscussionGrupMessageScreen';
import DiscussionGrupDetailScreen from '@components/pages/DiscussionGrupDetailScreen';
import DiscussionGrupScreen from '@components/pages/DiscussionGrupScreen';
import PengajuanKetidakHadiranScreen from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/components/PengajuanKetidakHadiranScreen';
import DetailKehadiranScreen from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/components/DetailKehadiranScreen';
import KetidakhadiranScreen from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/components/KetidakhadiranScreen';
import RiwayatKetidakhadiranScreen from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/components/RiwayatKetidakhadiranScreen';
import LembarKehadiranScreen from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/components/LembarKehadiranScreen';
import ReportViewScreen from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/components/ReportViewScreen';
import TanggalKehadiranScreen from '@components/pages/LMSTeacherLaporanKehadiranMuridScreen/components/TanggalKehadiranScreen';
import DetailPaketSoalListScreen from '@components/pages/UjianScreen/DetailPaketSoalListScreen';
import ViewPhotoScreen from '@components/pages/ViewPhotoScreen';
import CreateSoalSendiriScreen from '@components/pages/UjianScreen/CreateSoalSendiriScreen';
import DetailSoalScreen from '@components/pages/UjianScreen/DetailSoalScreen';
import {ChooseClassScreen} from '@components/pages/ChooseClassScreen';
import DiscussionGrupAddMemberScreen from '@components/pages/DiscussionGrupAddMemberScreen';
import LMSTeacherFormErrorClassSessionScreen from '@components/pages/LMSTeacherFormErrorClassSessionScreen';
import BankSoalScreen from '@components/pages/UjianScreen/BankSoalScreen';
import SelectSoalToAddToPaketSoalScreen from '@components/pages/UjianScreen/SelectSoalToAddToPaketSoalScreen';
import LMSUjianTestCameraScreen from '@components/pages/LMSUjian/LMSUjianTestCameraScreen';
import RapatVirtualTestCamerascreen from '@components/pages/RapatVirtualTeacherScreen/screen/RapatVirtualTestCamerascreen';
import {RapatVirtualDetailScreen} from '@components/pages/RapatVirtualDetailScreen';
import JitsiScreen from '@components/pages/RapatVirtualTeacherScreen/screen/JitsiScreen';
import {ReportAbsentTeacherScreen} from '@components/pages/ReportAbsentTeacherScreen';
import PancasilaNotesScreen from '@components/pages/PancasilaNotesScreen';
import {DetailSessionClassScreen} from '@components/pages/DetailSessionClassScreen.tsx';
import {RemoveAccountGoodByeScreen} from '@components/pages/RemoveAccountScreen/components/RemoveAccountGoodByeScreen';
import {RemoveAccountOTPScreen} from '@components/pages/RemoveAccountScreen/components/RemoveAccountOTPScreen';
import {PTNScreen} from '@components/pages/PTNScreen';
import {MenuRaporPreviewScreen} from '@components/pages/MenuRaporPreviewScreen';
import {MenuRaporScreen} from '@components/pages/MenuRaporScreen';
import {MenuRaporByClassScreen} from '@components/pages/MenuRaporByClassScreen';
import {MonitoringExamGuruScreen} from '@components/pages/MonitoringExamGuruScreen';
import {TeacherListMenuScreen} from '@components/pages/TeacherListMenuScreen';
import {StudentListMenuScreen} from '@components/pages/StudentListMenuScreen';
import {TeacherCheckExamScreen} from '@components/pages/TeacherCheckExamScreen';
import {FormDiagnosticTestScreen} from '@components/pages/FormDiagnosticTestScreen';
import {PTNBankSoalScreen} from '@components/pages/PTNBankSoalScreen';
import {PTNLiveClassHomeScreen} from '@components/pages/PTNLiveClassHomeScreen';
import {PTNLiveClassRecordScreen} from '@components/pages/PTNLiveClassRecordScreen';
import {TryOutDetailHistoryScreen} from '@components/pages/TryOutDetailHistoryScreen';
import {AdminListVerificationScreen} from '@components/pages/AdminListVerificationScreen';
import {AdminUploadEvidenceScreen} from '@components/pages/AdminUploadEvidenceScreen';
import {AdminListScreen} from '@components/pages/AdminListScreen';
import {AdminListHistoryScreen} from '@components/pages/AdminListHistoryScreen';
import {AdminListDetailScreen} from '@components/pages/AdminListDetailScreen';
import LKSListScreen from '@components/pages/LKSListScreen';
import DetailLKSScreen from '@components/pages/DetailLKSScreen';
import HistoryLKSScreen from '@components/pages/HistoryLKSScreen';
import {StudentDetailScreen} from '@components/pages/StudentDetailScreen';
import TryoutQuestionScreen from '@components/pages/TryOutQuestionScreen';
import HistoryExamScreenParent from '@components/pages/HistoryExamScreenParent';
import {FormCreateScheduleOnParentScreen} from '@components/organism';

import {EditSchoolMaterialsScreen} from '@components/pages/AddSchoolMaterialsScreen/EditSchoolMaterialsScreen';
import BottomTabNavigator from '@components/atoms/BottomTabNavigator';
import BottomTabNavigatorKepsek from '@components/atoms/BottomTabNavigatorKepsek';
import BottomTabNavigatorParent from '@components/atoms/BottomTabNavigatorParent';
import BottomTabNavigatorGuru from '@components/atoms/BottomTabNavigatorGuru';
import BottomTabNavigatorAdmin from '@components/atoms/BottomTabNavigatorAdmin';
import BottomTabNavigatorLMS from '@components/atoms/BottomTabNavigatorLMS';
import {ParamList} from 'type/screen';
import {useNavigator} from './useNavigator';
import {RapatVirtualHistoryScreen} from '@components/pages/RapatVirtualHistoryScreen';
import {
  AsesmenMuridScreen,
  CreateLkpdScreen,
  DetailPeriksaLkpdScreen,
  IkmListItemScreen,
  KomunitasScreen,
  ListSubjectByPhaseScreen,
  LkpdTeacherHistoryDetailScreen,
  LkpdTeacherHistoryScreen,
  LkpdTeacherScreen,
  PerangkatAjarScreen,
  UploadFileIkmScreen,
} from '@features/IKM/TeacherIKM/pages';
import {LkpdStudentScreen} from '@features/IKM/StudentIKM/pages';
import {
  LembarKerjaScreen,
  PDFViewerIKMScreen,
  VideoPlayerIkmScreen,
} from '@features/IKM/shared/pages';
import PPTViewerIKMScreen from '@features/IKM/shared/pages/PPTViewerIKM';
import {PDFPreviewScreen} from '@components/pages/PDFPreviewScreen';
import RiwayatUjianScreen from '@components/pages/UjianScreen/RiwayatUjianScreen';
import CreateUjian from '@features/Exam/TeacherExam/createUjian';

const Stack = createStackNavigator<ParamList>();
type NavigatorProps = {
  showAPILog?: boolean;
};

export const Navigator: React.FC<NavigatorProps> = () => {
  const {screenListeners} = useNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenListeners={screenListeners}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Splash'} component={SplashScreen} />
      <Stack.Screen name={'Splash'} component={SplashScreen} />
      <Stack.Screen name={'TestScreen'} component={TestScreen} />
      <Stack.Screen name={'ClassReportScreen'} component={ClassReportScreen} />
      <Stack.Screen
        name={'FormCreateScheduleOnParentScreen'}
        component={FormCreateScheduleOnParentScreen}
      />
      <Stack.Screen name={'NewEbookScreen'} component={NewEbookScreen} />
      <Stack.Screen
        name={'HistoryExamScreenParent'}
        component={HistoryExamScreenParent}
      />
      <Stack.Screen
        name={'LearningReportStudentOnParentScreen'}
        component={LearningReportStudentOnParentScreen}
      />
      <Stack.Screen name="LMSOnParentScreen" component={LMSOnParentScreen} />
      <Stack.Screen name={'HotsScreen'} component={HotsScreen} />
      <Stack.Screen name={'ThinkNShareScreen'} component={ThinkNShareScreen} />
      <Stack.Screen name={'ResultScreen'} component={ResultScreen} />
      <Stack.Screen name={'ReportScreen'} component={ReportScreen} />
      <Stack.Screen name={'HistoryExamScreen'} component={HistoryExamScreen} />
      <Stack.Screen name={'TryOutScreen'} component={TryOutScreen} />
      <Stack.Screen
        name={'TryOutDetailHistoryScreen'}
        component={TryOutDetailHistoryScreen}
      />
      <Stack.Screen
        name={'StudentAbsenceListRombelScreen'}
        component={StudentAbsenceListRombelScreen}
      />
      <Stack.Screen
        name={'LearningObjectiveScreen'}
        component={LearningObjectiveScreen}
      />
      <Stack.Screen name={'SchedulePTNScreen'} component={SchedulePTNScreen} />
      <Stack.Screen
        name={'TryOutSubjectScreen'}
        component={TryOutSubjectScreen}
      />
      <Stack.Screen
        name={'ListScheduleHistoryScreen'}
        component={ListScheduleHistoryScreen}
      />
      <Stack.Screen
        name={'ChapterKPRegularScreen'}
        component={ChapterKPRegularScreen}
      />
      <Stack.Screen
        name={'RapatVirtualCreateScreen'}
        component={RapatVirtualCreateScreen}
      />
      <Stack.Screen
        name={'VerificationRegisterScreen'}
        component={VerificationRegisterScreen}
      />
      <Stack.Screen
        name="RapatVirtualListParticipantsScreen"
        component={RapatVirtualListParticipantsScreen}
      />
      <Stack.Screen
        name={'RapatVirtualDetailScreen'}
        component={RapatVirtualDetailScreen}
      />
      <Stack.Screen
        name={'RapatVirtualHistoryScreen'}
        component={RapatVirtualHistoryScreen}
      />
      <Stack.Screen
        name={'ReportOnParentScreen'}
        component={ReportOnParentScreen}
      />
      <Stack.Screen name={'ChapterAKMScreen'} component={ChapterAKMScreen} />
      <Stack.Screen
        name={'ListScheduleScreen'}
        component={ListScheduleScreen}
      />
      <Stack.Screen name={'ChapterLMSScreen'} component={ChapterLMSScreen} />
      <Stack.Screen
        name="DetailSessionClassScreen"
        component={DetailSessionClassScreen}
      />
      <Stack.Screen
        name={'DetailTeacherScreen'}
        component={DetailTeacherScreen}
      />
      <Stack.Screen
        name={'TeacherAbsenceApplicationScreen'}
        component={TeacherAbsenceApplicationScreen}
      />
      <Stack.Screen
        name={'TeacherAbsenceHistoryScreen'}
        component={TeacherAbsenceHistoryScreen}
      />
      <Stack.Screen
        name={'ReportDetailAbsentTeacherScreen'}
        component={ReportDetailAbsentTeacherScreen}
      />
      <Stack.Screen
        name={'TeacherAbsenceHistoryDetailScreen'}
        component={TeacherAbsenceHistoryDetailScreen}
      />
      <Stack.Screen
        name={'ReportAbsentTeacherScreen'}
        component={ReportAbsentTeacherScreen}
      />
      <Stack.Screen
        name={'HistoryExamScreenTeacher'}
        component={HistoryExamScreenTeacher}
      />
      <Stack.Screen name={'ChapterSOALScreen'} component={ChapterSOALScreen} />
      <Stack.Screen
        name={'DetailTaskScreenTeacher'}
        component={DetailTaskScreenTeacher}
      />
      <Stack.Screen
        name={'RapatVirtualTeacherScreen'}
        component={RapatVirtualTeacherScreen}
      />
      <Stack.Screen name={'HistoryTaskScreen'} component={HistoryTaskScreen} />
      <Stack.Screen name={'DetailTaskScreen'} component={DetailTaskScreen} />
      <Stack.Screen name={'ChooseClassScreen'} component={ChooseClassScreen} />
      <Stack.Screen
        name={'InputDetailKDReportScreen'}
        component={InputDetailKDReportScreen}
      />
      <Stack.Screen
        name={'InputDetailKDScreen'}
        component={InputDetailKDScreen}
      />
      <Stack.Screen
        name={'InputScoreStudentScreen'}
        component={InputScoreStudentScreen}
      />
      <Stack.Screen
        name={'StudentAbsenceApplicationScreen'}
        component={StudentAbsenceApplicationScreen}
      />
      <Stack.Screen
        name={'StudentAbsenceHistoryDetailScreen'}
        component={StudentAbsenceHistoryDetailScreen}
      />
      <Stack.Screen
        name={'StudentAbsenceHistoryScreen'}
        component={StudentAbsenceHistoryScreen}
      />
      <Stack.Screen
        name={'PengajuanKetidakHadiranScreen'}
        component={PengajuanKetidakHadiranScreen}
      />
      <Stack.Screen
        name={'DetailKehadiranScreen'}
        component={DetailKehadiranScreen}
      />
      <Stack.Screen
        name={'KetidakhadiranScreen'}
        component={KetidakhadiranScreen}
      />
      <Stack.Screen
        name={'FormDiagnosticTestScreen'}
        component={FormDiagnosticTestScreen}
      />
      <Stack.Screen
        name={'AdminListDetailScreen'}
        component={AdminListDetailScreen}
      />
      <Stack.Screen
        name={'AdminListHistoryScreen'}
        component={AdminListHistoryScreen}
      />
      <Stack.Screen name={'AdminListScreen'} component={AdminListScreen} />
      <Stack.Screen
        name={'AdminListVerificationScreen'}
        component={AdminListVerificationScreen}
      />
      <Stack.Screen
        name={'AdminUploadEvidenceScreen'}
        component={AdminUploadEvidenceScreen}
      />
      <Stack.Screen
        name={'RiwayatKetidakhadiranScreen'}
        component={RiwayatKetidakhadiranScreen}
      />
      <Stack.Screen
        name={'LembarKehadiranScreen'}
        component={LembarKehadiranScreen}
      />
      <Stack.Screen name={'ReportViewScreen'} component={ReportViewScreen} />
      <Stack.Screen
        name={'TanggalKehadiranScreen'}
        component={TanggalKehadiranScreen}
      />
      <Stack.Screen
        name={'HistoryTugasScreen'}
        component={HistoryTugasScreen}
      />
      <Stack.Screen name={'ListBabScreen'} component={ListBabScreen} />
      <Stack.Screen
        name={'ListMaterialScreen'}
        component={ListMaterialScreen}
      />
      <Stack.Screen name={'SortBabScreen'} component={SortBabScreen} />
      <Stack.Screen
        name={'SortMaterialScreen'}
        component={SortMaterialScreen}
      />
      <Stack.Screen
        name={'VideoAnimationScreen'}
        component={VideoAnimationScreen}
      />
      <Stack.Screen
        name={'RecordSessionClassSession'}
        component={RecordClassSessionScreen}
      />
      <Stack.Screen
        name={'InputScoreKKMScreen'}
        component={InputScoreKKMScreen}
      />
      <Stack.Screen name={'LMSUjian'} component={LMSUjian} />
      <Stack.Screen name={'AskScreen'} component={AskScreen} />
      <Stack.Screen name={'GuruScreen'} component={GuruScreen} />
      <Stack.Screen name={'PTNScreen'} component={PTNScreen} />
      <Stack.Screen name={'PTNBankSoalScreen'} component={PTNBankSoalScreen} />
      <Stack.Screen name={'PTNReportScreen'} component={PTNReportScreen} />
      <Stack.Screen
        name={'GuruPencarianScreen'}
        component={GuruPencarianScreen}
      />
      <Stack.Screen name={'QuestionBabScreen'} component={QuestionBabScreen} />
      <Stack.Screen
        name={'KPRegularLaporanScreen'}
        component={KPRegularLaporanScreen}
      />
      <Stack.Screen
        name={'DetailReportStudentScreen'}
        component={DetailReportStudentScreen}
      />
      <Stack.Screen
        name={'KPRegularLaporanDetailScreen'}
        component={KPRegularLaporanDetailScreen}
      />
      <Stack.Screen
        name={'KPRegularHistoryScoreScreen'}
        component={KPRegularHistoryScoreScreen}
      />
      <Stack.Screen name={'EbookScreen'} component={EbookScreen} />
      <Stack.Screen
        name={'MenuRaporPreviewScreen'}
        component={MenuRaporPreviewScreen}
      />
      <Stack.Screen name={'MenuRaporScreen'} component={MenuRaporScreen} />
      <Stack.Screen
        name={'MenuRaporByClassScreen'}
        component={MenuRaporByClassScreen}
      />
      <Stack.Screen name={'ScheduleScreen'} component={ScheduleScreen} />
      <Stack.Screen
        name={'LoginEditProfileScreen'}
        component={LoginEditProfile}
      />
      <Stack.Screen
        name={'ForgotPasswordScreen'}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name={'ConceptScreen'} component={ConceptScreen} />
      <Stack.Screen name={'Onboarding'} component={OnboardingScreen} />
      <Stack.Screen
        name={'KPRegularDetailBab'}
        component={KPRegularDetailBab}
      />
      <Stack.Screen name={'Autentikasi'} component={AutentikasiScreen} />
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'LoginOTPScreen'} component={LoginOTPScreen} />
      <Stack.Screen
        name={'ChangeNumberScreen'}
        component={ChangeNumberScreen}
      />
      <Stack.Screen name={'HistoryTestScreen'} component={HistoryTestScreen} />
      <Stack.Screen
        name={'ExamDetailGuruScreen'}
        component={ExamDetailGuruScreen}
      />
      <Stack.Screen name={'SelectRoleScreen'} component={SelectRoleScreen} />
      <Stack.Screen
        name={'PersonalDataScreen'}
        component={PersonalDataScreen}
      />
      <Stack.Screen name={'PromoDetailScreen'} component={PromoDetailScreen} />
      <Stack.Screen name={'DetailAnakScreen'} component={DetailAnakScreen} />
      <Stack.Screen name={'ClassScreen'} component={ClassScreen} />
      <Stack.Screen
        name={'InputPasswordScreen'}
        component={InputPasswordScreen}
      />
      <Stack.Screen name={'AskCameraScreen'} component={AskCameraScreen} />
      <Stack.Screen
        name={'AskPreviewPhotoScreen'}
        component={AskPreviewPhotoScreen}
      />
      <Stack.Screen
        name={'VerificationScreen'}
        component={VerificationScreen}
      />
      <Stack.Screen name={'LeaderboardScreen'} component={LeaderboardScreen} />
      <Stack.Screen
        name={'VideoPresentationScreen'}
        component={VideoPresentationScreen}
      />
      <Stack.Screen
        name={'SuccessRegisterScreen'}
        component={SuccessRegisterScreen}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name={'NotesScreen'} component={NotesScreen} />
      <Stack.Screen
        name="BottomTabNavigatorKepsek"
        component={BottomTabNavigatorKepsek}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabNavigatorParent"
        component={BottomTabNavigatorParent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabNavigatorGuru"
        component={BottomTabNavigatorGuru}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabNavigatorAdmin"
        component={BottomTabNavigatorAdmin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabNavigatorLMS"
        component={BottomTabNavigatorLMS}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'DailyCheckInScreen'}
        component={DailyCheckInScreen}
      />
      <Stack.Screen
        name={'MonitoringExamGuruScreen'}
        component={MonitoringExamGuruScreen}
      />
      <Stack.Screen
        name={'LMSTeacherLaporanKehadiranMuridScreen'}
        component={LMSTeacherLaporanKehadiranMuridScreen}
      />
      <Stack.Screen
        name={'PusatBantuanScreen'}
        component={PusatBantuanScreen}
      />
      <Stack.Screen
        name={'StudentDetailScreen'}
        component={StudentDetailScreen}
      />
      <Stack.Screen
        name={'ERaportGuruAssesmentScreen'}
        component={ERaportGuruAssesmentScreen}
      />
      <Stack.Screen
        name={'ERaportGuruChooseClassScreen'}
        component={ERaportGuruChooseClassScreen}
      />
      <Stack.Screen
        name={'CreateScheduleScreen'}
        component={CreateScheduleScreen}
      />
      <Stack.Screen
        name={'StudentAttendanceReportScreen'}
        component={StudentAttendanceReportScreen}
      />
      <Stack.Screen
        name={'StudentAbsentReportScreen'}
        component={StudentAbsentReportScreen}
      />
      <Stack.Screen
        name={'TeacherListMenuScreen'}
        component={TeacherListMenuScreen}
      />
      <Stack.Screen
        name={'StudentListMenuScreen'}
        component={StudentListMenuScreen}
      />
      <Stack.Screen
        name={'EditPasswordScreen'}
        component={EditPasswordScreen}
      />
      <Stack.Screen name={'ProfileEditScreen'} component={ProfileEditScreen} />
      <Stack.Screen
        name={'DetailEraporScreen'}
        component={DetailEraporScreen}
      />
      <Stack.Screen name={'ExplanationScreen'} component={ExplanationScreen} />
      <Stack.Screen
        name={'ExplanationTryOutScreen'}
        component={ExplanationTryOutScreen}
      />
      <Stack.Screen name={'AttendanceScreen'} component={AttendanceScreen} />
      <Stack.Screen
        name={'DiscussionGrupMessageScreen'}
        component={DiscussionGrupMessageScreen}
      />
      <Stack.Screen
        name={'DiscussionCreateGroupScreen'}
        component={DiscussionCreateGroupScreen}
      />
      <Stack.Screen
        name={'DiscussionGrupDetailScreen'}
        component={DiscussionGrupDetailScreen}
      />
      <Stack.Screen
        name={'DiscussionGrupAddMemberScreen'}
        component={DiscussionGrupAddMemberScreen}
      />
      <Stack.Screen
        name={'DiscussionGrupSearchMemberScreen'}
        component={DiscussionGrupSearchMemberScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={'DiscussionGrupScreen'}
        component={DiscussionGrupScreen}
      />
      <Stack.Screen
        name={'AttendancePresensiHistoryScreen'}
        component={AttendancePresensiHistoryScreen}
      />
      <Stack.Screen
        name={'AttendanceApprovalFormScreen'}
        component={AttendanceApprovalFormScreen}
      />
      <Stack.Screen
        name={'AttendanceAprovalListHistoryScreen'}
        component={AttendanceAprovalListHistoryScreen}
      />
      <Stack.Screen
        name={'AttendanceApprovalDetailHistoryScreen'}
        component={AttendanceApprovalDetailHistoryScreen}
      />
      <Stack.Screen
        name={'ViewAttachmentScreen'}
        component={ViewAttachmentScreen}
      />
      <Stack.Screen
        name={'HistoryTestAndExamScreen'}
        component={HistoryTestAndExamScreen}
      />
      <Stack.Screen
        name={'VideoDownloadScreen'}
        component={VideoDownloadScreen}
      />
      <Stack.Screen name={'SavedVideoScreen'} component={SavedVideoScreen} />
      <Stack.Screen name={'MyActivityScreen'} component={MyActivityScreen} />
      <Stack.Screen name={'ERaportGuruScreen'} component={ERaportGuruScreen} />
      <Stack.Screen name={'BlogScreen'} component={BlogScreen} options={{}} />
      <Stack.Screen name={'BlogDetailScreen'} component={BlogDetailScreen} />
      <Stack.Screen name={'CartHistoryScreen'} component={CartHistoryScreen} />
      <Stack.Screen name={'HomeCoinScreen'} component={HomeCoinScreen} />
      <Stack.Screen name={'PackageScreen'} component={PackageScreen} />
      <Stack.Screen name={'PackageCoinScreen'} component={PackageCoinScreen} />
      <Stack.Screen name={'MiniGameScreen'} component={MiniGameScreen} />
      <Stack.Screen
        name={'TeacherCheckExamScreen'}
        component={TeacherCheckExamScreen}
      />
      <Stack.Screen
        name={'PracticeSoalReportScreen'}
        component={PracticeSoalReportScreen}
      />
      <Stack.Screen
        name={'PracticeSoalReportDetailScreen'}
        component={PracticeSoalReportDetailScreen}
      />
      <Stack.Screen
        name={'AnnouncementDetailScreen'}
        component={AnnouncementDetailScreen}
      />
      <Stack.Screen name={'Cart'} component={CartScreen} />
      <Stack.Screen
        name={'CartHistoryDetailScreen'}
        component={CartHistoryDetailScreen}
      />
      <Stack.Screen name={'EssayScreen'} component={EssayScreen} />
      <Stack.Screen name={'ViewPhotoScreen'} component={ViewPhotoScreen} />
      <Stack.Screen name={'LinkAccountScreen'} component={LinkAccountScreen} />
      <Stack.Screen
        name={'MultipleChoiceQuestionScreen'}
        component={MultipleChoiceQuestionScreen}
      />
      <Stack.Screen name={'QuestionScreen'} component={QuestionScreen} />
      <Stack.Screen name={'LMSReportScreen'} component={LMSReportScreen} />
      <Stack.Screen name={'AKMLaporanScreen'} component={AKMLaporanScreen} />
      <Stack.Screen
        name={'QuestionDetailScreen'}
        component={QuestionDetailScreen}
      />
      <Stack.Screen
        name={'AdministrativeScreen'}
        component={AdministrativeScreen}
      />
      <Stack.Screen
        name={'HistoryTanyaScreen'}
        component={HistoryTanyaScreen}
      />
      <Stack.Screen
        name={'DetailHistoryTanyaScreen'}
        component={DetailHistoryTanyaScreen}
      />
      <Stack.Screen
        name={'MeetingLiveSessionScreen'}
        component={MeetingLiveSessionScreen}
      />
      <Stack.Screen
        name={'MeetingLiveSessionV2Screen'}
        component={MeetingLiveSessionV2Screen}
      />
      <Stack.Screen
        name={'MeetingLiveSessionChatScreen'}
        component={MeetingLiveSessionChatScreen}
      />
      <Stack.Screen
        name={'ClassSessionDetailScreen'}
        component={ClassSessionDetailScreen}
      />
      <Stack.Screen
        name={'ClassSessionDetailGURUScreen'}
        component={ClassSessionDetailGURUScreen}
      />
      <Stack.Screen
        name={'LMSTeacherClassSessionScreen'}
        component={LMSTeacherClassSessionScreen}
      />
      <Stack.Screen
        name={'LMSTeacherTaskScreen'}
        component={LMSTeacherTaskScreen}
      />
      <Stack.Screen
        name={'LMSTeacherTaskCreateScreen'}
        component={LMSTeacherTaskCreateScreen}
      />
      <Stack.Screen
        name={'AnnouncementManageScreen'}
        component={AnnouncementManageScreen}
      />
      <Stack.Screen
        name={'AnnouncementManageHistoryScreen'}
        component={AnnouncementManageHistoryScreen}
      />
      <Stack.Screen
        name={'AnnouncementManageCreateScreen'}
        component={AnnouncementManageCreateScreen}
      />
      <Stack.Screen
        name={'LMSTeacherFormClassSessionScreen'}
        component={LMSTeacherFormClassSessionScreen}
      />
      <Stack.Screen
        name={'LMSTeacherFormErrorClassSessionScreen'}
        component={LMSTeacherFormErrorClassSessionScreen}
      />
      <Stack.Screen
        name={'LMSTeacherDetailClassSessionScreen'}
        component={LMSTeacherDetailClassSessionScreen}
      />
      <Stack.Screen
        name={'LMSTeacherHistoryClassSessionScreen'}
        component={LMSTeacherHistoryClassSessionScreen}
      />
      <Stack.Screen
        name={'HistoryAndRecordsScreen'}
        component={HistoryAndRecordsScreen}
      />
      <Stack.Screen
        name={'MultipleQuestionTypeScreen'}
        component={MultipleQuestionTypeScreen}
      />
      <Stack.Screen name={'LMSPRTugasScreen'} component={LMSPRTugasScreen} />
      <Stack.Screen
        name={'ManageSchoolMaterialsScreen'}
        component={ManageSchoolMaterials}
      />
      <Stack.Screen
        name={'AddSchoolMaterialsScreen'}
        component={AddSchoolMaterials}
      />
      <Stack.Screen
        name={'ListSubjectSchoolMaterialsScreen'}
        component={ListSubjectSchoolMaterialsScreen}
      />
      <Stack.Screen
        name={'LMSTeacherMeetingLiveSessionScreen'}
        component={LMSTeacherMeetingLiveSessionScreen}
      />
      <Stack.Screen
        name={'ListChapterSchoolMaterialsScreen'}
        component={ListChapterSchoolMaterialsScreen}
      />
      <Stack.Screen name={'UjianScreen'} component={UjainScreen} />
      <Stack.Screen
        name={'LMSMuridUjianScreen'}
        component={LMSMuridUjianScreen}
      />
      <Stack.Screen
        name={'PaketSoalSubjectListScreen'}
        component={PaketSoalSubjectListScreen}
      />
      <Stack.Screen
        name={'PaketSoalChapterListScreen'}
        component={PaketSoalChapterListScreen}
      />
      <Stack.Screen
        name={'PaketSoalListScreen'}
        component={PaketSoalListScreen}
      />
      <Stack.Screen
        name={'StudyReportStudentScreen'}
        component={StudyReportStudentScreen}
      />
      <Stack.Screen
        name={'DetailPaketSoalListScreen'}
        component={DetailPaketSoalListScreen}
      />
      <Stack.Screen
        name="CreateSoalSendiriScreen"
        component={CreateSoalSendiriScreen}
      />
      <Stack.Screen name="BankSoalScreen" component={BankSoalScreen} />
      <Stack.Screen
        name={'StudentHistoryExamScreen'}
        component={StudentHistoryExamScreen}
      />
      <Stack.Screen
        name={'StudentHistoryTaskScreen'}
        component={StudentHistoryTaskScreen}
      />
      <Stack.Screen
        name={'SelectSoalToAddToPaketSoalScreen'}
        component={SelectSoalToAddToPaketSoalScreen}
      />
      <Stack.Screen name={'DetailSoalScreen'} component={DetailSoalScreen} />
      <Stack.Screen
        name={'AdministrativeReportScreen'}
        component={AdministrativeReportScreen}
      />
      <Stack.Screen name={'CreateJadwalUjianScreen'} component={CreateUjian} />
      <Stack.Screen
        name={'PancasilaProjectScreen'}
        component={PancasilaProjectScreen}
      />
      <Stack.Screen
        name={'LMSUjianTestCameraScreen'}
        component={LMSUjianTestCameraScreen}
      />
      <Stack.Screen
        name={'RapatVirtualTestCamerascreen'}
        component={RapatVirtualTestCamerascreen}
      />
      <Stack.Screen name={'JitsiScreen'} component={JitsiScreen} />
      <Stack.Screen
        name={'TaskDetailTeacherScreen'}
        component={TaskDetailTeacherScreen}
      />
      <Stack.Screen
        name={'PRProjectTaskHistoryScreen'}
        component={PRProjectTaskHistoryScreen}
      />
      <Stack.Screen
        name={'CreateQuestionTaskScreen'}
        component={CreateQuestionTaskScreen}
      />
      <Stack.Screen
        name={'CheckPRProjectTeacherScreen'}
        component={CheckPRPRojectTeacherScreen}
      />
      <Stack.Screen
        name={'PancasilaNotesScreen'}
        component={PancasilaNotesScreen}
      />
      <Stack.Screen
        name={'RemoveAccountScreen'}
        component={RemoveAccountScreen}
      />
      <Stack.Screen
        name={'RemoveAccountOTPScreen'}
        component={RemoveAccountOTPScreen}
      />
      <Stack.Screen
        name={'RemoveAccountGoodByeScreen'}
        component={RemoveAccountGoodByeScreen}
      />
      <Stack.Screen
        name={'DiagnoticTestScreen'}
        component={DiagnoticTestScreen}
      />
      <Stack.Screen
        name={'DiagnoticTestResultScreen'}
        component={DiagnoticTestResultScreen}
      />
      <Stack.Screen
        name={'DiagnoticRecommendationScreen'}
        component={DiagnoticRecommendationScreen}
      />
      <Stack.Screen name={'LKSListScreen'} component={LKSListScreen} />
      <Stack.Screen name={'DetailLKSScreen'} component={DetailLKSScreen} />
      <Stack.Screen
        name={'DiagnoticProfessionScreen'}
        component={DiagnoticProfessionScreen}
      />
      <Stack.Screen
        name={'DiagnoticCheckOpportunityScreen'}
        component={DiagnoticCheckOpportunityScreen}
      />
      <Stack.Screen
        name={'DiagnoticSearchScreen'}
        component={DiagnoticSearchScreen}
      />
      <Stack.Screen
        name={'DiagnoticDescriptionScreen'}
        component={DiagnoticDescriptionScreen}
      />
      <Stack.Screen name={'HistoryLKSScreen'} component={HistoryLKSScreen} />
      <Stack.Group>
        <Stack.Screen name={'GlobalSearchScreen'} component={GlobalSearch} />
      </Stack.Group>
      <Stack.Screen
        name="TryOutQuestionScreen"
        component={TryoutQuestionScreen}
      />
      <Stack.Screen
        name={'RiwayatUjianScreen'}
        component={RiwayatUjianScreen}
      />
      <Stack.Screen
        name={'PTNLiveClassHomeScreen'}
        component={PTNLiveClassHomeScreen}
      />
      <Stack.Screen
        name={'PTNLiveClassRecordScreen'}
        component={PTNLiveClassRecordScreen}
      />
      <Stack.Screen
        name={'ProjectPancasilaScreen'}
        component={ProjectPancasilaScreen}
      />
      <Stack.Screen
        name={'PancasilaAllStatusProyekScreen'}
        component={PancasilaAllStatusProyekScreen}
      />
      <Stack.Screen
        name={'PancasilaKirimProyekScreen'}
        component={PancasilaKirimProyekScreen}
      />
      <Stack.Screen
        name={'HistoryShareEraporScreen'}
        component={HistoryShareEraporScreen}
      />
      <Stack.Screen
        name={'EditSchoolMaterialsScreen'}
        component={EditSchoolMaterialsScreen}
      />
      <Stack.Screen name={'WebViewScreen'} component={WebViewScreen} />

      {/* IKM Content */}
      <Stack.Screen
        name={'PDFViewerIKMScreen'}
        component={PDFViewerIKMScreen}
      />
      <Stack.Screen
        name={'PPTViewerIKMScreen'}
        component={PPTViewerIKMScreen}
      />
      <Stack.Screen
        name={'ListSubjectByPhaseScreen'}
        component={ListSubjectByPhaseScreen}
      />
      <Stack.Screen name={'IkmListItemScreen'} component={IkmListItemScreen} />
      <Stack.Screen
        name={'VideoPlayerIkmScreen'}
        component={VideoPlayerIkmScreen}
      />
      <Stack.Screen
        name={'PerangkatAjarScreen'}
        component={PerangkatAjarScreen}
      />
      <Stack.Screen
        name={'AsesmenMuridScreen'}
        component={AsesmenMuridScreen}
      />
      <Stack.Screen name={'KomunitasScreen'} component={KomunitasScreen} />
      <Stack.Screen name={'LkpdTeacherScreen'} component={LkpdTeacherScreen} />
      <Stack.Screen name={'LkpdStudentScreen'} component={LkpdStudentScreen} />
      <Stack.Screen
        name={'LkpdTeacherHistoryScreen'}
        component={LkpdTeacherHistoryScreen}
      />
      <Stack.Screen name={'LembarKerjaScreen'} component={LembarKerjaScreen} />
      <Stack.Screen
        name={'UploadFileIkmScreen'}
        component={UploadFileIkmScreen}
      />
      <Stack.Screen name={'CreateLkpdScreen'} component={CreateLkpdScreen} />
      <Stack.Screen
        name={'DetailPeriksaLkpdScreen'}
        component={DetailPeriksaLkpdScreen}
      />
      <Stack.Screen
        name={'LkpdTeacherHistoryDetailScreen'}
        component={LkpdTeacherHistoryDetailScreen}
      />
      <Stack.Screen name={'PDFPreviewScreen'} component={PDFPreviewScreen} />
      <Stack.Screen
        name={'UjianExplanationScreen'}
        component={UjianExplanationScreen}
      />
    </Stack.Navigator>
  );
};
