export interface OpenMeteoGeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation?: number
  feature_code?: string
  country_code?: string
  country?: string
  timezone: string
  population?: number
  postcodes?: string[]
  admin1?: string
  admin2?: string
  admin3?: string
  admin4?: string
}

export interface OpenMeteoGeocodingResponse {
  results?: OpenMeteoGeocodingResult[]
  generationtime_ms: number
}
