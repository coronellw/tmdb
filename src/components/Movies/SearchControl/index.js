import React from 'react';
import CustomSelect from '../../UI/CustomSelect';

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
    
    let getDateFrom = (d) => {
        let date = new Date(d);
        return date.getFullYear();
    }

    return (
        <div className="SearchControl">
            <p>Showing results for <strong>{props.genre.name}</strong></p>
            <label>Votes: </label>
            <select
                value={props.search.vote_count}
                onChange={props.voteChanged}
            >
                {
                    [...Array(11)].map((_, index) => {
                        return <option
                            key={index}
                            value={index * 1000}>
                            {index * 1000}
                        </option>
                    })
                }
            </select>
            <label> Order by: </label>
            <select value={props.search.sortBy} onChange={props.orderChanged} >
                {options.map(o => {
                    return <option key={o.value} value={o.value}>{o.display}</option>
                })}
            </select>
            <CustomSelect 
                value={getDateFrom(props.search.release_date)}
                customStyle={["black","rounded"]}
                label={"Release year"}
                changed={props.yearChanged}
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