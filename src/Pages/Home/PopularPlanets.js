import React from 'react';
// import './index.scss';
import Planet from '../../_components/Planet';
import { Link } from 'react-router-dom'

function PopularPlanets({planet}) {
    const fewPlanet = planet.slice(0,3);

  return (
    <section  class="planet section-bg">
      <div class="container">
        <header class="section-header">
          <h2>Popular Planets</h2>
        </header>
        <div class="row">
        {/* <div class="col-sm"> */}
        {
              fewPlanet.length > 0 ? fewPlanet.map((row) => {
              return(    
                <div class="col-lg-4 col-md-6 col-sm-12">       
                  <Planet row={row} />   
                </div>          
              );
              }) 
              :
              null
            } 
            {/* </ScrollAnimation> */}
          </div>
        </div>
        <div >            
        <Link 
          class="button"  
          to='character'
        >
           View More
        </Link>  
      </div>            
    </section>
  )
}

export default PopularPlanets;