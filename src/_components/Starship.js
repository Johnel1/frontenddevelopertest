import React from 'react';
import './starship.css';
import { Link } from 'react-router-dom'
import {numberWithCommas} from '../_helpers';

function Starship({row}) {

  return (    
    <div class="card">
      <div class="card-image-wrapper">
        <div class="card-image"></div>
      </div>
      <div class="card-body-wrapper">
        <div class="card-body">
          <h4>{row && row.name}</h4>
          <p>{row && row.model}</p>
          <p>{numberWithCommas(row && row.cargo_capacity)}</p>
          <Link 
            class="readmore" 
            to={
              { 
                pathname: `/starshipdetails`,
                myCustomProps: row && row.url
              }
            }
          >
            Read More
          </Link>  
        </div>
      </div>
    </div>
  )
}

export default Starship;