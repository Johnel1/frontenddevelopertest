import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {withRouter} from 'react-router-dom';
import Planet from '../../_components/Planet';
import {detailsActions} from '../../_actions';
import {numberWithCommas} from '../../_helpers';

function PlanetDetailsPage({location}) {
  const details = useSelector(state => state.details);
  const planet = useSelector(state => state.planet);
  const {resultDetails} = details;
  const {planetsList} = planet;
  const fewPlanet = planetsList.slice(0,2);

  const dispatch =  useDispatch();

  useEffect((model={}) => {
    const {myCustomProps} = location;

    dispatch(detailsActions.getDetails(myCustomProps));
  }, []);

  return (
    <section>
      <div class="container"> 
        <div class="row "> 
          <div class="col-lg-8 mx-auto"> 
            <div class="section-title">
              <h2>{resultDetails && resultDetails.name}</h2>
            </div>
          </div>
          <div class="col-lg-8 mx-auto"> 
            <ul class="details">
              <li>Climate: {resultDetails && resultDetails.climate}</li>
              <li>Diameter: {resultDetails && numberWithCommas(resultDetails.diameter)}</li>
              <li>Gravity: {resultDetails && resultDetails.gravity}</li>
              <li>Orbital Period: {resultDetails && resultDetails.orbital_period}</li>
              <li>Population: {resultDetails && numberWithCommas(resultDetails.population)}</li>
              <li>Rotation Period: {resultDetails && resultDetails.rotation_period}</li>
              <li>Surface Water: {resultDetails && resultDetails.surface_water}</li>
              <li>Terrain: {resultDetails && resultDetails.terrain}</li>
            </ul>
          </div>
        </div>
        <div class="recently">
          <h2>Recently Viewed Planets</h2>
        </div>
        <hr/>
        <div class="row ">
          {
            fewPlanet.length > 0 ? fewPlanet.map((row) => {
              return(
                <div class="col-lg-6 col-md-6 col-sm-12">       
                  <Planet row={row} />
                </div>
                );
            }) 
            :
            null
          }       
        </div>
        <div class="pagination">
          <a href="#"><span class="circle"></span></a>
          <a class='active' href="#"><span class="circle"></span></a>
          <a href="#"><span class="circle"></span></a>
        </div>  
      </div>
    </section>
  )
}

export default withRouter(PlanetDetailsPage);