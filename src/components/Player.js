import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import moment from 'moment'
import { toast } from 'react-toastify'
import LoadingSong from './LoadingSong'


const { GoHeart,
    HiOutlineDotsHorizontal,
    PiShuffleThin,
    MdSkipNext,
    MdSkipPrevious,
    PiPlayFill,
    PiPauseFill,
    PiRepeatThin,
    PiRepeatOnceThin,
    RiPlayListLine,
    CiVolumeHigh,
    CiVolumeMute,
    CiVolume } = icons
var intervalId
const Player = ({ setIsShowRightSideBar }) => {
    const { curSongId, isPlaying, songs } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [audio, setAudio] = useState(new Audio())
    const [curSeconds, setCurSeconds] = useState(0)
    const [isShuffle, setIsShuffle] = useState(false)
    const [repeatMode, setRepeatMode] = useState(0)
    const [isLoadedSource, setIsLoadedSource] = useState(true)
    const [volume, setVolume] = useState(100)

    const dispatch = useDispatch()
    const thumbRef = useRef()
    const trackRef = useRef()

    useEffect(() => {
        const fetchDetailSong = async () => {
            setIsLoadedSource(false)
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            setIsLoadedSource(true)

            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }
            if (res2.data.err === 0) {
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            } else {
                audio.pause()
                setAudio(new Audio())
                dispatch(actions.play(false))
                toast.warn(res2.data.msg)
                setCurSeconds(0)
                // audio.currentTime = 0
                thumbRef.current.style.cssText = `right: 100%`
            }
        }
        fetchDetailSong()
    }, [curSongId])


    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.pause()
        audio.load()
        if (isPlaying && thumbRef.current) {
            audio.play()
            intervalId = setInterval(() => {
                let percentOfProgBar = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percentOfProgBar}%`
                setCurSeconds(Math.round(audio.currentTime))
            }, 100)
        }
    }, [audio])

    useEffect(() => {
        const handleEnded = () => {
            console.log(isShuffle);
            if (isShuffle) {
                handleShuffle()
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handleNextSong()
            } else {
                audio.pause()
                dispatch(actions.play(false))
            }
        }
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.addEventListener('ended', handleEnded)
        }

    }, [audio, isShuffle, repeatMode]
    )

    useEffect(() => {
        audio.volume = volume / 100
    }, [volume]
    )

    const handleTogglePlayMusic = async () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        } else {
            audio.play()
            dispatch(actions.play(true))
        }
    }

    const handleProgressBar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        audio.currentTime = (percent * songInfo.duration) / 100
        setCurSeconds(Math.round(percent * songInfo.duration) / 100)
    }

    const handleNextSong = () => {
        if (songs) {
            let curSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) curSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[curSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }
    }
    const handlePrevSong = () => {
        if (songs) {
            let curSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) curSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[curSongIndex - 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length) - 1
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
        dispatch(actions.play(true))
    }

    const handleRepeatOne = () => {
        audio.play()
    }


    return (
        <div className='bg-main-400 px-5 h-full flex'>
            <div className='w-[30%] flex-auto flex items-center gap-3'>
                <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover rounded-md' />
                <div className='flex flex-col'>
                    <span className='font-semibold text-gray-600 text-sm'>{songInfo?.title}</span>
                    <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
                </div>
                <div className='flex gap-4 pl-2'>
                    <span>
                        <GoHeart size={16} />
                    </span>
                    <span>
                        <HiOutlineDotsHorizontal size={16} />
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex-auto flex items-center justify-center flex-col border border-red-500 gap-2 py-2 '>
                <div className='flex gap-8 justify-center items-center '>
                    <span
                        className={`cursor-pointer ${isShuffle ? 'text-main-500' : 'text-[#404848]'}`}
                        title='Bật phát ngẫu nhiên'
                        onClick={() => setIsShuffle(prev => !prev)}
                    >
                        <PiShuffleThin size={24} />
                    </span>
                    <span
                        onClick={handlePrevSong}
                        className={`${!songs ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'}`}>
                        <MdSkipPrevious size={24} />
                    </span>
                    <span
                        className='p-2 border border-gray-600 hover:text-main-500 rounded-full cursor-pointer'
                        onClick={handleTogglePlayMusic}
                    >
                        {!isLoadedSource ? <LoadingSong /> : isPlaying ? <PiPauseFill size={24} /> : <PiPlayFill size={24} />}
                    </span>
                    <span
                        onClick={handleNextSong}
                        className={`${!songs ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer'}`}>
                        <MdSkipNext size={24} />
                    </span>

                    <span
                        className={`cursor-pointer ${repeatMode ? 'text-main-500' : 'text-[#404848]'}`}
                        title='Bật phát lại tất cả'
                        onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}
                    >
                        {repeatMode === 1 ? <PiRepeatOnceThin size={24} /> : <PiRepeatThin size={24} />}

                    </span>
                </div>
                <div className='flex w-full items-center justify-center text-xs'>
                    <span className='mr-[10px]'>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
                    <div
                        ref={trackRef}
                        className='w-full h-[3px] hover:h-[6px] bg-[rgba(0,0,0,0.1)] m-auto relative rounded-l-full rounded-r-full cursor-pointer'
                        onClick={handleProgressBar}
                    >
                        <div ref={thumbRef} className='absolute top-0 left-0 h-full bg-[#0e8080] rounded-l-full rounded-r-full'></div>
                    </div>
                    <span className='ml-[10px]'>{moment.utc((songInfo?.duration) * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className='w-[30%] flex-auto border border-red-500 flex gap-4 items-center justify-end '>
                <div className='flex gap-2 items-center'>
                    <span
                        className='p-[5px]'
                        onClick={() => setVolume(prev => +prev === 0 ? 70 : 0)}
                    >
                        {+volume >= 50 ? <CiVolumeHigh /> : +volume === 0 ? <CiVolumeMute /> : <CiVolume />}
                    </span>
                    <input
                        className='w-[70px] h-1 cursor-pointer'
                        type='range'
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e)=> setVolume(e.target.value)}
                    />
                </div>
                <span
                    className='p-[5px] h-[30px] w-[28px] rounded-md flex items-center justify-center text-white bg-main-500 hover:opacity-90 cursor-pointer'
                    onClick={() => setIsShowRightSideBar(prev => !prev)}
                >
                    <RiPlayListLine size={16} />
                </span>
            </div>
        </div>
    )
}

export default Player
