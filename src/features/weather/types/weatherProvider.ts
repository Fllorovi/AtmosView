import type { WeatherLocation } from './weatherLocation'
import type { WeatherData } from './weatherData'

export interface WeatherProvider {
  readonly name: string

  getWeather(location: WeatherLocation): Promise<WeatherData>
}