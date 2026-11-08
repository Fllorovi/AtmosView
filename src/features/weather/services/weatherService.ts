import type { WeatherLocation } from '../types/weatherLocation'
import type { WeatherData } from '../types/weatherData'

import { getWeatherForecast } from '../api/open-meteo/openMeteoApi'
import { mapOpenMeteoResponse } from '../api/open-meteo/openMeteoMapper'

export async function getWeather(
  location: WeatherLocation,
): Promise<WeatherData> {
  const response = await getWeatherForecast(location)

  const weatherData = mapOpenMeteoResponse(response, location)

  return weatherData
}