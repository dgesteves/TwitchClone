import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {signIn, signOut} from "../store/actions";
import {getIsSignedIn} from "../store/selectors";

function GoogleAuth() {

    const auth = useRef(null)
    const dispatch = useDispatch()
    const isSignedIn = useSelector(getIsSignedIn)

    const onAuthChange = useCallback(isSignedIn => {
        isSignedIn ? dispatch(signIn(auth.current.currentUser.get().getId()))
            : dispatch(signOut())
    }, [dispatch])

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '483283350576-37sifu7rnmg24fcpd3d5ivdt0biqv5j4.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                auth.current = window.gapi.auth2.getAuthInstance()
                onAuthChange(auth.current.isSignedIn.get())
                auth.current.isSignedIn.listen(onAuthChange)
            })
        })
    }, [onAuthChange])


    const onSignInClick = () => {
        auth.current.signIn()
    }

    const onSignOutClick = () => {
        auth.current.signOut()
    }

    const renderAuthButton = () => {
        if (isSignedIn === null) return null
        return isSignedIn ? (
            <button
                className='ui red google button'
                onClick={onSignOutClick}
            >
                <i className='google icon'/>
                Sign Out
            </button>
        ) : (
            <button
                className='ui red google button'
                onClick={onSignInClick}
            >
                <i className='google icon'/>
                Sign In with Google
            </button>
        )
    }


    return (
        <div>
            {renderAuthButton()}
        </div>
    );
}

export default GoogleAuth;