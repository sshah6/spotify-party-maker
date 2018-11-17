import React from 'react';

import styled from 'styled-components';

const MapStyle = styled.div`
  text-align: center;
  margin-left: 15%;
  margin-right: 15%;
  padding: 0 5px;
  ${'' /* background-color: #C3ECB3; */}

  @media (min-width: 600px) {
    width: auto;
  }
`;

MapStyle.displayName = 'MapStyle';

export default MapStyle;
