import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'

const { GoHeart, IoMdHeart, HiOutlineDotsHorizontal, PiShuffleThin, MdSkipNext, MdSkipPrevious, PiPlayFill, PiPauseFill, CiRepeat } = icons

const Player = () => {
    const audioElement = new Audio('https://a128-z3.zmdcdn.me/76c6aef2d98813f825bae736ed1f3873?authen=exp=1718427701~acl=/76c6aef2d98813f825bae736ed1f3873/*~hmac=bf83829be56ef599b7aa4350e467acb9')
    const { curSongId, isPlaying } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [source, setSource] = useState(null)
    // const [isPlaying, setIsPlaying] = useState(false)
    console.log(isPlaying);
    console.log(audioElement);

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.getDetailSong(curSongId),
                apis.getSong(curSongId)
            ])

            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }
            if (res2.data.err === 0) {
                setSource(res2.data.data['128'])
            }
        }


        fetchDetailSong()
    }, [curSongId])

    const handleTogglePlayMusic = () => {
        // setIsPlaying(prev => !prev)
    }

    useEffect(() => {
    //   audioElement.play()
    }, [curSongId])

    return (
        <div className='bg-main-400 px-5 h-full flex cursor-pointer'>
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
                    <span title='Bật phát ngẫu nhiên'><PiShuffleThin size={24} /></span>
                    <span><MdSkipPrevious size={24} /></span>
                    <span
                        className='p-2 border border-gray-600 hover:text-main-500 rounded-full'
                        onClick={handleTogglePlayMusic}
                    >

                        {isPlaying ? <PiPauseFill size={24} /> : <PiPlayFill size={24} />}
                    </span>
                    <span><MdSkipNext size={24} /></span>
                    <span title='Bật phát lại tất cả'><CiRepeat size={24} /></span>
                </div>
                <div>
                    progress bar
                </div>
            </div>
            <div className='w-[30%] flex-auto border border-red-500'>
                volume
            </div>
        </div>
    )
}

export default Player
