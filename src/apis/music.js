import axios from "../axios";

export const getSong = (songId) => new Promise(async(resovle, reject) => {
    try {
        const response = await axios({
            url: '/song',
            method: 'get',
            params: {id: songId}
        })
        resovle(response)
    } catch (error) {
        reject(error)
    }
})   


export const getDetailSong = (songId) => new Promise(async(resovle, reject) => {
    try {
        const response = await axios({
            url: '/infosong',
            method: 'get',
            params: {id: songId}
        })
        resovle(response)
    } catch (error) {
        reject(error)
    }
})   
