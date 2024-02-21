import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("");
  const [thisLocation, setLocation] = useState("");
  const [sun, setsun] = useState({});

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: 0,
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const thisData = Object.values(response.data.locations)[0];
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
      toast.success("successfully fetch the weather");
    } catch (error) {
      toast.error("city not found");
      console.error(error);
    }
  };

  const getCityFromCoords = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      if (response) {
        const city = response.data.address.city;
        setPlace(city);
      }
    } catch {
      toast.error("Error fetching city from coordinates");
    }
  };

  const getrise = async () => {
    try {
      const response = await axios.get(
        "https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0"
      );

      if (response) {
        const set = response.data.results;
        setsun(set);
      }
    } catch {
      toast.error("Error fetching sunrise-sunset data");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getrise(latitude, longitude);
        getCityFromCoords(latitude, longitude);
      },
      () => {
        toast.error(
          "GeoLocation request denied. Please reset location permission to grant access again."
        );
      }
    );
  }, []);

  useEffect(() => {
    if (place) {
      fetchWeather(place);
    }
  }, [place]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
        sun,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
