import React from 'react';
import Starship from '../../_components/Starship';
import { Link } from 'react-router-dom'

function PopularStarships({starships}) {
  const fewStarships = starships.slice(0,6);

  return (
    <section id="starships" class="starships section-bg">
      <div class="container">
        <header class="section-header">
          <h2>Popular Starships</h2>
        </header>
        <div class="row">
          {
            fewStarships.length > 0 ? fewStarships.map((row) => {
              return(    
                <div class="col-lg-4 col-md-6 col-sm-12">       
                  <Starship row={row} />   
                </div>          
              );
            }) 
            :
            null
          } 
        </div>
      </div>
      <div >            
        <Link 
          class="button"  
          to='starship'
        >
           View More
        </Link>  
      </div>            
    </section>
  )
}

export default PopularStarships;