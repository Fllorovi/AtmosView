import type { WeatherCondition } from './weatherCondition'

export interface DailyForecast {
  date: string

  temperatureMin: number
  temperatureMax: number
  temperatureMean: number | null

  condition: WeatherCondition

  precipitationProbabilityMax: number | null
  precipitationSum: number | null
  rainSum: number | null
  snowfallSum: number | null

  windSpeedMax: number | null
  windGustsMax: number | null
  windDirectionDominant: number | null

  uvIndexMax: number | null

  sunrise: string | null
  sunset: string | null
  daylightDuration: number | null
}