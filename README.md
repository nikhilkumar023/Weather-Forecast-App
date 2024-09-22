# Weather Forecast Application

This Weather Forecast Application is a responsive web app built using React.js that provides users with current weather data and a five-day weather forecast for any city around the world. It integrates the OpenWeatherMap API for real-time weather information and offers key features like temperature unit conversion, search functionality, and error handling for incorrect city names.

Features:
1. Main Page - Default City Weather
  Displays the current weather for the default city, Delhi.
  Includes reusable components to show:
  City name,
  Current temperature,
  Weather condition,
  Weather icon.
2. API Integration:
  Utilizes the OpenWeatherMap API to fetch real-time weather data for the default and searched cities.
  Data includes current temperature, humidity, wind speed, and a five-day forecast.
3. City Search Functionality:
  Users can search for weather information by entering any city name.
  Implements error handling to display a "City Not Found" message if the entered city name is incorrect or not found.
4. Five-Day Weather Forecast:
  Custom components are used to display the five-day forecast, showing:
  Day of the week,
  High and low temperatures,
  Weather condition,
  Weather icon.
A reusable ForecastCard component is created to display the forecast details for each day.
5. Temperature Unit Conversion:
  Adds a toggle button that allows users to switch between Celsius and Fahrenheit for temperature display.
6. Responsive Design:
  The application is fully responsive, adapting to various screen sizes using SCSS.
  Ensures a smooth user experience on desktop, tablet, and mobile devices.
7. Pull to Refresh:
  Implements a pull-to-refresh feature for mobile devices, enabling users to refresh the current weather data by pulling down on the screen.
Setup Instructions:

Prerequisites:

Node.js installed on your system. 
A package manager such as npm (which comes with Node.js) or yarn.

Installation 

Clone the Repository: Open your terminal and clone the project from GitHub:

  ~ git clone https://github.com/yourusername/weather-forecast-app.git,
  ~ cd weather-forecast-app

Install Dependencies: Inside the project directory, install the required dependencies using Vite. Run the following command to install using npm:

  ~ npm install

Run the Application Locally: To start the Vite development server and run the application on your local machine, use the following command:

  ~ npm run dev

View the Application: After starting the app, Vite will output the local server URL. Open your browser and navigate to:

  ~ http://localhost:5173





