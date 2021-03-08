import Actions from '../actions/actionTypes';

let initialState = {
    images: [],
    loader: false,
    dataSuccess: true,
    enableNavigate: true
}

const appStateData = (state = initialState, action) => {
    switch (action.type) {
        case Actions.loader:
            return {
                ...state,
                loader: action.value
            }
        case Actions.images:
            return {
                ...state,
                images: action.value
            }
        case Actions.enableNavigate:
            return {
                ...state,
                enableNavigate: !state.enableNavigate
            }
        case Actions.dataSuccess:
            return {
                ...state,
                dataSuccess: action.value
            }
        default:

    }
    return state;
}

export default appStateData;