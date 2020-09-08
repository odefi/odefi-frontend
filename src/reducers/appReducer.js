import {createReducer,createAction} from 'redux-starter-kit';

export const setMode = createAction('setMode')
export const setETHAddress = createAction('setETHAddress')
export const setTRXAddress = createAction('setTRXAddress')
export const setTRXBalance = createAction('setTRXBalance')
export const setETHBalance = createAction('setETHBalance')
export const setSelectedCoin = createAction('setSelectedCoin')

export const appReducer = createReducer({
    isDarkMode: true,
    ETHAddress: false,
    TRXAddress: false,
    selectedCoin: false,
    ETHBalance: 0,
    TRXBalance: 0
}, {
    [setMode]: (state, {payload}) => {
        state.isDarkMode = payload;
    },
    [setETHAddress]: (state, {payload}) => {
        state.ETHAddress = payload;
    },
    [setTRXAddress]: (state, {payload}) => {
        state.TRXAddress = payload;
    },
    [setSelectedCoin]: (state, {payload}) => {
        state.selectedCoin = payload;
    },
    [setTRXBalance]: (state, {payload}) => {
        state.TRXBalance = payload;
    },
    [setETHBalance]: (state, {payload}) => {
        state.ETHBalance = payload;
    }
});