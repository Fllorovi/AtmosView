import type { LocationSearchResult } from '../../types/locationSearchResult'
import type { OpenMeteoGeocodingResult } from './openMeteoGeocodingTypes'

export function mapLocationSearchResult(
  result: OpenMeteoGeocodingResult,
): LocationSearchResult {
  return {
    id: result.id,
    name: result.name,
    country: result.country ?? '',
    countryCode: result.country_code ?? null,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
    elevation:
  result.elevation === undefined || result.elevation === -9999
    ? null
    : result.elevation,
    population: result.population ?? null,
    admin1: result.admin1 ?? null,
    admin2: result.admin2 ?? null,
  }
}

export function mapLocationSearchResults(
  results: OpenMeteoGeocodingResult[] = [],
): LocationSearchResult[] {
  return results.map(mapLocationSearchResult)
}
