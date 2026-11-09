import type { LocationSearchResult } from '../types/locationSearchResult'

import { searchOpenMeteoLocations } from '../api/open-meteo/openMeteoGeocodingApi'
import { mapLocationSearchResults } from '../api/open-meteo/locationSearchMapper'

export async function searchLocations(
  query: string,
): Promise<LocationSearchResult[]> {
  const normalizedQuery = query.trim()

  if (normalizedQuery.length < 2) {
    return []
  }

  const response = await searchOpenMeteoLocations(normalizedQuery)

  return mapLocationSearchResults(response.results)
}
