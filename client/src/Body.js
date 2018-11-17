// import React from 'react';
import lights from './Spotify-spotify-40342611-1920-1080.jpg';
import styled from 'styled-components';

const Body = styled.div `
  text-align: center;
  color: white;
  margin: auto;
  padding: 0 5px;
  width: 100%;
    min-height:100%;
    background:
      linear-gradient(-5deg, rgba(0,0,0,0.1), rgba(0, 40, 105, 0.5)),
      url(${lights});
    background-attachment: fixed;
    background-size: cover;
  @media (min-width: 600px) {
    width: auto;
  }
`;

Body.displayName = 'Body';

export default Body;
