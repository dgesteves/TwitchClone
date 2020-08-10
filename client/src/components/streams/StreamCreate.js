import React from 'react';
import {useDispatch} from "react-redux";
import {createStream} from "../../store/actions";
import StreamForm from "./StreamForm";

function StreamCreate() {

    const dispatch = useDispatch()

    const onSubmit = (formValues) => {
        dispatch(createStream(formValues))
    }

    return (
        <>
            <h3>Create a Stream</h3>
            <StreamForm onSubmit={onSubmit}/>
        </>
    );
}


export default StreamCreate;