import type { WeatherLocation } from './weatherLocation'
import type { CurrentWeather } from './currentWeather'
import type { HourlyForecast } from './hourlyForecast'
import type { DailyForecast } from './dailyForecast'
import type { AirQuality } from './airQuality'
import type { WeatherMetadata } from './weatherMetadata'

export interface WeatherData {
  location: WeatherLocation

  current: CurrentWeather

  hourly: HourlyForecast[]
  daily: DailyForecast[]

  airQuality: AirQuality | null

  metadata: WeatherMetadata
}