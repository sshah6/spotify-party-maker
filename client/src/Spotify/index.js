import React, {Component} from 'react';
import queryString from 'query-string';
// import SpotifyPlaylistSearch from '../SpotifyPlaylistSearch';
import SearchForSong from '../SongSearch';
// import AddToPlaylist from '../AddToPlaylist';
// import RefreshToken from '../RefreshToken';
import Weather from '../ForecastContainer';
import Map from '../DirectionsContainer';
import SpotifyPlayer from 'react-spotify-player';


const spotifyUri = require('spotify-uri');

class Spotify extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {}, // currently not used
      allPlaylists: [], // all playlists attached to Spotify-user's account
      spotifyUserID: '', // Spotify User ID
      spotifyName: '', // Name on spotify
      spotifyUri: '',
      access_token: '', // access Token from spotify login
      playlistFind: '', // input text for playlist search
      playlistAddID: '', // the Spotify-Id for playlist added
      partyPlaylists: [], // array to hold partyPlaylist data from Spotify
      songAddedID: '', // Tempt text-input handler for song ID submited for addtion to playlist
      searchTrackName: '', // Text Input for search tracking
      searchArtistName: '', // Text Input for search tracking
      searchResults: [],
      refresh_token: '', // refresh token used for getting new access token 
      updated: false


    }
  }

  textInputHandler = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }


  searchHandler = async(e) => {
    e.preventDefault();
    const artist = this.state.searchArtistName === '' ? '' : `artist:${this.state.searchArtistName}`;
    const track = this.state.searchTrackName === '' ? '' : `track:${this.state.searchTrackName}`;
    console.log(track, 'this is the track vari');
    //artist:${this.state.searchArtistName}
    const searchData = await fetch(`https://api.spotify.com/v1/search?q=${track} ${artist}&type=track&limit=10`, {
      headers: {'Authorization': 'Bearer ' + this.state.access_token, "Accept": "application/json","Content-Type": "application/json"
    }
    })
    const searchJson = await searchData.json();
    console.log(searchJson,'search results');
    this.setState({
      searchResults: searchJson.tracks.items,
      searchArtistName: '',
      searchTrackName: ''
    })
  }

  playlistSearchHandler = async (e) => {
    e.preventDefault();
    const parsedUri = spotifyUri.parse(this.state.playlistFind)
    // console.log(this.state.playlistFind)
    // console.log(parsedUri);
    const user_id = parsedUri.user;
    const playlist_id = parsedUri.id;
    let PlaylistData = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}`, {
      headers: {'Authorization': 'Bearer ' + this.state.access_token, "Accept": "application/json","Content-Type": "application/json"
    }
    });
    const playlistJson = await PlaylistData.json();
    console.log(playlistJson, 'PLAYLISTJson');
    this.setState({
      playlistAddID: playlist_id,
      partyPlaylists: [...this.state.partyPlaylists, playlistJson],
      playlistFind: ''
    })
  }

  addSongHandler = async (urilink, e) => {
    e.preventDefault();
    const parsedUri = spotifyUri.parse(this.state.spotifyUri)
    // console.log(this.state.playlistFind)
    // console.log(parsedUri);
    const user_id = parsedUri.user;
    const playlist_id = parsedUri.id;
    const songAddedId = {"uris": [urilink]};
    console.log(playlist_id, "playlist");
    console.log(urilink)
    console.log(this.state.access_token, "access-TOKEN")
    let addSongData = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
      method: 'POST',
      body: JSON.stringify(songAddedId),
      headers: {'Authorization': 'Bearer ' + this.state.access_token, "Accept": "application/json","Content-Type": "application/json"
    }
    });
    const addSongResponse = await addSongData.json();
    console.log(addSongResponse, 'response from addSong');
  }

  refreshToken = async(e) => {
    e.preventDefault();
    console.log(this.state.refresh_token)
    const req = await fetch(`http://localhost:3001/spotify/refresh_token?refresh_token=${this.state.refresh_token}`);
    // console.log(await req.json())
    const response = await req.json();
    this.setState({
      access_token: response.access_token
    })

  }

  stateChanged = (size, view, theme, updated) => {
    console.log("this is statechanged");
    console.log(this.state.spotifyUri);

    if (this.state.updated === false){
      console.log("not returning spotify")
      return;
    } else {
      console.log("returning spotify")
      return (
        <React.Fragment>

          {/* <SpotifyPlayer
  uri="spotify:playlist:37i9dQZF1DXcb6CQIjdqKy"
  size={size}
  view={view}
  theme={theme}
/> */}
        <SpotifyPlayer
        uri={this.state.spotifyUri}
        size={size}
        view={view}
        theme={theme}
      />
          
      
            <SearchForSong access_token={this.state.access_token} textInputHandler={this.textInputHandler} 
            searchArtistName={this.state.searchArtistName} 
            searchResults={this.state.searchResults} 
            searchTrackName={this.state.searchTrackName} 
            searchHandler={this.searchHandler} 
             addSongHandler={this.addSongHandler}/>
      </React.Fragment>
      )
    }
  }
  componentDidMount() {
    console.log("component did mount");

    let parsed = queryString.parse(window.location.search);
    console.log(parsed)
    // let accessToken = parsed.access_token;
    // let refresh_token = parsed.refresh_token;
    let URI = parsed.spotifyURI;
    console.log("uri is: " + URI);
    const uriObject = spotifyUri.parse(URI)
  const userId = uriObject.user;
  const token = parsed.user;
  console.log(userId)
  const playlistId = uriObject.id;
  console.log(playlistId)

    const spotifyUser = fetch(`http://localhost:3001/spotify/party/${URI}`,  {method: 'GET', credentials: 'include'})
    .then(response => response.json()).then((data) => { 
      console.log("the data");
      console.log(data);



      this.setState({
        spotifyUserID: userId,
        access_token: token,
        date: data.date,
        artistName: data.artistName,
        trackName: data.trackName,
        information: data.information,
        location: data.location,
        zip: data.zip,
        playlistAddID: playlistId,
        spotifyUri: 'spotify:playlist:' + URI,
        updated: true
        
      }, () =>{
        // console.log("after state");
        // console.log(this.state)
        // console.log("state changed for spotify URI")
      })
    
    })

    // const User = fetch(`http://localhost:3001/user/${userId}`,  {method: 'GET', credentials: 'include'})
//     .then(response => response.json()).then((data) => { 
//       console.log("the data");
//       console.log(data, 'user');
// 
// 
// 
//       this.setState({
//         access_token: data.spotifyAccessToken
//       }, () =>{
//         // console.log("after state");
//         // console.log(this.state)
//         // console.log("state changed for spotify URI")
//       })
//     
//     })

    // const spotifyParty = fetch(`http://localhost:3001/spotify/party/${URI}`,  {method: 'GET', credentials: 'include'})
    // .then(response => response.json()).then((data) => { 
    //   console.log("the data");
    //   console.log(data);



    //   this.setState({
    //     spotifyUserID: userId,
    //     access_token: data.access_token,
    //     date: data.date,
    //     information: data.information,
    //     artistName: data.artistName,
    //     trackName: data.trackName,
    //     location: data.location,
    //     zip: data.zip,
    //     playlistAddID: playlistId,
    //     spotifyUri: 'spotify:playlist:' + URI,
    //     updated: true
        
    //   }, () =>{
    //     // console.log("after state");
    //     // console.log(this.state)
    //     // console.log("state changed for spotify URI")
    //   })
    
    // })

    
    
    // if (!accessToken)
    //   return;
    

  //   fetch('https://api.spotify.com/v1/me/playlists', {
  //     headers: {'Authorization': 'Bearer ' + accessToken, "Accept": "application/json","Content-Type": "application/json"
  //   }
  //   }).then(response => response.json())

  //   .then(data => this.setState({
  //     allPlaylists: data.items.map(item => {
  //       // console.log(data, 'data in playlist')
  //       return {
  //         name: item.name,
  //         imageUrl: item.images.map((item)=>{
  //           return item;
  //         }),
  //         songs: []
  //       }
  //   })
  //   })
  // )

  }
  render() {

    // *** THIS IS PRACTIVE API MANGLING FOR IMAGES
    // console.log(this.state, 'this is the state')
    // const playlists = this.state.playlists.map((item)=> {
    //   console.log(item.imageUrl[0], 'this is an item')
    //   return item.imageUrl.map((item) => {
    //    console.log(item.url, 'imageURL map')
    //    if (item.url === undefined) {} else {
    //    return <img src={item.url}/> }
    //  })
    // })
    // console.log(playlists);
    const size = {
      width: '100%',
      height: 430,
    };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'

    console.log(this.state, 'this state')
    console.log(this.props.location.state)
    return (
    <div>
      <div className="Map">
      <h1>Your Party Location</h1>
      <br></br>
      <Map />
    </div>
    <div className="Forecast">
    <br></br>
      <h1>Your Party Weather</h1>
      <Weather />
    </div>
    <br></br>
    <h1>Party Playlist</h1>
    <br></br>
      
    {this.stateChanged(size, view, theme, this.state.updated)}
     

      {/* <AddToPlaylist  addSongHandler={this.addSongHandler} access_token={this.state.access_token} spotifyUserID={this.state.spotifyUserID} partyPlaylists={this.state.partyPlaylists} playlistAddID={this.state.playlistAddID} textInputHandler={this.textInputHandler} songAddedID={this.state.songAddedID}/>
      <RefreshToken refreshToken={this.refreshToken}/> */}

    </div>
    )
  }
}

export default Spotify;