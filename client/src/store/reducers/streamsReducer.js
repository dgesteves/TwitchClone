import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from "../types";

export default (state = {}, {type, payload}) => {
    switch (type) {
        case FETCH_STREAM:
        case CREATE_STREAM:
        case EDIT_STREAM:
            return {...state, [payload.id]: payload}
        case FETCH_STREAMS:
            return {
                ...state,
                ...payload.reduce((map, payload) => {
                    map[payload.id] = payload
                    return map
                }, {})
            }
        case DELETE_STREAM:
            return Object.keys(state).reduce((newState, key) => {
                if (key !== payload){
                    newState[key] = state[key]
                }
                return newState
            }, {})
        default:
            return state
    }
}