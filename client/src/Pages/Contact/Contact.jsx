import React from 'react'

const Contact = () => {
  return (
    <div className="contact-container">
      
    {/* Left side: Contact Information */}
    <div className="contact-info">
      <h2>Contact Us</h2>
      <p><strong>Address:</strong> KALRO, Kaptagat Rd, Nairobi, Kenya</p>
      <p><strong>Email:</strong> info@kalro.org</p>
      <p><strong>Phone:</strong> (+254) 0722 206 986</p>
      <p><strong>Working Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM</p>
    </div>
    
    {/* Right side: Map */}
    <div className="contact-map">
      <iframe
        title="KALRO Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127934.18346335432!2d36.6879847!3d-1.2620059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f19a5211aed4f%3A0x98367c0a3f7e205b!2sKALRO%20Headquarters!5e0!3m2!1sen!2ske!4v1694263412467!5m2!1sen!2ske"
        width="100%"
        height="400"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
    
  </div>
  )
}

export default Contact