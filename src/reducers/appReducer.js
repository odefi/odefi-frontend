import {createReducer,createAction} from 'redux-starter-kit';

export const setMode = createAction('setMode')
export const setAddress = createAction('setAddress')

export const appReducer = createReducer({
    isDarkMode: true,
    myAddress: false
}, {
    [setMode]: (state, {payload}) => {
        state.isDarkMode = payload;
    },
    [setAddress]: (state, {payload}) => {
        state.myAddress = payload;
    }
});