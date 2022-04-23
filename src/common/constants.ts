enum AppDispatchType {
  'ERROR' = 'SET_APP_ERROR',
  'PALETTE' = 'SET_APP_PALETTE',
  'LANG' = 'SET_APP_LANG',
}

enum CreateProjectDispatchType {
  'FILTERED_MEMS' = 'SET_CREATE_PROJ_FILTERED_MEMBERS',
}

enum ListProjectDispatchType {
  'PAGE' = 'SET_PROJECT_LIST_PAGE',
  'LIMIT' = 'SET_PROJECT_LIST_LIMIT',
  'SEARCH' = 'SET_PROJECT_LIST_SEARCH_DATE',
  'ADVANCED' = 'SET_PROJECT_LIST_ADVANCED',
  'SORT' = 'SET_PROJECT_LIST_SORT_DATA',
  'SELECTED' = 'SET_PROJECT_LIST_SELECTED_PROJECT',
}

export const DispatchType = {
  APP: AppDispatchType,
  CREATE_PROJ: CreateProjectDispatchType,
  LIST_PROJ: ListProjectDispatchType,
};
