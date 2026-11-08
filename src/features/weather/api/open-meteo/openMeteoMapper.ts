import type { WeatherLocation } from '../../types/weatherLocation'
import type { WeatherData } from '../../types/weatherData'
import type { WeatherCondition } from '../../types/weatherCondition'

import type {
  OpenMeteoResponse,
} from './openMeteoTypes'

// Преобразование кодов погоды Open-Meteo
function mapWeatherCode(code: number | null | undefined): WeatherCondition {
  if (code === null || code === undefined) {
    return 'unknown'
  }

  if (code === 0) return 'clear'

  if (code === 1 || code === 2) return 'partly-cloudy'

  if (code === 3) return 'cloudy'

  if (code === 45 || code === 48) return 'fog'

  if (code >= 51 && code <= 55) return 'drizzle'

  if (code >= 56 && code <= 57) return 'sleet'

  if (code >= 61 && code <= 63) return 'rain'

  if (code === 65) return 'heavy-rain'

  if (code === 66 || code === 67) return 'sleet'

  if (code >= 71 && code <= 73) return 'snow'

  if (code === 75) return 'heavy-snow'

  if (code === 77) return 'snow'

  if (code === 80 || code === 81) return 'rain'

  if (code === 82) return 'heavy-rain'

  if (code === 85) return 'snow'

  if (code === 86) return 'heavy-snow'

  if (code === 95 || code === 96 || code === 99) {
    return 'thunderstorm'
  }

  return 'unknown'
}

// Получение значения из массива
function getValue(
  values: (number | null)[] | undefined,
  index: number,
): number | null {
  return values?.[index] ?? null
}

// Преобразование ответа Open-Meteo
export function mapOpenMeteoResponse(
  response: OpenMeteoResponse,
  location: WeatherLocation,
): WeatherData {
  const current = response.current

  if (!current || current.temperature_2m === undefined) {
    throw new Error('Open-Meteo response does not contain current temperature')
  }

  const hourly = response.hourly
  const daily = response.daily

  // Определяем текущий день для времени восхода и заката
  const currentDate = current.time.slice(0, 10)
  const currentDayIndex = daily?.time.indexOf(currentDate) ?? -1
  const sunriseIndex = currentDayIndex >= 0 ? currentDayIndex : 0

  // Текущая погода
  const currentWeather = {
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature ?? null,

    humidity: current.relative_humidity_2m ?? null,
    pressure: current.pressure_msl ?? null,

    windSpeed: current.wind_speed_10m ?? null,
    windGusts: current.wind_gusts_10m ?? null,
    windDirection: current.wind_direction_10m ?? null,

    precipitation: current.precipitation ?? null,
    cloudCover: current.cloud_cover ?? null,

    visibility: null,
    dewPoint: null,
    uvIndex: null,
    snowDepth: null,

    condition: mapWeatherCode(current.weather_code),
    isDay: current.is_day === 1,

    sunrise: daily?.sunrise?.[sunriseIndex] ?? null,
    sunset: daily?.sunset?.[sunriseIndex] ?? null,
  }

  // Почасовой прогноз
  const hourlyForecast = (hourly?.time ?? [])
    .map((time, index) => {
      const temperature = getValue(hourly?.temperature_2m, index)

      if (temperature === null) {
        return null
      }

      return {
        time,

        temperature,
        feelsLike: getValue(hourly?.apparent_temperature, index),

        condition: mapWeatherCode(
          getValue(hourly?.weather_code, index),
        ),

        precipitationProbability: getValue(
          hourly?.precipitation_probability,
          index,
        ),

        precipitation: getValue(hourly?.precipitation, index),
        rain: getValue(hourly?.rain, index),
        snowfall: getValue(hourly?.snowfall, index),

        windSpeed: getValue(hourly?.wind_speed_10m, index),
        windDirection: getValue(hourly?.wind_direction_10m, index),
        windGusts: getValue(hourly?.wind_gusts_10m, index),

        humidity: getValue(hourly?.relative_humidity_2m, index),
        cloudCover: getValue(hourly?.cloud_cover, index),

        uvIndex: getValue(hourly?.uv_index, index),
        visibility: getValue(hourly?.visibility, index),
      }
    })
    .filter((item) => item !== null)

  // Дневной прогноз
  const dailyForecast = (daily?.time ?? [])
    .map((date, index) => {
      const temperatureMin = getValue(
        daily?.temperature_2m_min,
        index,
      )

      const temperatureMax = getValue(
        daily?.temperature_2m_max,
        index,
      )

      if (temperatureMin === null || temperatureMax === null) {
        return null
      }

      return {
        date,

        temperatureMin,
        temperatureMax,
        temperatureMean: null,

        condition: mapWeatherCode(
          getValue(daily?.weather_code, index),
        ),

        precipitationProbabilityMax: getValue(
          daily?.precipitation_probability_max,
          index,
        ),

        precipitationSum: getValue(daily?.precipitation_sum, index),
        rainSum: getValue(daily?.rain_sum, index),
        snowfallSum: getValue(daily?.snowfall_sum, index),

        windSpeedMax: getValue(daily?.wind_speed_10m_max, index),
        windGustsMax: getValue(daily?.wind_gusts_10m_max, index),
        windDirectionDominant: getValue(
          daily?.wind_direction_10m_dominant,
          index,
        ),

        uvIndexMax: getValue(daily?.uv_index_max, index),

        sunrise: daily?.sunrise?.[index] ?? null,
        sunset: daily?.sunset?.[index] ?? null,
        daylightDuration: getValue(
          daily?.daylight_duration,
          index,
        ),
      }
    })
    .filter((item) => item !== null)

  // Итоговая модель AtmosView
  return {
    location: {
      ...location,
      timezone: response.timezone,
    },

    current: currentWeather,

    hourly: hourlyForecast,
    daily: dailyForecast,

    airQuality: null,

    metadata: {
      provider: 'Open-Meteo',
      model: null,
      fetchedAt: new Date().toISOString(),
      attribution: 'https://open-meteo.com/',
    },
  }
}