import React from 'react';
import Character from '../../_components/Character';
import { Link } from 'react-router-dom'

function PopularCharacters({people}) {
  const fewPeople = people.slice(0,4);

  return (
    <section class=" section-bg">
      <div class="container">
        <header class="section-header">
          <h2>Popular Characters</h2>
        </header>
        <div class="row ">
          {
            fewPeople.length > 0 ? fewPeople.map((row) => {
            return(    
              <div class="col-lg-6 col-md-6 col-sm-12">       
                <Character row={row} />   
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
          to='character'
        >
           View More
        </Link>  
      </div>            
    </section>
  )
}

export default PopularCharacters;