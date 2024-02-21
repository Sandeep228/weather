/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDate } from "../Utils/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import vis from "../assets/icons/gh.png";
import max from "../assets/icons/max.png";
import min from "../assets/icons/min.png";
import  uv   from "../assets/icons/uv.png"

import "../index.css";

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
  dew,
  visibility,
  maxt,
  mint,
  pressure,
  uvindex
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes("thunder")) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className="flip-card w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4 transition duration-300 transform hover:scale-105">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="flex w-full just-center items-center gap-4 mt-4 mb-4">
            <img src={icon} alt="weather_icon" />
            <p className="font-bold text-5xl flex justify-center items-center">
              {temperature} &deg;C
            </p>
          </div>
          <div className="font-bold text-center text-xl">{place}</div>
          <div className="w-full flex justify-between items-center mt-4">
            <p className="flex-1 text-center p-2">
              {new Date().toDateString()}
            </p>
            <p className="flex-1 text-center p-2">{time}</p>
          </div>
          <div className="w-full flex justify-between items-center mt-4 gap-4">
            <p className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
              Wind Speed <p className="font-normal">{windspeed} km/h</p>
            </p>
            <p className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
              Humidity <p className="font-normal">{humidity} gm/m&#179;</p>
            </p>
          </div>
          <div className="w-full p-3 mt-4 flex justify-between items-center">
            <p className="font-semibold text-lg">Heat Index</p>
            <p className="text-lg">{heatIndex ? heatIndex : "N/A"}</p>
          </div>
          <hr className="bg-slate-600" />
          <div className="w-full p-4 flex justify-center items-center text-3xl font-semibold">
            {conditions}
          </div>
        </div>
        {/* Back portion */}
        <div className="flip-card-back">
          <div className="flex w-full just-center items-center gap-4  mb-4">
            <img src={vis} alt="weather_icon" height={100} width={100} />
            <p className="font-bold text-5xl flex justify-center items-center ml-12">
              {visibility}
            </p>
          </div>
          <div className="w-full flex justify-between items-center mt-4">
            <div className="flex w-full just-center items-center gap-4 mt-5 mb-4">
              <img src={max} alt="weather_icon" height={100} width={100} />
              <p className="font-bold text-2xl flex justify-center items-center">
                {maxt}
              </p>
            </div>
            <div className="flex w-full just-center items-center gap-4 mt-5 mb-4">
              <img src={min} alt="weather_icon" height={100} width={100} />
              <p className="font-bold text-2xl flex justify-center items-center">
                {mint}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-4 gap-4">
            <p className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
              Sea Level <p className="font-normal">{pressure} </p>
            </p>
            <p className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
              Dew <p className="font-normal">{dew}</p>
            </p>
          </div>
          <div>
          <div className="flex w-full just-center items-center gap-4 mt-5 mb-4">
              <img src={uv} alt="weather_icon" height={100} width={100}  />
              <p className="font-bold text-4xl flex justify-center items-center ml-12">
                {uvindex}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
