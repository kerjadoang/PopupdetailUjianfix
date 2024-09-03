interface RapatVirtualFilter {
  dateStart?: string;
  dateEnd?: string;
  dateType?: FilterDateType;
  participant?: BaseFilter<RapatRole>[];
  status?: BaseFilter<RapatStatus>[];
  offset?: number;
  limit?: number;
  search?: string;
}
type RapatStatus =
  | 'on_going'
  | 'finish'
  | 'canceled'
  | 'unstarted'
  | 'scheduled'
  | 'history';

type RapatVirtualRole = 'Kepsek' | 'Guru' | 'Admin';

interface RapatVirtualParticipant {
  id: number;
  name: RapatVirtualRole;
}
