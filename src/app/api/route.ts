import { NextResponse } from "next/server";

export async function GET(){
  const res = await fetch('https://flight.api-service.live/flight-data', {
    headers: {
      'Content-Type': 'application/json',
      // 'API-KEY': 'f9a79c-a10b89'
    }
  })

  const data =  await res.json()

  return NextResponse.json({
    data
  }
  );

}

