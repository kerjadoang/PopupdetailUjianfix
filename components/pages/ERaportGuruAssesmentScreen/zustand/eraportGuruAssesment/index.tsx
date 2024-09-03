import {IEraportGuruAssesment} from './type';
import {useEraportGuruAssesmentStore} from './store';

export const useFormAssesmentSetting = () => {
  return useEraportGuruAssesmentStore(
    (state: IEraportGuruAssesment) => state.formAssesmentSettings,
  );
};

export const useTempAssesmentSetting = () => {
  return useEraportGuruAssesmentStore(
    (state: IEraportGuruAssesment) => state.tempAssesmentSettings,
  );
};

// 🎉 one selector for all our actions
export const useEraportGuruAssesmentActions = () =>
  useEraportGuruAssesmentStore((state: IEraportGuruAssesment) => state.actions);
