import { DispatchType } from '../../common/constants';
import { Project } from '../../models/Project';

type ListStatesType = {
  page: number;
  limit: number;
  isAdvanced?: boolean;
  searchData: {
    keyword: string;
    status?: string;
    startDate?: Date[];
    endDate?: Date[];
    containMember?: string;
  };
  sortData: {
    orderType: string;
    sortField: string;
  };
  selectedProjects: Project[];
};

const defaultListStates = {
  page: 0,
  limit: 10,
  isAdvanced: false,
  searchData: {
    keyword: '',
    status: '',
    startDate: [],
    endDate: [],
    containMember: '',
  },
  sortData: {
    orderType: '',
    sortField: '',
  },
  selectedProjects: [],
};

const listProjReducer = (
  state: ListStatesType = defaultListStates,
  action: any
) => {
  switch (action.type) {
    case DispatchType.LIST_PROJ.PAGE:
      return { ...state, page: action.data };
    case DispatchType.LIST_PROJ.LIMIT:
      return { ...state, limit: action.data };
    case DispatchType.LIST_PROJ.SEARCH:
      return { ...state, searchData: action.data };
    case DispatchType.LIST_PROJ.ADVANCED:
      return { ...state, isAdvanced: action.data };
    case DispatchType.LIST_PROJ.SORT:
      return { ...state, sortData: action.data };
    case DispatchType.LIST_PROJ.SELECTED:
      return { ...state, selectedProjects: action.data };
    default:
      return state;
  }
};

export default listProjReducer;
