import React, { useEffect } from 'react';
import Banner from './banner';
import { useNavigate } from "react-router-dom";

const baseCls = 'home'

const Home = () => {
    const navogate = useNavigate()
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navogate('/black-jack')
        }, 2000)

        return () => clearTimeout(timeoutId)
    }, [])
    return (
        <div className={`${baseCls}`}>
            <Banner />
        </div>
    )
}

export default Home
