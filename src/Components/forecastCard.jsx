import PropTypes from "prop-types";

function ForecastCard({ data, index }) {
  const date = new Date(data.dt_txt);
  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
  });
  return (
    <div className="forecast-box" key={index}>
      <h5>{day}</h5>
      <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="icon" />
      <h5>{data.weather[0].description}</h5>
      <h5 className="min-max-temp">
        {data.main.temp_max}&deg; / {data.main.temp_min}&deg;
      </h5>
    </div>
  );
}

ForecastCard.propTypes = {
  data: PropTypes.shape({
    dt_txt: PropTypes.string.isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ForecastCard;
