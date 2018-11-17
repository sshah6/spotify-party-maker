import React, { Component } from 'react';


class AddToPlaylist extends Component {
  render () {
    // console.log(this.props, 'props for add to play')
    return (
      <div>
        <h4>add to playlist</h4>
        <form  onSubmit={this.props.addSongHandler}>
        <input className='aa' type='text' name='songAddedID' placeholder='Spotify song id' value={this.props.songAddedID} onChange={this.props.textInputHandler}/>
        <input className='aa' type='submit' value='add'/>
        </form>
      </div>
    )
  }
}

export default AddToPlaylist;
