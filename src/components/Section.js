import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../ultis/icons'

const { GoChevronRight } = icons
const Section = ({ data }) => {
    const navigate = useNavigate()
    // console.log(data);
    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold'>{data?.title}</h3>
                <span className='flex items-center justify-center'>
                    <span 
                    className='text-xs text-[#808383] font-semibold'>TẤT CẢ</span>
                    <span><GoChevronRight color='#808383' size={24} /></span>
                </span>
            </div>
            <div className='flex items-start justify-between gap-[28px]'>
                {data && data?.items?.length > 0 && data.items.slice(0, 5).map(item => (
                    <div
                        className='flex flex-col gap-2 flex-auto  w-[20%] text-sm text-[#696969] cursor-pointer'
                        key={item.endcodeId}
                        onClick={() => {
                            navigate(item?.link?.split('.')[0])
                        }
                        }
                    >
                        <img src={item.thumbnail} alt='thumbnail' className='w-full h-auto rounded-lg' />
                        <span className='flex flex-col'>
                            <span className='font-semibold'>
                                {item.title
                                    ? item.title.length > 50
                                        ? `${item.title.slice(0, 50)}...`
                                        : item.title
                                    : ''}
                            </span>
                            <span>
                                {item.sortDescription
                                    ? `${item.sortDescription.slice(0, 30)}...`
                                    : item.artistsNames}
                            </span>

                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Section)
