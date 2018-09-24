import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './SearchControl.css';
import CustomSelect from '../../UI/CustomSelect';

import {
    setSortBy,
    setReleaseDate,
    setVoteCount,
    setWithGenre,
} from '../../../store/actions/actionCreators';

const searchControl = (props) => {
    let options = [{ value: "popularity.asc", display: "Popularity asc" },
    { value: "popularity.desc", display: "Popularity desc" },
    { value: "release_date.asc", display: "Release date asc" },
    { value: "release_date.desc", display: "Release date desc" },
    { value: "revenue.asc", display: "Revenue asc" },
    { value: "revenue.desc", display: "Revenue desc" },
    { value: "primary_release_date.asc", display: "Primary release date asc" },
    { value: "primary_release_date.desc", display: "Primary release date desc" },
    { value: "original_title.asc", display: "Original Title asc" },
    { value: "original_title.desc", display: "Original Title desc" },
    { value: "vote_average.asc", display: "Vote Average asc" },
    { value: "vote_average.desc", display: "Vote Average desc" },
    { value: "vote_count.asc", display: "Vote Count asc" },
    { value: "vote_count.desc", display: "Vote count desc" }];

    return (
        <div className="SearchControl">
            <CustomSelect
                value={props.withGenre}
                customStyle={["black", "rounded"]}
                label={"Genre"}
                changed={e => props.onGenreChange(e.target.value, props)}
                width={240}
                options={
                    props.genres.map(g => {
                        return { value: g.id, display: g.name }
                    })
                }
            />
            <CustomSelect
                value={props.voteCount}
                customStyle={["black", "rounded"]}
                label={"Votes"}
                changed={e => props.onVoteCountChange(e.target.value, props)}
                width={240}
                options={
                    [...Array(11)].map((_, index) => {
                        return { value: (index * 1000), display: (index * 1000) }
                    })
                }
            />
            <CustomSelect
                value={props.sortBy}
                customStyle={["black", "rounded"]}
                label={"Order by "}
                changed={e => props.onSortByChange(e.target.value, props)}
                width={240}
                options={options}
            />
            <CustomSelect
                value={props.releaseDate}
                customStyle={["black", "rounded"]}
                label={"Release year"}
                changed={e => props.onReleaseDateChange(e.target.value, props)}
                width={140}
                options={
                    [...Array(50)].map((_, index) => {
                        return { value: (2018 - index), display: (2018 - index) }
                    })
                }
            />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        genres: state.genres,
        sortBy: state.search.sortBy,
        voteCount: state.search.voteCount,
        withGenre: state.search.withGenres,
        selectedGenre: state.selectedGenre,
        releaseDate: state.search.releaseDate,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReleaseDateChange: (releaseDate, props) => {
            dispatch(setReleaseDate(releaseDate));
            props.history.push('/');
        },
        onVoteCountChange: (voteCount, props) => {
            dispatch(setVoteCount(voteCount));
            props.history.push('/');
        },
        onGenreChange: (genre, props) => {
            dispatch(setWithGenre(genre));
            props.history.push('/');
        },
        onSortByChange: (sortBy, props) => {
            dispatch(setSortBy(sortBy));
            props.history.push('/');
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(searchControl));