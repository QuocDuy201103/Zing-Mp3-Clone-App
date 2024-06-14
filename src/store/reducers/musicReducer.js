import actionTypes from "../actions/actionTypes";

const initState = {
    curSongId: null,
    isPlaying: false
}

const musicReducer = (state = initState, action) => {
    //type: name action
    // action: post from view
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.songId || null
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag
            }

        default:
            return state
    }
}

export default musicReducer