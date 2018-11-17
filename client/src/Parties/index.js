import React from 'react';
// import queryString from 'query-string'

const Parties = (props) => {

 let partyList;
 if(props.parties === undefined) {

 } else {

 console.log('this is props for parties',props)
  partyList = props.parties.map((party, i) => {
    return (
      <div >
      <div key={party._id}>
        <a className='partylist' href={`/spotify?spotifyURI=${party.playlistID}&user=${props.user.spotifyAccessToken}`} test="test"><h3>{party.name}</h3></a>
        {/* <small>{party.date}</small>
        <small>{party.location}</small>
        <small>{party.zip}</small>
        <small>{party.information}</small>
        <small>{party.playlistID}</small> */}
        <button className='editparty'
          onClick={props.showModal.bind(null,party._id)}>edit</button>
        <button className='deleteparty' onClick={props.deleteParty.bind(null,party._id)}>delete</button>

      </div>
    </div>
      )
  });

}
  return (
    <div>
      {partyList}
    </div>
    )
}


export default Parties;
