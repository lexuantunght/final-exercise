enum AppDispatchType {
  'ERROR' = 'SET_APP_ERROR',
  'PALETTE' = 'SET_APP_PALETTE',
  'LANG' = 'SET_APP_LANG',
}

enum CreateProjectDispatchType {
  'FILTERED_MEMS' = 'SET_CREATE_PROJ_FILTERED_MEMBERS',
}

export const DispatchType = {
  APP: AppDispatchType,
  CREATE_PROJ: CreateProjectDispatchType,
};
