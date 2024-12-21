import React from 'react'
import { useState, useEffect } from 'react'
import Weather from '../component/Weather'
function Home() {
   const [temp, setTemp] = useState();
   const [city, setCity] = useState('');
   const [minTemp, setMinTemp] = useState();
   const [maxTemp, setMaxTemp] = useState();
   const [condition, setCondition] = useState();
   const getLocation = () => {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const { latitude, longitude } = position.coords;
               resolve({ latitude, longitude });
            },
            (error) => {
               reject(`Error occurred :: ${error}`);

            }
         );
      })   
   };


useEffect(() => {
   async function fetchData() {
      try {
         const location = await getLocation();
         if(!location){
            return <p>Location error occurred</p>
         }
         const latitude = location.latitude;
         const longitude = location.longitude;
         const apiKey = import.meta.env.VITE_API_KEY;
         const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
         if(!res){
            return <p>Api error occurred</p>
         }
         const data = await res.json();
         console.log(data);
         setCity(data.name)
         setTemp(data.main.feels_like)
         setMinTemp(data.main.temp_min)
         setMaxTemp(data.main.temp_max)
         setCondition(data.weather[0].description)
      }
      catch (error) {
         console.error('There was a problem with the fetch operation:', error);
      }
   }
   fetchData()
}, [])
return (
   <div className='m-auto'>
      <Weather cityName={city} temp={temp} minTemp={minTemp} maxTemp={maxTemp} condition={condition}/>
   </div>
)
}

export default Home