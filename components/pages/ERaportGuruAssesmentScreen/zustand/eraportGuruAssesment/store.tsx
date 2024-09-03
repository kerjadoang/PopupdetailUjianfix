import {
  AssessmentSettings,
  EraportGuruAssesmentState,
  IEraportGuruAssesment,
} from './type';
import {create} from 'zustand';

const initialState: BaseZustandState<EraportGuruAssesmentState> = {
  formAssesmentSettings: {validateForm: false, type_assessment: []},
  tempAssesmentSettings: false,
};

export const useEraportGuruAssesmentStore = create<IEraportGuruAssesment>()(
  set => ({
    ...initialState,
    // ⬇️ separate "namespace" for actions
    actions: {
      setFormAssesmentSetting: (data: AssessmentSettings) => {
        // console.log('setFormAssesmentSettings', data);
        set({formAssesmentSettings: data});
      },
      setTempAssesmentSetting: (data: any) => {
        // console.log('setTempAssesmentSettings', data);
        set({tempAssesmentSettings: data});
      },
      resetState: () => set(initialState),
    },
  }),
);
