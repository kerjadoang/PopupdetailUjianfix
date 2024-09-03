import {IHistoryTanyaResponseData} from '@redux';

export interface IDetailHistoryTanyaResponseData {
  detail: IHistoryTanyaResponseData;
  footer: string;
}

export type IDetailHistoryTanyaResponse =
  IBaseResponseData<IDetailHistoryTanyaResponseData>;
