import React, {useEffect} from 'react';
import Modal from "../Modal";
import history from "../../history";
import {useDispatch, useSelector} from "react-redux";
import {deleteStream, fetchStream} from "../../store/actions";
import {Link} from "react-router-dom";
import {getStream} from "../../store/selectors";

function StreamDelete({match}) {

    const {id} = match.params
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStream(id))
    }, [dispatch, id])

    const stream = useSelector(getStream(id))

    const onDelete = () => {
        dispatch(deleteStream(id))
    }

    const renderActions = () => (
        <>
            <button
                className="ui button negative"
                onClick={onDelete}
            >
                Delete
            </button>
            <Link
                className="ui button"
                to={'/'}
            >
                Cancel
            </Link>
        </>
    )

    return (
        <Modal
            title='Delete Stream'
            content={stream && `Are you sure that you want to delete the stream with title: ${stream.title}`}
            actions={renderActions()}
            onDismiss={() => history.push('/')}
        />
    );
}

export default StreamDelete;