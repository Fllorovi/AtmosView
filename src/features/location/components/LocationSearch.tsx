
import { useEffect, useRef, useState } from 'react'
import type { LocationSearchResult } from '../types/locationSearchResult'
import { searchLocations } from '../services/locationService'

interface LocationSearchProps {
  onSelect: (location: LocationSearchResult) => void
}

export default function LocationSearch({ onSelect }: LocationSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const requestId = useRef(0)

useEffect(() => {
  const normalizedQuery = query.trim()

  if (normalizedQuery.length < 2) {
    return
  }

  const currentRequestId = ++requestId.current

  const timeoutId = setTimeout(async () => {
    if (currentRequestId !== requestId.current) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const locations = await searchLocations(normalizedQuery)

      if (currentRequestId !== requestId.current) {
        return
      }

      setResults(locations)
    } catch (error) {
      if (currentRequestId !== requestId.current) {
        return
      }

      console.error('Ошибка поиска населённых пунктов:', error)
      setResults([])
      setError('Не удалось выполнить поиск. Попробуйте ещё раз.')
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false)
      }
    }
  }, 350)

  return () => clearTimeout(timeoutId)
}, [query])

function handleSelect(location: LocationSearchResult) {
  requestId.current++
  setQuery(location.name)
  setResults([])
  setIsLoading(false)
  setIsOpen(false)
  setError(null)
  onSelect(location)
}

function handleInputChange(value: string) {
  setQuery(value)
  requestId.current++

  if (value.trim().length < 2) {
    setResults([])
    setIsLoading(false)
    setError(null)
    setIsOpen(false)
  } else {
    setIsOpen(true)
  }
}

  function handleSearch() {
    if (query.trim().length >= 2) {
      setIsOpen(true)
    }
  }

  return (
    <div className="relative w-full max-w-[560px]">
      <div className="flex h-12 w-full items-center gap-3 rounded-full border border-white/15 bg-slate-950/70 px-4 shadow-lg backdrop-blur-md">
        {/* Иконка местоположения */}
        <svg
          className="h-5 w-5 shrink-0 text-[#d5b477]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>

        {/* Поле ввода */}
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-[#f0eee9] outline-none placeholder:text-white/50"
          type="search"
          placeholder="Поиск города или населённого пункта..."
          aria-label="Поиск города или населённого пункта"
          autoComplete="off"
          value={query}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={() => {
            if (query.trim().length >= 2) {
              setIsOpen(true)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch()
            }

            if (event.key === 'Escape') {
              setIsOpen(false)
            }
          }}
        />

        {/* Кнопка поиска */}
        <button
          className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#dfbd7e] text-[#172235] transition-colors hover:bg-[#ecd09a]"
          type="button"
          aria-label="Найти город"
          onClick={handleSearch}
        >
          <svg
            className="h-[18px] w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        </button>
      </div>

      {/* Выпадающий список */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute left-0 top-full z-50 mt-3 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111c2d]/95 shadow-2xl backdrop-blur-xl">
          {isLoading && (
            <div className="px-5 py-4 text-sm text-white/60">
              Поиск населённых пунктов...
            </div>
          )}

          {!isLoading && error && (
            <div className="px-5 py-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {!isLoading && !error && results.length === 0 && (
            <div className="px-5 py-4 text-sm text-white/50">
              Ничего не найдено
            </div>
          )}

          {!isLoading && !error && results.length > 0 && (
            <ul className="max-h-72 overflow-y-auto py-2">
              {results.map((location) => (
                <li key={location.id}>
                  <button
                    type="button"
                    className="flex w-full flex-col gap-1 px-5 py-3 text-left transition-colors hover:bg-white/10"
                    onClick={() => handleSelect(location)}
                  >
                    <span className="text-sm font-medium text-[#f0eee9]">
                      {location.name}
                    </span>

                    <span className="text-xs text-white/50">
                      {[location.admin1, location.admin2, location.country]
                        .filter(Boolean)
                        .filter((value, index, array) => array.indexOf(value) === index)
                        .join(', ')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
