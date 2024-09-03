import {create} from 'zustand';

const initialState: BaseZustandState<DetailSoalListState> = {
  mode: 'detail',
  rawSoalList: [],
  soalList: [],
};

// ** DONT USE DIRECTLY THIS STORE !!! ** //
export const useDetailSoalListStore = create<IDetailSoalList>()((set, get) => ({
  ...initialState,
  // ⬇️ separate "namespace" for actions
  actions: {
    resetState: () => set(initialState),
    setMode: mode => {
      if (mode === 'delete') {
        set({soalList: []});
      }
      if (mode === 'reorder') {
        set({soalList: get().rawSoalList});
      }
      return set({mode});
    },
    setRawSoalList: rawSoalList => set({rawSoalList}),
    setSoalList: soalList => set({soalList}),
    updateSoalList: soal => {
      const finalData = get().soalList?.pushOrRemove<IBasePackageQuestion>(
        soal,
        {
          customCondition(data) {
            return data.id === soal.id;
          },
        },
      );
      set({soalList: finalData});
    },
    selectAllSoal: () => {
      const listSoal = get().soalList?.map(soal => {
        return {
          ...soal,
          isChecked: true,
        };
      });
      set({soalList: listSoal});
    },
  },
}));
