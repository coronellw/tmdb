import React from 'react';
import CustomSelect from '../../UI/CustomSelect';
import './SearchControl.css';

const searchControl = (props) => {
    let options = [{value: "popularity.asc", display: "Popularity asc"},
    {value: "popularity.desc", display: "Popularity desc"},
    {value: "release_date.asc", display: "Release date asc"},
    {value: "release_date.desc", display: "Release date desc"},
    {value: "revenue.asc", display: "Revenue asc"},
    {value: "revenue.desc", display: "Revenue desc"},
    {value: "primary_release_date.asc", display: "Primary release date asc"},
    {value: "primary_release_date.desc", display: "Primary release date desc"},
    {value: "original_title.asc", display: "Original Title asc"},
    {value: "original_title.desc", display: "Original Title desc"},
    {value: "vote_average.asc", display: "Vote Average asc"},
    {value: "vote_average.desc", display: "Vote Average desc"},
    {value: "vote_count.asc", display: "Vote Count asc"},
    {value: "vote_count.desc", display: "Vote count desc"}];

    return (
        <div className="SearchControl">
            

            <CustomSelect 
                value={props.search.withGenre}
                customStyle={["black","rounded"]}
                label={"Genre"}
                changed={(e)=>props.genreChanged(e.target.value)}
                width={240}
                options={
                    props.genres.map( g => {
                        return {value: g.id, display: g.name}
                    })
                }
            />
            <CustomSelect
                value={props.search.voteCount}
                customStyle={["black","rounded"]}
                label={"Votes"}
                changed={props.voteChanged}
                width={240}
                options={
                    [...Array(11)].map((_, index) => {
                        return { value:(index * 1000), display:(index * 1000)}
                    })
                }
            />
            <CustomSelect 
                value={props.search.sortBy} 
                customStyle={["black","rounded"]}
                label={"Order by "}
                changed={props.orderChanged} 
                width={240}
                options={options}
            />
            <CustomSelect 
                value={props.search.releaseDate}
                customStyle={["black","rounded"]}
                label={"Release year"}
                changed={props.yearChanged}
                width={140}
                options={
                    [...Array(50)].map((_,index) => {
                        return {value:(2018-index),display: (2018-index)}
                    })
                }
            />
        </div>
    );
}

export default searchControl;