import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchStream} from "../../store/actions";
import {getStream} from "../../store/selectors";

function StreamShow({match}) {
    const {id} = match.params
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStream(id))
    }, [dispatch, id])

    const stream = useSelector(getStream(id))

    return (
        stream?
        <>
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </>:
            <div>Loading...</div>
    );
}

export default StreamShow;