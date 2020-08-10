import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import flv from 'flv.js'
import {fetchStream} from "../../store/actions";
import {getStream} from "../../store/selectors";

function StreamShow({match}) {
    const {id} = match.params
    const dispatch = useDispatch()
    const videoElementRef = useRef(null)
    const playerRef = useRef(null)

    const buildPlayer = () => {
        if (playerRef.current || !stream) return

        playerRef.current = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })

        playerRef.current.attachMediaElement(videoElementRef.current)
        playerRef.current.load()
    }

    useEffect(() => {
        dispatch(fetchStream(id))

        return () => {
            playerRef.current.destroy()
        }
    }, [dispatch, id])

    useEffect(() => {
        buildPlayer()
    })

    const stream = useSelector(getStream(id))

    return (
        stream ?
            <>
                <video ref={videoElementRef} style={{width: '100%'}} controls/>
                <h1>{stream.title}</h1>
                <h5>{stream.description}</h5>
            </> :
            <div>Loading...</div>
    );
}

export default StreamShow;