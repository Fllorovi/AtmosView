export interface WeatherMetadata {
  provider: string
  model: string | null //Используемая метеорологическая модель

  fetchedAt: string //Время получения данных приложением

  attribution: string | null
}