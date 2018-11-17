import React, {Component} from 'react';
import CreateParty from '../CreateParty';
import Maincontainer from '../Maincontainer';
import ForecastContainer from '../ForecastContainer';
import DirectionsContainer from '../DirectionsContainer';

class Profile extends Component {
  constructor(){
    super();
    this.state = {
      userID: ''
    }

  }

  render() {
    return(
      <div>
        <h1>Profile</h1>
        <h4>Create Your Party Here</h4>
      <h4>Here Are Your Parties</h4>
      <Maincontainer />
      </div>
    )
  }
}


export default Profile;
