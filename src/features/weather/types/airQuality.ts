export type AqiScale = 'european' | 'us'

export interface AirQuality {
  time: string

  aqi: number | null
  aqiScale: AqiScale | null //Общий индекс качества воздуха

  pm2_5: number | null //Мелкодисперсные частицы до 2,5 мкм
  pm10: number | null //Частицы до 10 мкм

  carbonMonoxide: number | null //Угарный газ
  nitrogenDioxide: number | null //Диоксид азота
  sulphurDioxide: number | null //Диоксид серы
  ozone: number | null 

  pollen: PollenData | null
}

export interface PollenData {
  alder: number | null
  birch: number | null
  grass: number | null
  mugwort: number | null
  olive: number | null
  ragweed: number | null
}