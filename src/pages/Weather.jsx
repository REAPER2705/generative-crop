import { useState, useEffect } from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets, MapPin, Loader2, CloudSnow, CloudDrizzle } from 'lucide-react'
import { getWeatherData, getWeatherByCoords, formatWeatherData } from '../services/weatherService'

const Weather = () => {
  const [location, setLocation] = useState('New Delhi, India')
  const [displayLocation, setDisplayLocation] = useState('New Delhi, India')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWeather()
  }, [])

  const fetchWeather = async (customLocation = null) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await getWeatherData(customLocation || location)
      const formatted = formatWeatherData(data)
      setWeatherData(formatted)
      setDisplayLocation(data.locationName || customLocation || location)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationSubmit = (e) => {
    e.preventDefault()
    fetchWeather(location)
  }

  const getWeatherIcon = (code, size = 'w-8 h-8') => {
    if (code >= 4000 && code < 5000) return <CloudRain className={`${size} text-blue-500`} />
    if (code >= 5000 && code < 6000) return <CloudSnow className={`${size} text-blue-300`} />
    if (code >= 1100 && code < 2000) return <Cloud className={`${size} text-gray-500`} />
    if (code === 1000) return <Sun className={`${size} text-yellow-500`} />
    if (code >= 4000) return <CloudDrizzle className={`${size} text-blue-400`} />
    return <Cloud className={`${size} text-gray-400`} />
  }

  // Get crop recommendations based on weather
  const getCropRecommendations = () => {
    if (!weatherData) return []

    const { temp, humidity, rainProb } = weatherData.current
    const recommendations = []

    // Rice - needs high water, warm temperature
    if (temp >= 20 && temp <= 35 && humidity >= 60) {
      recommendations.push({
        name: 'Rice',
        icon: '🌾',
        suitability: rainProb >= 40 ? 'Excellent' : 'Good',
        reason: `Temperature ${temp}°C and humidity ${humidity}% are ideal for rice cultivation`,
        color: 'bg-green-50 border-green-500'
      })
    }

    // Wheat - needs moderate temperature, less water
    if (temp >= 10 && temp <= 25 && humidity >= 40 && humidity <= 70) {
      recommendations.push({
        name: 'Wheat',
        icon: '🌾',
        suitability: rainProb <= 30 ? 'Excellent' : 'Good',
        reason: `Cool temperature ${temp}°C is perfect for wheat growth`,
        color: 'bg-amber-50 border-amber-500'
      })
    }

    // Maize - needs warm temperature, moderate water
    if (temp >= 18 && temp <= 32 && humidity >= 50) {
      recommendations.push({
        name: 'Maize',
        icon: '🌽',
        suitability: rainProb >= 30 && rainProb <= 60 ? 'Excellent' : 'Good',
        reason: `Warm temperature ${temp}°C and moderate rainfall are suitable for maize`,
        color: 'bg-yellow-50 border-yellow-500'
      })
    }

    // If no crops are suitable
    if (recommendations.length === 0) {
      if (temp < 10) {
        recommendations.push({
          name: 'Winter Crops',
          icon: '❄️',
          suitability: 'Consider',
          reason: 'Temperature is too low for rice, wheat, or maize. Consider winter vegetables.',
          color: 'bg-blue-50 border-blue-500'
        })
      } else if (temp > 35) {
        recommendations.push({
          name: 'Heat-Resistant Crops',
          icon: '🌵',
          suitability: 'Consider',
          reason: 'Temperature is too high. Consider heat-resistant crops or wait for cooler weather.',
          color: 'bg-orange-50 border-orange-500'
        })
      }
    }

    return recommendations
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-700">Loading weather data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card bg-red-50 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Weather</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2">Setup Instructions:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Get your free API key from <a href="https://www.tomorrow.io/weather-api/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Tomorrow.io</a></li>
                <li>Add to your <code className="bg-white px-2 py-1 rounded">.env</code> file:</li>
                <li><code className="bg-white px-2 py-1 rounded">VITE_TOMORROW_API_KEY=your_api_key_here</code></li>
                <li>Restart the development server</li>
              </ol>
            </div>
            <button onClick={() => fetchWeather()} className="btn-primary mt-4">
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!weatherData) return null

  const { current, forecast } = weatherData

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Cloud className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Live Weather Forecast</h1>
          <p className="text-xl text-gray-600">Real-time weather data powered by Tomorrow.io</p>
        </div>

        {/* Location Search */}
        <div className="card max-w-2xl mx-auto mb-8">
          <form onSubmit={handleLocationSubmit} className="flex gap-4">
            <div className="flex-grow relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city name (e.g., Mumbai, India)"
                className="input-field pl-10"
              />
            </div>
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
        </div>

        {/* Current Weather Dashboard */}
        <div className="card mb-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Current Weather</h2>
            <p className="text-blue-100">{displayLocation}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 text-center">
              {getWeatherIcon(current.weatherCode, 'w-12 h-12')}
              <div className="text-5xl font-bold mb-2 mt-3">{current.temp}°C</div>
              <div className="text-lg">{current.condition}</div>
            </div>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 text-center">
              <Droplets className="w-12 h-12 mx-auto mb-3" />
              <div className="text-5xl font-bold mb-2">{current.humidity}%</div>
              <div className="text-lg">Humidity</div>
            </div>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 text-center">
              <CloudRain className="w-12 h-12 mx-auto mb-3" />
              <div className="text-5xl font-bold mb-2">{current.rainProb}%</div>
              <div className="text-lg">Rain Probability</div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-lg">
            <Wind className="w-6 h-6" />
            <span>Wind Speed: {current.windSpeed} km/h</span>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="card">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">7-Day Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="font-bold text-lg mb-3 text-gray-800">{day.day}</div>
                <div className="flex justify-center mb-3">{getWeatherIcon(day.weatherCode)}</div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{day.temp}°C</div>
                <div className="text-sm text-gray-600 mb-2">Low: {day.tempMin}°C</div>
                <div className="flex items-center justify-center space-x-1 text-blue-600">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm font-semibold">{day.rain}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Recommendations Based on Weather */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Recommended Crops for Current Weather
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCropRecommendations().map((crop, index) => (
              <div
                key={index}
                className={`card ${crop.color} border-l-4`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-4xl">{crop.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{crop.name}</h3>
                    <span className={`text-sm font-semibold ${
                      crop.suitability === 'Excellent' ? 'text-green-600' : 
                      crop.suitability === 'Good' ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      {crop.suitability} Conditions
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{crop.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="card bg-green-50 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-3 text-green-800">Farming Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Monitor temperature and humidity daily</li>
              <li>✓ Plan irrigation based on rainfall forecast</li>
              <li>✓ Adjust planting schedule according to weather</li>
            </ul>
          </div>

          <div className="card bg-yellow-50 border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-3 text-yellow-800">Weather Alerts</h3>
            <ul className="space-y-2 text-gray-700">
              <li>⚠ Check 7-day forecast before planting</li>
              <li>⚠ Prepare for rain if probability is high</li>
              <li>⚠ Protect crops during extreme weather</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
