const initialState = {
  data: [],
};

const updateMapelFilter: any = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case 'GLOBAL_UPDATE_MAPEL_FILTER':
      return {
        ...state,
        data: action.payload ?? [],
      };
    default:
      return state;
  }
};

export default updateMapelFilter;
