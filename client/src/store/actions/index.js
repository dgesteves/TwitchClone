import {
    CREATE_STREAM,
    SIGN_IN,
    SIGN_OUT,
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from "../types";
import {
    createStreamApi,
    editStreamApi,
    fetchStreamApi,
    fetchStreamsApi,
    deleteStreamApi
} from "../../apis/streams";
import history from "../../history";

export const signIn = userId => ({
    type: SIGN_IN,
    payload: userId
})

export const signOut = () => ({
    type: SIGN_OUT
})

const createStreamAction = stream => ({
    type: CREATE_STREAM,
    payload: stream
})

const fetchStreamsAction = streams => ({
    type: FETCH_STREAMS,
    payload: streams
})

const fetchStreamAction = stream => ({
    type: FETCH_STREAM,
    payload: stream
})

const editStreamAction = stream => ({
    type: EDIT_STREAM,
    payload: stream
})

const deleteStreamAction = streamId => ({
    type: DELETE_STREAM,
    payload: streamId
})

/*
* async action creators
* */

export const createStream = formValues => async (dispatch, getState) => {
    const {userId} = getState().auth
    const response = await createStreamApi('/streams', {...formValues, userId})
    dispatch(createStreamAction(response))
    history.push('/')
}

export const fetchStreams = () => async dispatch => {
    const response = await fetchStreamsApi('/streams')
    dispatch(fetchStreamsAction(response))
}

export const fetchStream = id => async dispatch => {
    const response = await fetchStreamApi('/streams', id)
    dispatch(fetchStreamAction(response))
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await editStreamApi('/streams', id, formValues)
    dispatch(editStreamAction(response))
    history.push('/')
}

export const deleteStream = id => async dispatch => {
    await deleteStreamApi('/streams', id)
    dispatch(deleteStreamAction(id))
    history.push('/')
}