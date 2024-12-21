import React from 'react';
import { useState, useEffect } from 'react';
function Weather({ cityName, temp, minTemp, maxTemp, condition, }) {
   const isLoading = !cityName || temp === undefined || minTemp === undefined || maxTemp === undefined || condition === undefined;

   return (
      <>
         <div className='flex items-center justify-center  sm:w-full '>
            <div className={`mx-auto w-full max-w-lg bg-transparent rounded-xl p-10 border  border-black/50 backdrop-blur-xl bg-white/30 shadow-xl shadow-blue-500/50`}>
               <h2 className="text-center text-xl font-bold leading-tight">Weather details of the {cityName || 'Loading...'}</h2>
               {
                  isLoading ? <div>Loading...</div> :
                     <div className='flex gap-10 mt-5'>

                        <div className=' '>
                           <ul>
                              <li>Temperature: </li>
                              <li>Min temperature: </li>
                              <li>Max temperature: </li>
                              <li>Condition: </li>

                           </ul>
                        </div>
                        <div className=''>
                           <ul>
                              <li>{temp}</li>
                              <li>{minTemp}</li>
                              <li>{maxTemp}</li>
                              <li>{condition}</li>
                           </ul>
                        </div>

                     </div>
               }
            </div>
         </div>

      </>
   )

}

export default Weather;