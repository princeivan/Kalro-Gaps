import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import './Gaps.css'

const Gaps = ({filtereddata, handleResultSelect}) => {
    const { id } = useParams();
  return (
     <div className="crops-container">
       {filtereddata.length > 0 ? (
        <>
          {filtereddata.map((result, index) => (
          <div key={index} className="crop-item">
            <div className="image-container1">
              <img src={result.image} alt={result.title} className="crop-image" />
               <h3 key={index} onClick={() => handleResultSelect(result)} style={{textDecoration:"none", color:"black", fontWeight:'bold'}}>
                <NavLink style={{textDecoration:"none", color:"black", fontWeight:'bold'}} to={`/gaps-detail/${result.id}/` }>{result.title}</NavLink> 
               </h3>
            </div>
          </div>
        ))} 
      </>
     
      
    ) : (
      <p>No results found</p>
    )}
  </div>
  )
}

export default Gaps