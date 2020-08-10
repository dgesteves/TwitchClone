import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchStream, editStream} from "../../store/actions";
import StreamForm from "./StreamForm";
import {getStream} from "../../store/selectors";

function StreamEdit({match}) {
    const {id} = match.params
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStream(id))
    }, [dispatch, id])

    const stream = useSelector(getStream(id))

    const onSubmit = (formValues) => {
        dispatch(editStream(id, formValues))
    }

    return (
        <>
            <h3>Edit a stream</h3>
            <StreamForm
                onSubmit={onSubmit}
                initialValues={stream && {
                    title: stream.title,
                    description: stream.description
                }}
            />
        </>
    );
}

export default StreamEdit;