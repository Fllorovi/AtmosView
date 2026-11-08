
import type { WeatherCondition } from './weatherCondition'

export interface CurrentWeather {
  temperature: number
  feelsLike: number | null

  humidity: number | null
  pressure: number | null

  windSpeed: number | null
  windGusts: number | null
  windDirection: number | null //направление ветра в градусах

  precipitation: number | null
  cloudCover: number | null

  visibility: number | null
  dewPoint: number | null
  uvIndex: number | null //индекс ультрафиолетового излучения
  snowDepth: number | null

  condition: WeatherCondition
  isDay: boolean //для оформления темы приложения

  //время восхода и заката
  sunrise: string | null
  sunset: string | null
}
