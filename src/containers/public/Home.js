import React, { useEffect } from "react";
import { Slider, Section } from "../../components";
import * as api from '../../apis'
import { useSelector } from 'react-redux'


const Home = () => {
    const { remixMusic, seasonSong, chillSong, top100, albumHot } = useSelector(state => state.app)


    return (
        <div className="overflow-y-auto">
            <Slider />
            <Section data={chillSong} />
            <Section data={remixMusic} />
            <Section data={seasonSong} />
            <Section data={top100} />
            <Section data={albumHot} />
            <div className="w-full h-[500px]"></div>
        </div>
    )
}

export default Home