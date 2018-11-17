import React, {Component} from 'react';

class Register extends Component{
  constructor(){
    super();
    this.state = {
      username:'',
      password:''
    }
  }
  handleSubmit = async (e) => {
    e.preventDefault();
const registerResponse = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers:{
        'Content-Type': 'application/json'
        }
    });

    const parsedResponse = await registerResponse.json();

    if(parsedResponse.data = 'register successful'){
      // this.props.history.push('/profile');
      window.location.assign('http://localhost:3001/spotify/login')

    }
}


  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value});
  }
  render() {
    console.log('this is the props for register',this.props);

    const style={
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      marginBottom: '50px',
    }

    return(
      <div className="loginRegister">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* <div className="loginRegisterImage">
                  <img style={style} src="https://images.unsplash.com/photo-1483821838526-8d9756a6e1ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f2ee5af66743fa8159bcce66cdc57428&auto=format&fit=crop&w=2768&q=80" />
        </div> */}
        <h3>create your own profile, parties, and playlists!</h3>
        <br></br>
        <br></br>
        <br></br>


      <form onSubmit={this.handleSubmit}>
        <label className="username">
          Username:
          <input type='text' name='username' placeholder='username' onChange={this.handleChange}/>
        </label>
        <label>
          Password:
          <input type='password' name='password' placeholder='password' onChange={this.handleChange}/>
        </label>
        <input type='Submit' value='register'/>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </div>
    )
  };
}

export default Register;
