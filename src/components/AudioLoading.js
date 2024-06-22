import React, { memo } from 'react'
import { Audio } from 'react-loader-spinner'

const AudioLoading = () => {
    return (
        <div>
            <Audio
                height="24"
                width="24"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle
                wrapperClass
            />
        </div>
    )
}

export default memo(AudioLoading)
