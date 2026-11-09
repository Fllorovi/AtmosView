import type {
  OpenMeteoGeocodingResponse,
} from './openMeteoGeocodingTypes'

const API_URL = 'https://geocoding-api.open-meteo.com/v1/search'

export async function searchOpenMeteoLocations(
  query: string,
): Promise<OpenMeteoGeocodingResponse> {
  const params = new URLSearchParams({
    name: query.trim(),
    count: '10',
    language: 'ru',
  })

  const response = await fetch(`${API_URL}?${params}`)

  if (!response.ok) {
    throw new Error(
      `Open-Meteo Geocoding API error: ${response.status} ${response.statusText}`,
    )
  }

  const data = (await response.json()) as OpenMeteoGeocodingResponse

  return data
}
