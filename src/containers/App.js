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
    currentGenre: {id:0, name:'default'},
    search: {
      language: 'en-US',
      sort_by: 'vote_average.desc',
      vote_count: 3000,
      page: 1,
      release_date: '2016-01-01',
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
      + '&language=' + this.state.search.language
      + '&sort_by=' + this.state.search.sort_by
      + '&vote_count.gte=' + this.state.search.vote_count
      + '&page=' + this.state.search.page
      + '&primary_release_date.gte=' + this.state.search.release_date
      + '&with_genres=' + genreId;

    axios.get(query)
      .then(response => {
        let movies = response.data.results;
        let currentGenre = this.state.genres.find(g => g.id === genreId);
        this.setState({ movies, currentGenre });
      });
  }

  changeVoteCountHandler = (event) => {
    console.log('[App.js] changeVoteCountHandler', event.target.value);

    let search = this.state.search;
    search.vote_count = event.target.value;
    this.setState({ search })
    this.genreClickedHandler(this.state.currentGenre.id);
  }

  yearChangedHandler = (event) => {
    console.log('[App.js] yearChangedHandler', event.target.value);

    let search = this.state.search;
    search.release_date = event.target.value;
    this.setState({ search })
    this.genreClickedHandler(this.state.currentGenre.id);
  }

  changeOrderByHandler = (event) => {
    console.log('[App.js] changeOrderByHandler', event.target.value);

    let search = this.state.search;
    search.sort_by = event.target.value;
    this.setState({ search })
    this.genreClickedHandler(this.state.currentGenre.id);
  }

  render() {
    return (
      <div className="App">
        <h1>React TMDB Example</h1>

        <Genres genres={this.state.genres} clicked={this.genreClickedHandler} />

        <SearchControl
          search={this.state.search}
          genre={this.state.currentGenre}
          orderChanged={this.changeOrderByHandler}
          yearChanged={this.yearChangedHandler}
          voteChanged={this.changeVoteCountHandler}
        />
        <Movies movies={this.state.movies} genres={this.state.genres} />
      </div>
    );
  }
}

export default App;