export const defaultParticipant: BaseFilter<RapatVirtualRole>[] = [
  {id: 4, name: 'Kepsek', value: 'Kepsek'},
  {id: 5, name: 'Guru', value: 'Guru'},
  {id: 6, name: 'Admin', value: 'Admin'},
];

export const defaultStatus: CallBackWithParams<
  BaseFilter<RapatStatus>[],
  'scheduled' | 'history'
> = (type: 'scheduled' | 'history') => {
  if (type === 'scheduled') {
    return [
      {id: 1, name: 'Dijadwalkan', value: 'unstarted'},
      {id: 2, name: 'Berlangsung', value: 'on_going'},
      {id: 3, name: '', value: 'scheduled'},
    ];
  }

  return [
    {id: 4, name: 'Selesai', value: 'finish'},
    {id: 5, name: 'Dibatalkan', value: 'canceled'},
    {id: 6, name: '', value: 'history'},
  ];
};
