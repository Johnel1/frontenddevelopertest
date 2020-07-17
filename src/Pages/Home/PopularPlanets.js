import React from 'react';
import Planet from '../../_components/Planet';
import { useDispatch, useSelector } from "react-redux";
import {planetActions} from '../../_actions';

function PopularPlanets() {
  const planets = useSelector(state => state.planet);
  const dispatch =  useDispatch();
  const {planetsList} = planets;

  const fewPlanet = planetsList.slice(0,3);

  const handlePreviousPage = () => {
    const { previous} = planets && planets.pagination; 
    const model = {
      page: previous
    }
    
    dispatch(planetActions.getPlanets(model));
  }

  const handleNextPage = () => {
    const { next} = planets && planets.pagination; 
    const model = {
      page: next
    }
    
    dispatch(planetActions.getPlanets(model));
  }

  const { next, previous} = planets && planets.pagination; 


  return (
    <section  class="planet section-bg">
      <div class="container">
        <header class="section-header">
          <h2>Popular Planets</h2>
        </header>
        <div class="row">
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
        </div>
      </div>
      <div class="pagination">
        <a disable={previous === null} onClick={handlePreviousPage} href="#"><span class="circle"></span></a>
        <a class='active' onClick={handleNextPage} href="#"><span class="circle"></span></a>
        <a disable={next === null} onClick={handleNextPage} href="#"><span class="circle"></span></a>
      </div>           
    </section>
  )
}

export default PopularPlanets;