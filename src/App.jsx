/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import Icon from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import { useDispatch, useSelector } from "react-redux";
import { SphereSpinner } from "react-spinners-kit";
import ForecastCard from "./Components/forecastCard.jsx";
import WeatherCard from "./Components/weatherCard.jsx";
import { get5DaysForecast, getCityData } from "./Store/Slices/WeatherSlice.js";

function App() {
  // redux state
  const { citySearchLoading, citySearchData, forecastLoading, forecastData, forecastError } = useSelector((state) => state.weather);

  // main loadings state
  const [loadings, setLoadings] = useState(true);

  // check if any of redux loading state is still true
  const allLoadings = [citySearchLoading, forecastLoading];
  useEffect(() => {
    const isAnyChildLoading = allLoadings.some((state) => state);
    setLoadings(isAnyChildLoading);
  }, [allLoadings]);

  // city state
  const [city, setCity] = useState("Delhi");

  // unit state
  const [unit, setUnit] = useState("metric"); // metric = C and imperial = F
  const [isPulling, setIsPulling] = useState(false);
  const [startY, setStartY] = useState(0);

  // toggle unit
  const toggleUnit = () => {
    setLoadings(true);
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  // dispatch
  const dispatch = useDispatch();

  // fetch data
  const fetchData = () => {
    dispatch(
      getCityData({
        city,
        unit,
      })
    ).then((res) => {
      if (!res.payload.error) {
        dispatch(
          get5DaysForecast({
            lat: res.payload.data.coord.lat,
            lon: res.payload.data.coord.lon,
            unit,
          })
        );
      }
    });
  };

  // initial render
  useEffect(() => {
    fetchData();
  }, [unit]);

  // handle city search
  const handleCitySearch = (e) => {
    e.preventDefault();
    setLoadings(true);
    fetchData();
  };

  // function to filter forecast data based on the time of the first object
  const filterForecastByFirstObjTime = (forecastData) => {
    if (!forecastData) {
      return [];
    }

    const firstObjTime = forecastData[0].dt_txt.split(" ")[1];
    return forecastData.filter((data) => data.dt_txt.endsWith(firstObjTime));
  };

  const filteredForecast = filterForecastByFirstObjTime(forecastData?.list);

  const handleTouchStart = useCallback((e) => {
    setStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback((e) => {
    const currentY = e.touches[0].clientY;
    if (currentY > startY && window.scrollY === 0) {
      setIsPulling(true);
    } else {
      setIsPulling(false);
    }
  }, [startY]);

  const handleTouchEnd = useCallback(() => {
    if (isPulling) {
      setIsPulling(false);
      setLoadings(true);
      fetchData();
    }
  }, [isPulling, fetchData]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);


  return (
    <div className="background">
      <div className="box">
        {isPulling && <div className="pull-to-refresh-indicator">Release to refresh</div>}
        {/* city search form */}
        <form autoComplete="off" onSubmit={handleCitySearch}>
          <label>
            <Icon icon={search} size={20} />
          </label>
          <input type="text" className="city-input" placeholder="Enter City" required value={city} onChange={(e) => setCity(e.target.value)} readOnly={loadings} />
          <button type="submit">Search</button>
        </form>

        {/* current weather details box */}
        <div className="current-weather-details-box">
          {/* header */}
          <div className="details-box-header">
            {/* heading */}
            <h4>Current Weather</h4>

            {/* switch */}
            <div className="switch" onClick={toggleUnit}>
              <div className={`switch-toggle ${unit === "metric" ? "c" : "f"}`}></div>
              <span className="c">C</span>
              <span className="f">F</span>
            </div>
          </div>
          {loadings ? (
            <div className="loader">
              <SphereSpinner loadings={loadings} color="#2fa5ed" size={20} />
            </div>
          ) : (
            <>
              {citySearchData && citySearchData.error ? (
                <div className="error-msg">{citySearchData.error}</div>
              ) : (
                <>
                  {forecastError ? (
                    <div className="error-msg">{forecastError}</div>
                  ) : (
                    <>
                      {citySearchData && citySearchData.data ? <WeatherCard data={citySearchData.data} /> : <div className="error-msg">No Data Found</div>}
                      {/* extended forecastData */}
                      <h4 className="extended-forecast-heading">Extended Forecast</h4>
                      {filteredForecast.length > 0 ? (
                        <div className="extended-forecasts-container">
                          {filteredForecast.map((data, index) => (
                            <ForecastCard data={data} key={index} />
                          ))}
                        </div>
                      ) : (
                        <div className="error-msg">No Data Found</div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
