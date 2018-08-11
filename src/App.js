import React, { Component } from 'react';
// import Spotify from 'node-spotify-api';
import Axios from 'axios';
import './App.css';
import { spotifyHelpers } from './SpotifyHelpers';

const GLOBAL = {
  key: "BQAfdKGMCjvUL32ihzspQ3CDTq_dga2a-tImA7NKRgtfLw8-msHtLAIk1ymtoWgFTuIOxIvDkkacn5JdqwBR__nIjX_RZGe7j9ljohe0ymEVMe7Wq_G5mV8L8hMZ57dBJXck8oMN3A"
}

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: "",
      searchResults: [],
      artistInfo: {},
      artistAlbums: [],
      albumTracks: [],
    }

    this.handleGetAlbums = this.handleGetAlbums.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    // this.getSearchResults = this.getSearchResults.bind(this)
  }
  componentDidMount() {
    //let spotify = new Spotify({
    //  id: "3588a96280454bf48eb6b0d4dd968d15",
    //  secret: "c10baf226ce14e3eacd0736bd957924b"
    //});

    // spotify login page
    // step one for token, go here
    // http://accounts.spotify.com/authorize/?client_id=3588a96280454bf48eb6b0d4dd968d15&response_type=code&redirect_uri=http://localhost:3000&scpe=user-read-private
    // step two for token, get the code returned from this request (it is sitting in the location bar, after localhost:3000)
    // take that code, and put it into postman, in the form/tab called "Spotify Token Get"
    // click "post" and then the new token will come back
    // paste it after the bearer part of Axios below

    
  }
  handleChange(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleSearch() {
    Axios.get(`https://api.spotify.com/v1/search?q=${this.state.searchTerm}&type=artist&limit=10`, {
      headers: {
        'Authorization': 'Bearer ' + GLOBAL.key
      }
    }).then((response) => {
      console.log(response.data)
      this.setState ({
        searchResults: response.data.artists.items
      })
      console.log(this.state.searchResults)
    })
  }

  handleGetArtist(id) {
    console.log("ID: " + id)
    Axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + GLOBAL.key
      }
    }).then((response) => {
      console.log(response.data)
      this.setState ({
        artistAlbums: response.data.items
      })
      console.log(this.state.artistAlbums)
    })
  }


  handleGetAlbums(id) {

    Axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: {
        'Authorization': 'Bearer ' + GLOBAL.key
      }
    }).then((response) => {
      this.setState ({
        artistAlbums: response.data.items
      })
      console.log(this.state.artistAlbums)
    })
  }

  handleGetTracks(id) {
    Axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      headers: {
        'Authorization': 'Bearer ' + GLOBAL.key
      }
  }).then((response) => {
    this.setState ({
      albumTracks: response.data.items
    })
  })
}


  render() {
    if (this.state.albumTracks.length > 0) {
      return spotifyHelpers.getTracks(this.state.albumTracks);
    }

    if (this.state.artistAlbums.length > 0) {
      return spotifyHelpers.getAlbums(this.state.artistAlbums, this);
    }

    if (this.state.searchResults.length > 0) {
      return spotifyHelpers.getSearchResults(this.state.searchResults, this);
    }
    
    return (
      <div className="input">

        <input onChange={this.handleChange} type='text' placeholder='...enter an artist'/> 
        <button className ="button" onClick={this.handleSearch}>Search</button>
        <hr />

      </div>
    );
  }
}

export default App;
