import React, { Component } from 'react';
// import {Route, Switch, Redirect} from 'react-router-dom';
// import styled from 'styled-components';
// import Body from '../Body';



class Welcome extends Component {
  constructor () {
    super();
    this.state= {
      playlistUri: '',
    }
  }

  textInputHandler = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    // this.props.history.push(`/spotify?spotifyURI=${this.state.playlistUri}`)

    this.props.history.push({
      pathname: '/spotify',
      search: `?spotifyURI=${this.state.playlistUri}`,
      state: { detail: this.state.playlistUri }
    })


  }

  render() {
    console.log(this.state)
   return (
    <div>
      <h1 className='party' >Party Potensh!</h1>
      <br></br>
      <br></br>
      <h5>if you have a spotify code enter it below</h5>
      <form onSubmit={this.submitHandler}>
        <input className='a' type='text' placeholder='playlist uri' name='playlistUri' value={this.state.playlistUri} onChange={this.textInputHandler}/>
        <input className='a' type='submit' value='submit' />

        <br></br>
        <br></br>

      </form>
      {/* <h5>don't have one? register to create your own party playlist</h5> */}
      <br></br>
      <br></br>
      <br></br>
        <h5>check out a party playlists below! </h5>
        <br></br>
        <a className = "a" href='http://localhost:3000/spotify?spotifyURI=6Kxm06YHZUrmld1Obm5TAD'>My Party</a>


    </div>
    )
  }
}


export default Welcome;
