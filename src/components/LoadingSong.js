import React, { memo } from 'react'
import { RotatingLines } from 'react-loader-spinner'

const LoadingSong = () => {
    return (
        <div>
            <RotatingLines
                visible={true}
                width="24"
                color="#404848"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
            />
        </div>
    )
}

export default memo(LoadingSong)
