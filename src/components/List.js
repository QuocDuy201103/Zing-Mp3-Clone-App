import React, { memo } from 'react'
import icons from '../ultis/icons'
import moment from 'moment'

const { PiMusicNotesSimpleThin } = icons

const List = ({ songData }) => {
    // console.log({songData});

    return (
        <div className='flex justify-between items-center p-[10px]'>
            <div className='flex items-center gap-2 w-[50%]'>
                <span><PiMusicNotesSimpleThin /></span>
                <img src={songData?.thumbnail} alt='thumbnail' className='w-10 h-10 object-cover rounded-md' />
                <span className='flex flex-col'>
                    <span className='font-semibold text-gray-600 text-sm'>{songData?.title}</span>
                    <span className='text-xs text-gray-500'>{songData?.artistsNames}</span>
                </span>
            </div>
            <div className='w-[40%] flex justify-start items-center text-gray-400 text-xs'>
                {songData?.album?.title}
            </div>
            <div className='w-[10%] flex justify-center items-center text-gray-400 text-xs'>
                {moment.utc((songData?.duration)*1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default memo(List)
