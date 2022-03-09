import { DispatchType } from '../../common/constants';

const defaultCreateStates = {
    filteredMembers: [],
};

const createProjReducer = (state = defaultCreateStates, action: any) => {
    switch (action.type) {
        case DispatchType.CREATE_PROJ.FILTERED_MEMS:
            return { ...state, filteredMembers: action.data };
        default:
            return state;
    }
};

export default createProjReducer;
