import { useState } from 'react'
import { Sprout, Droplets, Thermometer, TrendingUp } from 'lucide-react'

const CropRecommendation = () => {
  const [location, setLocation] = useState('')
  const [month, setMonth] = useState('')
  const [crops, setCrops] = useState([])

  const cropDatabase = {
    'January': [
      { name: 'Wheat', image: '🌾', water: 'Medium', temp: '15-25°C', profit: 4 },
      { name: 'Mustard', image: '🌻', water: 'Low', temp: '10-25°C', profit: 3 },
      { name: 'Potato', image: '🥔', water: 'Medium', temp: '15-20°C', profit: 5 },
      { name: 'Peas', image: '🫛', water: 'Low', temp: '10-20°C', profit: 3 },
      { name: 'Carrot', image: '🥕', water: 'Medium', temp: '15-20°C', profit: 4 },
    ],
    'June': [
      { name: 'Rice', image: '🌾', water: 'High', temp: '25-35°C', profit: 5 },
      { name: 'Cotton', image: '☁️', water: 'Medium', temp: '25-35°C', profit: 4 },
      { name: 'Maize', image: '🌽', water: 'Medium', temp: '20-30°C', profit: 4 },
      { name: 'Soybean', image: '🫘', water: 'Medium', temp: '25-30°C', profit: 3 },
      { name: 'Groundnut', image: '🥜', water: 'Low', temp: '25-30°C', profit: 4 },
    ],
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedCrops = cropDatabase[month] || cropDatabase['January']
    setCrops(selectedCrops)
  }

  const getWaterColor = (water) => {
    if (water === 'High') return 'text-blue-600'
    if (water === 'Medium') return 'text-yellow-600'
    return 'text-orange-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Sprout className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Crop Recommendation</h1>
          <p className="text-xl text-gray-600">Get personalized crop suggestions based on your location and season</p>
        </div>

        {/* Input Form */}
        <div className="card max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
                placeholder="Enter your location (e.g., Punjab, Maharashtra)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Month
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <button type="submit" className="btn-primary w-full">
              Get Recommendations
            </button>
          </form>
        </div>

        {/* Crop Cards */}
        {crops.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Recommended Crops for {month}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop, index) => (
                <div
                  key={index}
                  className="card hover:scale-105 transform transition-all duration-300"
                >
                  <div className="text-6xl text-center mb-4">{crop.image}</div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
                    {crop.name}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Droplets className={`w-5 h-5 ${getWaterColor(crop.water)}`} />
                        <span className="font-medium text-gray-700">Water</span>
                      </div>
                      <span className={`font-semibold ${getWaterColor(crop.water)}`}>
                        {crop.water}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-gray-700">Temperature</span>
                      </div>
                      <span className="font-semibold text-orange-600">{crop.temp}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-700">Profitability</span>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xl ${
                              i < crop.profit ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CropRecommendation
