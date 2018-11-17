import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';
// import styled from 'styled-components';
// import Body from '../Body';


class Map extends Component {
   render() {
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultCenter = { {lat: 38.6546499, lng: -121.368701} }
        defaultZoom = { 12 }
      >

      {props.isMarkerShown && <Marker position={{ lat: 38.6546499, lng: -121.368701 }} />}
      </GoogleMap>
   ));

   return(
      <div>
        <MyMapComponent 
        isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDgX5AM9bTt4Hsj18JcvcmRwfXsUgfbPU8&v=3.exp&libraries=geometry,drawing,places" 
          // googleMapURL="https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAP_tsWA7siKcqMtsD1Ofl5duwRIipa6jM"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={ <div style={{ height: '60vh', width: '50vw', margin: 'auto'}} /> }
          mapElement={ <div style={{ height: `100%`, }} /> }
      />
      </div>
   );
   }
};


export default Map;
