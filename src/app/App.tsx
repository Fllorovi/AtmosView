import LocationSearch from '../features/location/components/LocationSearch'
import type { LocationSearchResult } from '../features/location/types/locationSearchResult'

function App() {
  function handleLocationSelect(location: LocationSearchResult) {
    console.log('Выбран населённый пункт:', location)
  }

  return (
    <div>
      <LocationSearch onSelect={handleLocationSelect} />
    </div>
  )
}

export default App