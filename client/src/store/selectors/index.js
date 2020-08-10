export const getStream = id => state => state.streams[id]
export const getIsSignedIn = state => state.auth.isSignedIn
export const getStreams = state => Object.values(state.streams)
export const getCurrentUserId = state => state.auth.userId