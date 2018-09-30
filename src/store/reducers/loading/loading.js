// import * as actionTypes from '../../actions';

const initialState = false;

const reducer = (state = initialState, action) => {
    let { type } = action;
    const matches = /(.*)_(PENDING)/.exec(type);

    if (!matches) return initialState;

    let [, , requestState] = matches;

    return requestState === 'PENDING'
}

export default reducer;