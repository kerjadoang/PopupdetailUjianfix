interface SearchModalAction {
  setShowModal: (data: boolean) => void;
  setSubjectData: (data: any) => void;
}

interface SearchModalState {
  showModal: boolean;
  subjectData: any;
}

type ISearchModal = BaseZustandAction<SearchModalAction> &
  BaseZustandState<SearchModalState>;
