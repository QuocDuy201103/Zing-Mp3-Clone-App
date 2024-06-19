import React, { memo } from 'react'
import List from './List';
import icons from '../ultis/icons';
import moment from 'moment';
import { useSelector } from 'react-redux';

const { PiSortAscendingFill, PiSortAscendingThin, BsDot } = icons

const Lists = ({ totalDuration }) => {
  // console.log({ songs, totalDuration });
  const { songs } = useSelector(state => state.music)
  return (
    <div className='w-full flex flex-col text-gray-600'>
      <div className=' flex justify-between items-center text-xs font-semibold p-[10px]'>
        <span className='w-[50%] flex gap-2'>
          <span><PiSortAscendingThin size={16} /></span>
          <span>BÀI HÁT</span>
        </span>
        <span className='w-[40%]'>ALBUM</span>
        <span className='w-[10%]'>THỜI GIAN</span>
      </div>
      <div className='flex flex-col'>
        {songs?.map(item => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
      <span className='flex gap-1 items-center text-[13px] py-[10px] border-t border-[#c3cece]'>
        <span>{`${songs?.length} bài hát`}</span>
        <span><BsDot size={20} /></span>
        <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span>
      </span>
    </div>
  )
}

export default memo(Lists)
