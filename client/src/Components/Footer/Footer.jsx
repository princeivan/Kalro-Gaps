import React from 'react'
import './Footer.css'

const Footer = () => {
    const date = new Date();
  const year = date.getFullYear();

  return (
    <div className='footer'>
      &copy; {year} All Rights Reserved
      <p></p>
    </div>
  )
}

export default Footer