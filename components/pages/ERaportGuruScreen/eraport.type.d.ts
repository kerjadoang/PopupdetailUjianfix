type IEraportData = {
  settings?: IStoreAcademicYearData;
  academicYear?: IAcademicPhaseRdxDataDetail;
  academicPhase?: AcademicPhase;
  studentEraportShareList?: IEraportShareList;
};
interface IEraportPopup {
  id?: number;
  assessment_erapor_share_id?: number;
  assessment_erapor_share?: AssessmentEraporShare;
  user_id?: number;
  user?: IBaseUser;
  share?: boolean;
  ui_button_edit_erapor_student?: boolean;
}
