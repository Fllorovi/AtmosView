
export interface LocationSearchResult {
  id: number
  name: string
  country: string
  countryCode: string | null
  latitude: number
  longitude: number
  timezone: string
  elevation: number | null
  population: number | null
  admin1: string | null
  admin2: string | null
}
