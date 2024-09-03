import {AssessmentSettings} from '../utils';

interface EraportGuruAssesmentAction {
  setFormAssesmentSetting: (data: AssessmentSettings) => void;
  setTempAssesmentSetting: (data: any) => void;
}

interface EraportGuruAssesmentState {
  formAssesmentSettings: FormAssessmentSettings;
  tempAssesmentSettings: IAssessmentSettings;
}

interface EraportGuruAssesmentState {
  formAssesmentSettings: FormAssessmentSettings;
  tempAssesmentSettings: IAssessmentSettings;
}

interface EraportGuruAssesmentState {
  formAssesmentSettings: AssessmentSettings;
  tempAssesmentSettings: any;
}

interface IAssessmentSettings {
  validateForm: boolean;
  semester?: Semester[];
  type_assessment: TypeAssessment[];
}
interface FormAssessmentSettings {
  validateForm: boolean;
  semester?: Semester;
  type_assessment: TypeAssessment[];
}
