import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchStreams} from "../../store/actions";
import {Link} from "react-router-dom";
import {getCurrentUserId, getIsSignedIn, getStreams} from "../../store/selectors";

function StreamList() {

    const dispatch = useDispatch()
    const streams = useSelector(getStreams)
    const currentUserId = useSelector(getCurrentUserId)
    const isSignedIn = useSelector(getIsSignedIn)

    useEffect(() => {
        dispatch(fetchStreams())
    }, [dispatch])

    const renderAdminOptions = stream => (
        (stream.userId === currentUserId) && (
            <div className="right floated content">
                <Link
                    className="ui button primary"
                    to={`/streams/edit/${stream.id}`}
                >
                    Edit
                </Link>
                <Link
                    className="ui button negative"
                    to={`/streams/delete/${stream.id}`}
                >
                    Delete
                </Link>
            </div>
        )
    )

    const renderList = () => (
        streams.map(stream => (
            <div className='item' key={stream.id}>
                {renderAdminOptions(stream)}
                <i className='large middle aligned icon camera'/>
                <div className="content">
                    <Link
                        className='header'
                        to={`/streams/${stream.id}`}>
                        {stream.title}
                    </Link>
                    <div className="description">
                        {stream.description}
                    </div>
                </div>
            </div>
        ))
    )

    const renderCreate = () => (
        isSignedIn && (
            <div style={{textAlign: 'right'}}>
                <Link className='ui button primary' to='/streams/new'>
                    Create Stream
                </Link>
            </div>
        )
    )


    return (
        <div>
            <h2>Streams</h2>
            <div className='ui celled list'>
                {renderList()}
            </div>
            {renderCreate()}
        </div>
    );
}

export default StreamList;