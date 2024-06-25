import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Lists, AudioLoading } from '../../components'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import icons from '../../ultis/icons'

const { PiPlayFill } = icons

const Album = () => {

    const { pid } = useParams()
    const { isPlaying } = useSelector(state => state.music)
    const [playlistData, setPlaylistData] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchDetailPlaylist = async () => {
            dispatch(actions.loading(true))
            const res = await apis.apiGetDetailPlaylist(pid)
            dispatch(actions.loading(false))
            if (res?.data.err === 0) {
                setPlaylistData(res.data?.data)
                dispatch(actions.setPlaylist(res?.data?.data?.song?.items))
            }
        }
        fetchDetailPlaylist()
    }, [pid])

    return (
        <div className='flex relative gap-8 w-full h-full px-[59px]'>
            <div className='flex-none w-1/4 flex flex-col items-center gap-2'>
                <div className='w-full relative overflow-hidden cursor-pointer'>
                    <img
                        src={playlistData?.thumbnailM}
                        alt='thumbnail'
                        className={`w-full object-contain shadow-md ${isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-md animate-rotate-center-pause'}`}
                    />
                    <div className={`absolute top-0 bottom-0 left-0 right-0 hover:bg-overplay-30 text-white flex items-center justify-center ${isPlaying && 'rounded-full'}`}>
                        <span className='p-2 rounded-full border border-white'>
                            {isPlaying ? <AudioLoading /> : <PiPlayFill size={24} />}
                        </span>
                    </div>
                </div>
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
            <Scrollbars style={{ width: '100%', height: '80%' }}>
                <div className='flex-auto'>
                    <span className='flex gap-1 text-sm'>
                        <span className='text-gray-500'>Lời tựa</span>
                        <span className='text-gray-700'>{playlistData?.description}</span>
                    </span>
                    <Lists totalDuration={playlistData?.song?.totalDuration} />
                </div>
            </Scrollbars>
        </div>
    )
}

export default Album
