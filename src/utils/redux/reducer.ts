import Cookies from 'js-cookie';
import { combineReducers } from 'redux';
import { DispatchType } from '../../common/constants';
import createProjReducer from '../../screens/CreateProject/reducer';

type AppState = {
    isError: boolean | string;
    lang: string;
    palette: string;
};

const defaultAppStates: AppState = {
    isError: false,
    lang: 'en',
    palette: 'dark',
};

const appReducer = (state = defaultAppStates, action: any) => {
    switch (action.type) {
        case DispatchType.APP.ERROR:
            return { ...state, isError: action.data };
        case DispatchType.APP.LANG:
            Cookies.set('lang', action.data);
            return { ...state, lang: action.data };
        case DispatchType.APP.PALETTE:
            Cookies.set('palette', action.data);
            return { ...state, palette: action.data };
        default:
            return state;
    }
};

const reducer = combineReducers({
    app: appReducer,
    create_proj: createProjReducer,
});

export default reducer;
