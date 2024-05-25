import axios from "../axios";

export const getHome = () => new Promise(async(resovle, reject) => {
    try {
        const response = await axios({
            url: '/home',
            method: 'get'
        })
        resovle(response)
    } catch (error) {
        reject(error)
    }
})   
