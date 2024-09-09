import React, { useEffect, useState } from 'react'
import './ScrollProgressBar.css'

const ScrollProgressBar = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0)

    const handleScroll = ()=>{
        const howMuchScrolled = document.body.scrollTop || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (howMuchScrolled/ docHeight) * 100;

        setScrollPercentage(scrolled)
    }

    useEffect (()=>{
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', ()=>{})
        }
    }, [])
    
  return (

    <div className='progressbar-container'>
        <div className='scroll-progress-tracking-container'>
            <div className="current-progress-bar" style={{width:`${scrollPercentage}%`}}></div>

        </div>  
    </div>
    
  )
}

export default ScrollProgressBar