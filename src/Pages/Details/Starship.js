import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {withRouter} from 'react-router-dom';
import Starship from '../../_components/Starship';
import {detailsActions} from '../../_actions';

function StarshipDetailsPage({location}) {
  const details = useSelector(state => state.details);
  const starships = useSelector(state => state.starships);

  const {resultDetails} = details;
  const {starshipsList} = starships;
  const fewStarships = starshipsList.slice(0,3);

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
            <li>MGLT: {resultDetails && resultDetails.MGLT}</li>
            <li>Cargo Capacity: {resultDetails && resultDetails.cargo_capacity}</li>
            <li>Consumables: {resultDetails && resultDetails.consumables}</li>
            <li>Cost In Credits: {resultDetails && resultDetails.cost_in_credits}</li>
            <li>Crew: {resultDetails && resultDetails.crew}</li>
            <li>Hyperdrive Rating: {resultDetails && resultDetails.hyperdrive_rating}</li>
            <li>Length: {resultDetails && resultDetails.length}</li>
            <li>Manufacturer: {resultDetails && resultDetails.manufacturer}</li>
            <li>Max Atmosphering Speed: {resultDetails && resultDetails.max_atmosphering_speed}</li>
            <li>Model: {resultDetails && resultDetails.model}</li>
            <li>Passengers: {resultDetails && resultDetails.passengers}</li>
            <li>Starship Class: {resultDetails && resultDetails.starship_class}</li>            
        </ul>
      </div>
      </div>
      <div class="recently">
        <h2>Recently Viewed Starships</h2>
      </div>
      <hr/>
      <div class="row ">
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
      {/* <div class="grid-container">
        {
          fewStarships.length > 0 ? fewStarships.map((row) => {
            return(
              <Starship row={row} />
            );
          }) 
          :
          null
        }
      </div> */}
    </section>
  )
}

export default withRouter(StarshipDetailsPage);