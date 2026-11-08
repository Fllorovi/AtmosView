import type { WeatherCondition } from './weatherCondition'

export interface HourlyForecast {
  time: string

  temperature: number
  feelsLike: number | null

  condition: WeatherCondition

  precipitationProbability: number | null //вероятность осадков
  precipitation: number | null //количество осадков в mm
  rain: number | null
  snowfall: number | null

  windSpeed: number | null
  windDirection: number | null
  windGusts: number | null //порывы ветра

  humidity: number | null //влажность
  cloudCover: number | null //облачность

  uvIndex: number | null
  visibility: number | null
}
