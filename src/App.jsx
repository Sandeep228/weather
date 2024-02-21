import { useState } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import sunr from "./assets/icons/sunr.png";
import suns from "./assets/icons/suns.png";

import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";
function App() {
  const [input, setInput] = useState("");
  const { weather, thisLocation, values, setPlace, sun } = useStateContext();

  console.log(sun);
  const submitCity = () => {
    setPlace(input);
    setInput("");
  };

  const formatTime = (time) => {
    console.log(time);

    if (time) {
      const originalTime = new Date(time);

      // Subtract 5 hours and 30 minutes
      const adjustedTime = new Date(
        originalTime.getTime() - 5 * 60 * 60 * 1000 - 30 * 60 * 1000
      );

      return adjustedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return "Loading...";
    }
  };

  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">Weather App</h1>
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                // sumit the form
                submitCity();
              }
            }}
            type="text"
            placeholder="Search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout></BackgroundLayout>
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
          dew={weather.dew}
          visibility={weather.visibility}
          maxt={weather.maxt}
          mint={weather.mint}
          pressure={weather.sealevelpressure}
          uvindex={weather.uvindex}
        />

        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
          {values?.slice(1, 7).map((curr) => {
            return (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
              />
            );
          })}
        </div>
      </main>
      <div className="flex justify-around space-x-4 back mt-12">
        <div className="flex items-center space-x-2 sunrise-container">
          <img src={sunr} alt="Sunrise Logo" height={100} width={100} />
          <p className="text-orange-500 text-5xl ">{formatTime(sun.sunrise)}</p>
        </div>
        <div className="flex items-center space-x-2 sunset-container">
          <img src={suns} alt="Sunset Logo" height={100} width={100} />
          <p className="text-yellow-500 text-5xl ml-12">
            {formatTime(sun.sunset)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
