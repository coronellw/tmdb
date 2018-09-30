// import * as actionTypes from '../../actions';

const initialState = false;

const reducer = (state = initialState, action) => {
    let { type } = action;
    const matches = /(.*)_(REJECTED)/.exec(type);

    if (!matches) return initialState;

    let [, , requestState] = matches;

    console.log(requestState);
    return requestState === 'REJECTED'

}

export default reducer;