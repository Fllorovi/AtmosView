import type { WeatherLocation } from '../../types/weatherLocation'
import type { OpenMeteoResponse } from './openMeteoTypes'

const API_URL = 'https://api.open-meteo.com/v1/forecast'

export async function getWeatherForecast(
  location: WeatherLocation,
): Promise<OpenMeteoResponse> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),

    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),

    hourly: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'dew_point_2m',
      'precipitation_probability',
      'precipitation',
      'rain',
      'snowfall',
      'weather_code',
      'cloud_cover',
      'visibility',
      'uv_index',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),

    daily: [
      'weather_code',
      'temperature_2m_min',
      'temperature_2m_max',
      'precipitation_probability_max',
      'precipitation_sum',
      'rain_sum',
      'snowfall_sum',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
      'wind_direction_10m_dominant',
      'uv_index_max',
      'sunrise',
      'sunset',
      'daylight_duration',
    ].join(','),

    forecast_days: '16',
    timezone: location.timezone,

    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    timeformat: 'iso8601',
  })

  const response = await fetch(`${API_URL}?${params}`)

  if (!response.ok) {
    throw new Error(
      `Open-Meteo API error: ${response.status} ${response.statusText}`,
    )
  }

  const data = (await response.json()) as OpenMeteoResponse

  return data
}