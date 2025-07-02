import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import Swal from 'sweetalert2';

        function Weather() {
            const inputRef = useRef()
            const [weatherData,setWeatherData] = useState(false)
            const [darkMode, setDarkMode] = useState(false);
            const allIcons = {
                "01d":clear_icon,
                "01n":clear_icon,
                "02d":cloud_icon,
                "02n":cloud_icon,
                "03d":cloud_icon,
                "03n":cloud_icon,
                "04d":drizzle_icon,
                "04n":drizzle_icon,
                "09d":rain_icon,
                "09n":rain_icon,
                "10d":rain_icon,
                "10n":rain_icon,
                "13d":snow_icon,
                "13n":snow_icon,
            }
        const search = async (city)=>{
            if(city===""){
                return Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Please enter a city name',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                  });
            }
            try {
                const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

                const response = await fetch(url)
                const data = await response.json()
                if(!response.ok){
                    return Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: data.message || 'City not found',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                      });
                }
                const icon = allIcons[data.weather[0].icon]||clear_icon
                setWeatherData({
                    humidity:data.main.humidity,
                    windSpeed:data.wind.speed,
                    tempearature:Math.floor(data.main.temp),
                    location:data.name,
                    icon:icon,  
                })
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: `Showing weather for ${data.name}`,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                  });
            } catch (error) {
                setWeatherData(false)
                console.error("Error in fetching data");
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Something went wrong. Try again!',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                  });
            }
        }
    useEffect(()=>{
        search("New York")
    },[])
  return (
    <div className={darkMode ? 'weather dark' : 'weather'}>
    <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
       <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search'/>
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
       </div>
       {weatherData?<>
       
       
       
        <img src={weatherData.icon} alt="" className='weather-icon'/>
       <p className='temperature'>{weatherData.tempearature}°C</p>
       <p className='location'>{weatherData.location}</p>
       <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.windSpeed}</p>
                <span>Wind speed</span>
            </div>
        </div>
       </div>
       </>:<></>}
       
    </div>
  )
}

export default Weather