import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Lists } from '../../components'

const Album = () => {

    const { title, pid } = useParams()

    const [playlistData, setPlaylistData] = useState({})

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            const res = await apis.apiGetDetailPlaylist(pid)
            if (res?.data.err === 0) {
                setPlaylistData(res.data?.data)
            }
            console.log(res);
        }

        fetchDetailPlaylist()

    }, [pid])

    return (
        <div className='flex gap-8 w-full px-[59px]'>
            <div className='flex-none w-1/4  flex flex-col items-center gap-2'>
                <img src={playlistData?.thumbnailM} alt='thumbnail' className='w-full object-contain rounded-md shadow-md' />
                <div className='flex flex-col text-center items-center gap-1'>
                    <h3 className='text-[20px] text-gray-800 font-bold'>{playlistData?.title}</h3>
                    <span className='flex gap-1 items-center text-xs text-gray-500'>
                        <span>Cập nhật: </span>
                        <span>
                            {moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}
                        </span>
                    </span>
                    <span className='flex gap-1 items-center text-xs text-gray-500'>
                        {playlistData?.artistsNames}
                    </span>
                    <span className='flex gap-1 items-center text-xs text-gray-500'>
                        {`${Math.round(playlistData?.like / 1000)}K người yêu thích`}
                    </span>
                </div>
            </div>
            <div className='flex-auto border border-blue-500 overflow-scroll'>
                <span className='flex gap-1 text-sm'>
                    <span className='text-gray-600'>Lời tựa</span>
                    <span>{playlistData?.description}</span>
                </span>
                <Lists songs={playlistData?.song?.items} totalDuration={playlistData?.song?.totalDuration}/>
            </div>
        </div>
    )
}

export default Album
