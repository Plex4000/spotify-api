import React, { Component } from 'react';
// import Spotify from 'node-spotify-api';
import Axios from 'axios';
import './App.css';

const GLOBAL = {
  key: ""
}

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      artistInfo: {},
      artistAlbums: [],
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
    // http://accounts.spotify.com/authorize/?client_id=3588a96280454bf48eb6b0d4dd968d15&response_type=code&redirect_uri=https://localhost:3000&scpe=user-read-private
    // step two for token, get the code returned from this request (it is sitting in the location bar, after localhost:3000)
    // take that code, and put it into postman, in the form/tab called "Spotify Token Get"
    // click "post" and then the new token will come back
    // paste it after the bearer part of Axios below

    Axios.get('https://api.spotify.com/v1/artists/3inCNiUr4R6XQ3W43s9Aqi', {
      headers: {
        'Authorization': 'Bearer ' + "BQCTNJFCizNHUzo3DQZkXNzlS1jtVMTECn8NIqpJtlznZsidCh8V6hWE73AMfCOHAmyxxfQ49aPTPbkyNbnNLUSBUUA5sQErafx8lHtvCSwIZSEDfiLm0KpmVXJSQtH7iqnc2ZGLiQ"
      }
    }).then((response) => {
      this.setState ({
        artistInfo: response.data
      })
    })
  }

  handleGetAlbums(e) {
    e.preventDefault()

    Axios.get('https://api.spotify.com/v1/artists/3inCNiUr4R6XQ3W43s9Aqi/albums', {
      headers: {
        'Authorization': 'Bearer ' + "BQCTNJFCizNHUzo3DQZkXNzlS1jtVMTECn8NIqpJtlznZsidCh8V6hWE73AMfCOHAmyxxfQ49aPTPbkyNbnNLUSBUUA5sQErafx8lHtvCSwIZSEDfiLm0KpmVXJSQtH7iqnc2ZGLiQ"
      }
    }).then((response) => {
      this.setState ({
        artistAlbums: response.data.items
      })
      console.log(this.state.artistAlbums)
    })

  }

  render() {

    let albums = null

        if (this.state.artistAlbums) {
          albums = (
          <div className="movieContainer">{
            this.state.artistAlbums.map(album => {
              return  <div key={album.id}>
                        <span onClick={this.handleGetTracks}>{album.name}</span>
                      </div>
              })
            }
           </div>
          )
        }
    return (
      <div>
        <h1>{this.state.artistInfo.name}</h1>
        <button onClick={this.handleGetAlbums}>View albums</button>
        <div>{albums}</div>
      </div>
    );
  }
}

export default App;
