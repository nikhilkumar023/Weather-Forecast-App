import PropTypes from "prop-types";

function WeatherCard({ data }) {
  return (
    <div className="weather-details-container">
      {/* details */}
      <div className="details">
        <h4 className="city-name">{data.name}</h4>

        <div className="icon-and-temp">
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="icon" />
          <h1>{data.main.temp}&deg;</h1>
        </div>

        <h4 className="description">{data.weather[0].description}</h4>
      </div>

      {/* metrices */}
      <div className="metrices">
        {/* feels like */}
        <h4>
          Feels like {data.main.feels_like}
          &deg;C
        </h4>

        {/* min max temp */}
        <div className="key-value-box">
          <div className="key">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a09aa0">
              <path d="M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z" />
            </svg>
            <span className="value">
              {data.main.temp_max}
              &deg;C
            </span>
          </div>
          <div className="key">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a09aa0">
              <path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" />
            </svg>
            <span className="value">
              {data.main.temp_min}
              &deg;C
            </span>
          </div>
        </div>

        {/* humidity */}
        <div className="key-value-box">
          <div className="key">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a09aa0">
              <path d="M491-200q12-1 20.5-9.5T520-230q0-14-9-22.5t-23-7.5q-41 3-87-22.5T343-375q-2-11-10.5-18t-19.5-7q-14 0-23 10.5t-6 24.5q17 91 80 130t127 35ZM480-80q-137 0-228.5-94T160-408q0-100 79.5-217.5T480-880q161 137 240.5 254.5T800-408q0 140-91.5 234T480-80Zm0-80q104 0 172-70.5T720-408q0-73-60.5-165T480-774Q361-665 300.5-573T240-408q0 107 68 177.5T480-160Zm0-320Z" />
            </svg>
            <span>Humidity</span>
          </div>
          <div className="value">
            <span>{data.main.humidity}%</span>
          </div>
        </div>

        {/* wind */}
        <div className="key-value-box">
          <div className="key">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a09aa0">
              <path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z" />
            </svg>
            <span>Wind</span>
          </div>
          <div className="value">
            <span>{data.wind.speed}kph</span>
          </div>
        </div>

        {/* pressure */}
        <div className="key-value-box">
          <div className="key">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a09aa0">
              <path d="M360-160q-19 0-34-11t-22-28l-92-241H40v-80h228l92 244 184-485q7-17 22-28t34-11q19 0 34 11t22 28l92 241h172v80H692l-92-244-184 485q-7 17-22 28t-34 11Z" />
            </svg>
            <span>Pressure</span>
          </div>
          <div className="value">
            <span>
              {data.main.pressure}
              hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

WeatherCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WeatherCard;
