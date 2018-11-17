import React, {Component} from 'react';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: [],
      forecast: []
    }
  }

  //in a diff. component, fetch our database and grab the zip code someone entered in.)
  // fetch(`https://api.apixu.com/v1/forecast.json?key=36d9b64e4d5b4f4cb1845108180211&q=${zipCode}&days=7`)

  getWeather = async () => {
    try {

      const weatherData = await fetch("https://api.apixu.com/v1/forecast.json?key=36d9b64e4d5b4f4cb1845108180211&q=auto:ip&days=7")

      const weatherDataJson = await weatherData.json();
      console.log(weatherDataJson);
      return weatherDataJson;

    } catch (err) {
      return err;
    }
  }

  componentDidMount() {
    this.getWeather().then((weatherData) => {
      // this.setState({currentWeather: weatherData.location.region


        this.setState({currentWeather: weatherData.current.feelslike_f})

        console.log(weatherData);
        // console.log(weatherData.forecast.forecastday[0].day.maxtemp_f);
        // this.setState({forecast: weatherData.forecast.forecastday[2].day.maxtemp_f})

    })
  }


  render() {
    return (
      // console.log(this.props, ' this is the ForecastContainer')
      <div className = "weatherApp">

        <h4 className="currentTemp">
          Feels Like...</h4>
        <h2> {this.state.currentWeather}* outside</h2>
      </div>

)}

}
export default Weather;
