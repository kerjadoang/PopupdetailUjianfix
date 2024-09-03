const SetUpdateMapelFilter = (data: any): any => {
  return {
    type: 'GLOBAL_UPDATE_MAPEL_FILTER',
    payload: data,
  };
};

export const mapelFilterAction = (data: any): any => {
  return (dispatch: any): any => {
    dispatch(SetUpdateMapelFilter(data));
  };
};
