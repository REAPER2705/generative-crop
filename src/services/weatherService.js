const TOMORROW_API_KEY = import.meta.env.VITE_TOMORROW_API_KEY

// Geocode location name to coordinates using OpenStreetMap (free, no API key needed)
const geocodeLocation = async (locationName) => {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'GreenCrops-FarmingApp/1.0'
      }
    })
    
    if (!response.ok) {
      throw new Error('Geocoding failed')
    }
    
    const data = await response.json()
    if (data.length === 0) {
      throw new Error('Location not found. Please try a different city name.')
    }
    
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    throw error
  }
}

// Get current weather and forecast
export const getWeatherData = async (location = 'New Delhi, India') => {
  if (!TOMORROW_API_KEY || TOMORROW_API_KEY === 'your_tomorrow_io_api_key_here') {
    throw new Error('Tomorrow.io API key not configured. Please add VITE_TOMORROW_API_KEY to your .env file')
  }

  try {
    // First, geocode the location to get coordinates
    const coords = await geocodeLocation(location)
    
    // Then fetch weather using coordinates
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${coords.lat},${coords.lon}&timesteps=1h,1d&units=metric&apikey=${TOMORROW_API_KEY}`

    const response = await fetch(url)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Weather API error: ${response.status} - ${errorData.message || 'Invalid request'}`)
    }

    const data = await response.json()
    data.locationName = coords.displayName // Add location name to response
    return data
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}

// Get weather by coordinates
export const getWeatherByCoords = async (lat, lon) => {
  if (!TOMORROW_API_KEY || TOMORROW_API_KEY === 'your_tomorrow_io_api_key_here') {
    throw new Error('Tomorrow.io API key not configured')
  }

  try {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1h,1d&units=metric&apikey=${TOMORROW_API_KEY}`

    const response = await fetch(url)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Weather API error: ${response.status} - ${errorData.message || 'Invalid request'}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}

// Format weather data for display
export const formatWeatherData = (data) => {
  if (!data || !data.timelines) {
    return null
  }

  const hourly = data.timelines.hourly || []
  const daily = data.timelines.daily || []
  
  const current = hourly[0]?.values || {}

  return {
    current: {
      temp: Math.round(current.temperature || 0),
      humidity: Math.round(current.humidity || 0),
      rainProb: Math.round(current.precipitationProbability || 0),
      windSpeed: Math.round(current.windSpeed || 0),
      condition: getWeatherCondition(current.weatherCode),
      weatherCode: current.weatherCode,
    },
    forecast: daily.slice(0, 7).map(day => ({
      day: new Date(day.time).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(day.values.temperatureMax || day.values.temperatureAvg || 0),
      tempMin: Math.round(day.values.temperatureMin || day.values.temperatureAvg || 0),
      rain: Math.round(day.values.precipitationProbabilityAvg || 0),
      weatherCode: day.values.weatherCodeMax || day.values.weatherCode || 1000,
    }))
  }
}

// Get weather condition from code
const getWeatherCondition = (code) => {
  const conditions = {
    1000: 'Clear',
    1100: 'Mostly Clear',
    1101: 'Partly Cloudy',
    1102: 'Mostly Cloudy',
    1001: 'Cloudy',
    2000: 'Fog',
    2100: 'Light Fog',
    4000: 'Drizzle',
    4001: 'Rain',
    4200: 'Light Rain',
    4201: 'Heavy Rain',
    5000: 'Snow',
    5001: 'Flurries',
    5100: 'Light Snow',
    5101: 'Heavy Snow',
    6000: 'Freezing Drizzle',
    6001: 'Freezing Rain',
    6200: 'Light Freezing Rain',
    6201: 'Heavy Freezing Rain',
    7000: 'Ice Pellets',
    7101: 'Heavy Ice Pellets',
    7102: 'Light Ice Pellets',
    8000: 'Thunderstorm',
  }
  return conditions[code] || 'Unknown'
}
