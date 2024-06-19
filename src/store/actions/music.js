import actionTypes from "./actionTypes";
import * as apis from '../../apis'
import { type } from "@testing-library/user-event/dist/type";

export const setCurSongId = (songId) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    songId
})

export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag
})

export const playAlbum = (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag
})

export const setPlaylist = (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})

// export const fetchDetailPlaylist = (pid) => async (dispatch) => {
//     try {
//         const res = await apis.apiGetDetailPlaylist(pid)
//         if (res?.data.err === 0) {
//             dispatch({
//                 type: actionTypes.PLAYLIST,
//                 songs: res.data?.data.song?.items
//             })
//         }

//     } catch (error) {
//         dispatch({
//             type: actionTypes.PLAYLIST,
//             songs: null
//         })
//     }
// }
