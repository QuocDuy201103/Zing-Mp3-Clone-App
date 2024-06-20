import React, { useEffect } from "react";
import { Slider, Section } from "../../components";
import * as api from '../../apis'

const Home = () => {


    return (
        <div className="overflow-y-auto">
            <Slider />
            <Section />
        </div>
    )
}

export default Home