'use client';

import React, { useEffect, useState } from 'react'

const api_url = "https://flight.api-service.live"

const page = () => {

  const [data, setData] = useState("")
  const [error, setError] = useState("")

  const getFlightTimetable = async () => {
    try {

      const response = await fetch(`${api_url}/flight-data`, {
        method: 'GET',
      });

      const responseData = await response.json();
      console.log(responseData)

      if (responseData) {
        console.log('User data', responseData);
        setData(responseData?.data)
      } else {
        console.error('No data found');
      }
    } catch (err: any) {
      setError(err)
      console.error(err);
    }
  }

  useEffect(() => {
    getFlightTimetable();
  }, [])

  return (
      <div className="App">
        {error ? (
          <p>Error fetching data:</p>
        ) : data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    );
}

export default page



// 'use client';

// import React, { useEffect, useState } from 'react';

// const api_url = "https://aviation-edge.com/v2/public/timetable";

// const page = () => {

//   const [data, setData] = useState("");
//   const [error, setError] = useState("");

//   const getFlightTimetable = async () => {
//     try {
//       // Add query parameters to the URL
//       const queryParams = new URLSearchParams({
//         key: "f9a79c-a10b89", // Your API key
//         iataCode: "JFK", // Example IATA code
//         type: "departure" // Example type
//       }).toString();

//       const response = await fetch(`${api_url}?${queryParams}`, {
//         method: 'GET',
//       });

//       const responseData = await response.json();
//       console.log(responseData);

//       if (responseData) {
//         console.log('User data', responseData);
//         setData(responseData);
//       } else {
//         console.error('No data found');
//       }
//     } catch (err: any) {
//       setError(err);
//       console.error(err);
//     }
//   }

//   useEffect(() => {
//     getFlightTimetable();
//   }, []);

//   return (
//       <div className="App">
//         {error? (
//           <p>Error fetching data:</p>
//         ) : data? (
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         ) : (
//           <p>Loading data...</p>
//         )}
//       </div>
//     );
// }

// export default page;