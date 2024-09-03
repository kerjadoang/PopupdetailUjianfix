interface DetailSoalListAction {
  setMode: CallBackWithParams<void, DetailPaketSoalListMode>;
  setRawSoalList: CallBackWithParams<void, IBasePackageQuestion[]>;
  setSoalList: CallBackWithParams<void, IBasePackageQuestion[]>;
  updateSoalList: CallBackWithParams<void, IBasePackageQuestion>;
  selectAllSoal: VoidCallBack;
}

interface DetailSoalListState {
  soalList?: IBasePackageQuestion[];
  rawSoalList?: IBasePackageQuestion[];
  mode: DetailPaketSoalListMode;
}

type IDetailSoalList = BaseZustandAction<DetailSoalListAction> &
  BaseZustandState<DetailSoalListState>;
