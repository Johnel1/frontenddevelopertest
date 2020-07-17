import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
// import './index.scss';
import {withRouter} from 'react-router-dom';
import Character from '../../_components/Character';
import {detailsActions} from '../../_actions';

function CharacterDetailsPage({location}) {
  const details = useSelector(state => state.details);
  const people = useSelector(state => state.people);
  const {resultDetails} = details;
  const {peopleList} = people;
  const fewPeople = peopleList.slice(0,2);

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
            <li>Birth: {resultDetails && resultDetails.birth_year}</li>
            <li>Eye color: {resultDetails && resultDetails.eye_color}</li>
            <li>Gender: {resultDetails && resultDetails.gender}</li>
            <li>Hair Color: {resultDetails && resultDetails.hair_color}</li>
            <li>Height: {resultDetails && resultDetails.height}</li>
            <li>Mass: {resultDetails && resultDetails.mass}</li>
            <li>Skin Color: {resultDetails && resultDetails.skin_color}</li>
        </ul> 
        </div>      
        </div> 
        <div class="recently">
        <h2>Recently Viewed Characters</h2>
      </div>
      <hr/>
      <div class="row ">
        {
          fewPeople.length > 0 ? fewPeople.map((row) => {
            return(
                <div class="col-lg-6 col-md-6 col-sm-12">       
              <Character row={row} image={row.image} />
              </div>
            );
          }) 
          :
          null
        }
       
        </div>
      </div>
    </section>
  )
}

export default withRouter(CharacterDetailsPage);