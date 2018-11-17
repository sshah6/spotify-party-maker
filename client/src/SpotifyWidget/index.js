import React, { Component } from 'react';


class SpotifyWidget extends Component {

  render() {
    console.log(this.props)
    return (
      <iframe title="This is a unique title" src={`https://open.spotify.com/embed?uri=${this.props.spotifyUri}`} width="300" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media" ></iframe>
    )
  }
}

export default SpotifyWidget;
