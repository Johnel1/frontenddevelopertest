import React from 'react';
import './planet.css';
import { Link } from 'react-router-dom'
import planet1 from '../_assets/planet-1.jpg';

function Planet({row}) {

  return (    
    <div >
      <Link 
        to={
            { 
            pathname: `/planetdetails`,
            myCustomProps: row && row.url
            }
        }
      >        
        <div class="box">
        <img src={planet1} alt=""  />
        <div class='bottom'>{row.name}</div>   
        </div>              
      </Link> 
    </div>
  )
}

export default Planet;