import React, { Component } from 'react';
// import Spotify from 'node-spotify-api';
import Axios from 'axios';
import './App.css';

const GLOBAL = {
  key: "BQAwIge-uSidkrv5FOEkxD9NfwtRSHuHxUH1jKLesPrhPIx0QWCl5fAxvftxQNiqVJmndNZZNjrqz5CZQ39nL02EVhHWR_xHghXD8JYvefigZPYqqBhcxoWiRg5IRdFXxR9zLQYv_w"
}

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      artistInfo: {},
      artistAlbums: [],
      albumTracks: [],
    }

    this.handleGetAlbums = this.handleGetAlbums.bind(this)
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

    Axios.get('https://api.spotify.com/v1/artists/3inCNiUr4R6XQ3W43s9Aqi', {
      headers: {
        'Authorization': 'Bearer ' + GLOBAL.key
      }
    }).then((response) => {
      this.setState ({
        artistInfo: response.data
      })
    })
  }

  handleGetAlbums() {

    Axios.get('https://api.spotify.com/v1/artists/3inCNiUr4R6XQ3W43s9Aqi/albums', {
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

getAlbums() {
  if (this.state.artistAlbums) {
    return (
    <div>{
      this.state.artistAlbums.map(album => {
        return  <div key={album.id}>
                  <span onClick={this.handleGetTracks.bind(this, album.id)}>{album.name}</span>
                </div>
        })
      }
      </div>
    )
  }
  return null;
}

 getTracks() {
  if (this.state.albumTracks) {
    return (
    <div>{
      this.state.albumTracks.map(track => {
        return  <div key={track.id}>
                  <span>{track.name}</span>
                </div>
        })
      }
      </div>
    )
  }
  return null;
 }
  render() {

    let albums = this.getAlbums();

    let tracks = this.getTracks();
    
    return (
      <div>
        <h1>{this.state.artistInfo.name}</h1>
        <button onClick={this.handleGetAlbums}>View albums</button>
        <div>{albums}</div>
        <hr />
        <div>{tracks}</div>
      </div>
    );
  }
}

export default App;
