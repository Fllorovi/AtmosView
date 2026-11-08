export interface OpenMeteoCurrent {
  time: string

  temperature_2m?: number
  relative_humidity_2m?: number
  apparent_temperature?: number
  is_day?: number

  precipitation?: number
  rain?: number
  snowfall?: number

  weather_code?: number
  cloud_cover?: number
  pressure_msl?: number

  wind_speed_10m?: number
  wind_direction_10m?: number
  wind_gusts_10m?: number
}

export interface OpenMeteoHourly {
  time: string[]

  temperature_2m?: (number | null)[]
  apparent_temperature?: (number | null)[]
  relative_humidity_2m?: (number | null)[]
  dew_point_2m?: (number | null)[]

  precipitation_probability?: (number | null)[]
  precipitation?: (number | null)[]
  rain?: (number | null)[]
  snowfall?: (number | null)[]

  weather_code?: (number | null)[]
  cloud_cover?: (number | null)[]
  visibility?: (number | null)[]
  uv_index?: (number | null)[]

  wind_speed_10m?: (number | null)[]
  wind_direction_10m?: (number | null)[]
  wind_gusts_10m?: (number | null)[]
}

export interface OpenMeteoDaily {
  time: string[]

  weather_code?: (number | null)[]

  temperature_2m_min?: (number | null)[]
  temperature_2m_max?: (number | null)[]

  precipitation_probability_max?: (number | null)[]
  precipitation_sum?: (number | null)[]
  rain_sum?: (number | null)[]
  snowfall_sum?: (number | null)[]

  wind_speed_10m_max?: (number | null)[]
  wind_gusts_10m_max?: (number | null)[]
  wind_direction_10m_dominant?: (number | null)[]

  uv_index_max?: (number | null)[]

  sunrise?: string[]
  sunset?: string[]
  daylight_duration?: (number | null)[]
}

export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  elevation: number

  generationtime_ms: number
  utc_offset_seconds: number

  timezone: string
  timezone_abbreviation: string

  current?: OpenMeteoCurrent

  hourly?: OpenMeteoHourly
  hourly_units?: Record<string, string>

  daily?: OpenMeteoDaily
  daily_units?: Record<string, string>
}