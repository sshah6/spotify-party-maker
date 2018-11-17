import React, { Component } from 'react';
// const spotifyUri = require('spotify-uri');

class SearchForSong extends Component {
render(){
      console.log(this.props, 'search props')
      const searchRender = this.props.searchResults.map((track, index) => {

        console.log(track.artists[0].name);
        console.log(track);
        console.log(track);

        const artistName = track.artists[0].name; //variable for your data rep.
        const songName = track.name;
        const link = track.uri;  //href not external link.
        const image = track.album.images[2].url;
        // console.log(track.album.images[2]);
        //how to add button that reads the link and adds it to the playlist.


//searchRender is getting all this data. THEN you will actually render this out on the last return. This return is for the mapped data. This is the new array.

        return (
          <div key={index}>
            <h3> search {songName} by {artistName} </h3>
            <img src={image} className="spotifyImg" />

            <form  onSubmit={this.props.addSongHandler.bind(null,link)}>
              <input className='a' type='submit' value='add to playlist'/>
            </form>
          </div>
        )

      })
    return (
    <div>
       <form onSubmit={this.props.searchHandler}>
        <input className='aa' type='text' name='searchTrackName' placeholder='Search Song Name' value={this.props.searchTrackName} onChange={this.props.textInputHandler}/>
        <input className='aa' type='text' name='searchArtistName' placeholder='Search Artist' value={this.props.searchArtistName} onChange={this.props.textInputHandler}/>
        <input className='aa' type='submit' value='find'/>
        </form>
        {searchRender}
    </div>
    )
  }
}

export default SearchForSong;
