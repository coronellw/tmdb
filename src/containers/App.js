import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import * as api from '../assets/config'
import Movies from '../components/Movies';
import Genres from '../components/Genres';
import SearchControl from '../components/Movies/SearchControl';

class App extends Component {

  state = {
    genres: [],
    movies: [],
    currentGenre: null,
    sort: {
      language: 'en-US',
      sort_by: 'vote_average.desc',
      vote_count: 3000,
      page: 1,
      release_date: '2018-01-01',
      with_genres: null,
    },
  }

  componentDidMount = () => {
    let query = api.URL + '/genre/movie/list?api_key=' + api.KEY;
    axios.get(query)
      .then(response => {
        if (response.data.genres) {
          this.setState({ genres: response.data.genres });
        }
      });
  }

  genreClickedHandler = (genreId) => {
    let query = api.URL + '/discover/movie?api_key=' + api.KEY
      + '&language=' + this.state.sort.language
      + '&sort_by=' + this.state.sort.sort_by
      + '&vote_count.gte=' + this.state.sort.vote_count
      + '&page=' + this.state.sort.page
      + '&primary_release_date.gte=' + this.state.sort.release_date
      + '&with_genres=' + genreId;

    axios.get(query)
      .then(response => {
        let movies = response.data.results;
        let currentGenre = this.state.genres.find(g => g.id === genreId);
        this.setState({ movies, currentGenre });
      });
  }

  changeVoteCountHandler = (event) => {
    console.log('[App.js] changeVoteCountHandler',event.target.value);
    
    let sort = this.state.sort;
    sort.vote_count = event.target.value;
    this.setState({ sort })
    this.genreClickedHandler(this.state.currentGenre.id);
  }

  yearChangedHandler = (event) => {
    console.log('[App.js] yearChangedHandler',event.target.value);
    
    let sort = this.state.sort;
    sort.release_date = event.target.value;
    this.setState({ sort })
    this.genreClickedHandler(this.state.currentGenre.id);
  }
  
  changeOrderByHandler = (event) => {
    console.log('[App.js] changeOrderByHandler',event.target.value);

    let sort = this.state.sort;
    sort.sort_by = event.target.value;
    this.setState({ sort })
    this.genreClickedHandler(this.state.currentGenre.id);
  }

  render() {
    let searchActive = null;
    if (this.state.currentGenre !== null) {
      searchActive = <SearchControl 
        votes = {this.state.sort.vote_count}
        sortBy = {this.state.sort.sort_by}
        genre={this.state.currentGenre}
        year={this.state.sort.release_date}
        orderChanged={this.changeOrderByHandler}
        yearChanged={this.yearChangedHandler}
        voteChanged={this.changeVoteCountHandler}
      />
    }
    return (
      <div className="App">
        <h1>React TMDB Example</h1>

        <Genres genres={this.state.genres} clicked={this.genreClickedHandler} />

        {searchActive}
        <Movies movies={this.state.movies} genres={this.state.genres} />
      </div>
    );
  }
}

export default App;