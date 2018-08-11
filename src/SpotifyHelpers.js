import React from 'react'

export const spotifyHelpers = {
    getSearchResults: function(searchResults, thisOBJ) {
        if (searchResults) {
          return (
          <div>{
            searchResults.map(result => {
              return  <div key={result.id}>
                        <span onClick={thisOBJ.handleGetAlbums.bind(thisOBJ, result.id)}>{result.name}</span>
                      </div>
              })
            }
          </div>
          )
        }
    return null;
    },

      getAlbums: function(artistAlbums, thisOBJ) {
        if (artistAlbums) {
          return (
          <div>{
            artistAlbums.map(album => {
              return  <div key={album.id}>
                        <span onClick={thisOBJ.handleGetTracks.bind(thisOBJ, album.id)}>{album.name}</span>
                      </div>
              })
            }
          </div>
          )
        }
        return null;
      },



    getTracks: function(albumTracks) {
        if (albumTracks) {
            return (
            <div>
                {albumTracks.map(track => {
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


      
}