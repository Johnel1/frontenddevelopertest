import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Character from '../../_components/Character';
import { Link } from 'react-router-dom'
import {peopleActions} from '../../_actions';

function StarwarCharacters() {
    const people = useSelector(state => state.people);
  const {peopleList} = people;
  const dispatch =  useDispatch();

  const handlePreviousPage = (event, pages) => {
    const { previous} = people && people.pagination; 
    const model = {
      page: previous
    }
    
    dispatch(peopleActions.getPeople(model));
  }

  const handleNextPage = (event, pages) => {
    const { next} = people && people.pagination; 
    const model = {
      page: next
    }
    
    dispatch(peopleActions.getPeople(model));
  }

  const { count, next, previous} = people && people.pagination; 

  return (
    <section class=" section-bg">
      <div class="container">
        <header class="section-header">
          <h2>Starwars Characters</h2>
        </header>
        <div class="row ">
        {/* <div class='filter'>
          <label for="gender">Filter:</label>
          <select name="gender" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="n/a">N/A</option>
          </select>
        </div><br/> */}
        <div class="col-lg-12"> 
        <label for="gender">Filter:</label>
          <select name="gender" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="n/a">N/A</option>
          </select>
        </div>
        {/* <div class="col-sm"> */}
        {
              peopleList.length > 0 ? peopleList.map((row) => {
              return(    
                <div class="col-lg-6 col-md-6 col-sm-12">       
                  <Character row={row} />   
                </div>          
              );
              }) 
              :
              null
            } 
            {/* </ScrollAnimation> */}
          </div>
        </div>
      <div class="pagination">
        <p class='number'>1 - 10 of {count}</p>
        <a disable={previous === null} onClick={handlePreviousPage}>❮</a>
        <a disable={next === null} onClick={handleNextPage}>❯</a>
      </div>           
    </section>
  )
}

export default StarwarCharacters;