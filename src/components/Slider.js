import { useEffect } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import { getArrSlider } from '../ultis/fn'

const Slider = () => {
    const { banner } = useSelector(state => state.app)

    useEffect(() => {
        const sliderElements = document.getElementsByClassName('slider-item')
        let min = 0
        let max = 2
        const interValid = setInterval(() => {
            const list = getArrSlider(min, max, sliderElements.length - 1)
            for (let i = 0; i < sliderElements.length; i++) {
                if (list.some(item => item === i)) {
                    sliderElements[i].style.cssText = `display: block`
                } else {
                    sliderElements[i].style.cssText = `display: none`
                }
            }
            if (min === sliderElements.length - 1) {
                min = 0
            } else {
                min += 1

            }
            if (max === sliderElements.length - 1) {
                max = 0
            } else {
                max += 1
            }
            console.log(list)
        }, 1000)
        return () => {
            interValid && clearInterval(interValid)
        }
    }, [])

    return (
        <div className='w-full overflow-hidden px-[59px]'>
            <div className='flex w-full gap-8 pt-8'>
                {banner?.map((item, index) => (
                    <img
                        key={item.encodeId}
                        src={item.banner}
                        // onClick={() => handleClickBanner(item)}
                        className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${index <= 2 ? 'block' : 'hidden'}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Slider
