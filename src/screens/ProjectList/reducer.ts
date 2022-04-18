import { DispatchType } from '../../common/constants';

type ListStatesType = {
  page: number;
  limit: number;
  keyword: string;
  status?: string;
  isAdvanced?: boolean;
  startDate?: Date | Date[];
  endDate?: Date | Date[];
  containMember?: string;
  filteredMembers: string[];
};

const defaultListStates = {
  page: 0,
  limit: 10,
  keyword: '',
  isAdvanced: false,
  filteredMembers: [],
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
    case DispatchType.LIST_PROJ.ADVANCED:
      return { ...state, isAdvanced: action.data };
    case DispatchType.LIST_PROJ.CONTAIN_MEMBERS:
      return { ...state, containMembers: action.data };
    case DispatchType.LIST_PROJ.START_DATE:
      return { ...state, startDate: action.data };
    case DispatchType.LIST_PROJ.END_DATE:
      return { ...state, endDate: action.data };
    case DispatchType.LIST_PROJ.STATUS:
      return { ...state, status: action.data };
    case DispatchType.LIST_PROJ.KEYWORD:
      return { ...state, keyword: action.data };
    default:
      return state;
  }
};

export default listProjReducer;
