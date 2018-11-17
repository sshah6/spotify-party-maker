import React, {Component} from 'react';

class RefreshToken extends Component {


  render () {
    return (
      <div>
        <form onSubmit={this.props.refreshToken}>
          <input value='refresh token?' type='submit'/>
        </form>
      </div>
    )
  }
}

export default RefreshToken;
