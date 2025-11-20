import { useState } from 'react'
import { Leaf, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

const SoilHealth = () => {
  const [npkValues, setNpkValues] = useState({ n: '', p: '', k: '' })
  const [result, setResult] = useState(null)

  const analyzeSoil = (e) => {
    e.preventDefault()
    const { n, p, k } = npkValues
    const avg = (parseFloat(n) + parseFloat(p) + parseFloat(k)) / 3

    let condition, icon, color, crops
    if (avg >= 70) {
      condition = 'Good'
      icon = <CheckCircle className="w-16 h-16" />
      color = 'text-green-600'
      crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize']
    } else if (avg >= 40) {
      condition = 'Average'
      icon = <AlertCircle className="w-16 h-16" />
      color = 'text-yellow-600'
      crops = ['Pulses', 'Millets', 'Groundnut', 'Soybean', 'Barley']
    } else {
      condition = 'Poor'
      icon = <XCircle className="w-16 h-16" />
      color = 'text-red-600'
      crops = ['Legumes', 'Green Manure Crops', 'Cover Crops']
    }

    setResult({ condition, icon, color, crops, n, p, k })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Leaf className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Soil Health Analysis</h1>
          <p className="text-xl text-gray-600">Enter NPK values to analyze your soil condition</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter NPK Values</h2>
            <form onSubmit={analyzeSoil} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nitrogen (N) - kg/ha
                </label>
                <input
                  type="number"
                  value={npkValues.n}
                  onChange={(e) => setNpkValues({ ...npkValues, n: e.target.value })}
                  className="input-field"
                  placeholder="Enter Nitrogen value (0-100)"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phosphorus (P) - kg/ha
                </label>
                <input
                  type="number"
                  value={npkValues.p}
                  onChange={(e) => setNpkValues({ ...npkValues, p: e.target.value })}
                  className="input-field"
                  placeholder="Enter Phosphorus value (0-100)"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Potassium (K) - kg/ha
                </label>
                <input
                  type="number"
                  value={npkValues.k}
                  onChange={(e) => setNpkValues({ ...npkValues, k: e.target.value })}
                  className="input-field"
                  placeholder="Enter Potassium value (0-100)"
                  min="0"
                  max="100"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Analyze Soil
              </button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              <div className="card text-center">
                <div className={`${result.color} mb-4 flex justify-center`}>
                  {result.icon}
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  Soil Condition: <span className={result.color}>{result.condition}</span>
                </h3>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{result.n}</div>
                    <div className="text-sm text-gray-600">Nitrogen</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{result.p}</div>
                    <div className="text-sm text-gray-600">Phosphorus</div>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">{result.k}</div>
                    <div className="text-sm text-gray-600">Potassium</div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Suitable Crops</h3>
                <div className="space-y-3">
                  {result.crops.map((crop, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                    >
                      <Leaf className="w-6 h-6 text-primary-600" />
                      <span className="text-lg font-medium text-gray-800">{crop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SoilHealth
