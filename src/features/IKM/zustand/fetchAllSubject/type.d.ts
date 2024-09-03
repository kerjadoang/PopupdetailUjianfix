interface FetchAllSubjectAction {
  setSubjects: CallBackWithParams<void, IKMSubject[]>;
  getAllSubject: CallBackWithParams<void, IReqAllSubject>;
}

interface FetchAllSubjectState {
  subjects: IKMSubject[];
}

type IFetchAllSubject = BaseZustandAction<FetchAllSubjectAction> &
  BaseZustandState<FetchAllSubjectState>;

interface IReqAllSubject {
  classIds?: string;
  type?: string;
}

interface IKMSubject {
  subject_name?: string;
  subject_details?: Subject[];
}
