import { useState } from 'react'
import { Leaf, Calendar, Package } from 'lucide-react'

const Fertilizer = () => {
  const [selectedCrop, setSelectedCrop] = useState('')
  const [schedule, setSchedule] = useState(null)

  const fertilizerData = {
    Rice: {
      schedule: [
        { stage: 'Basal (0-7 days)', fertilizer: 'NPK 20:20:20', quantity: '50 kg/acre', organic: 'Compost 500 kg/acre' },
        { stage: 'Tillering (20-25 days)', fertilizer: 'Urea', quantity: '25 kg/acre', organic: 'Neem Cake 100 kg/acre' },
        { stage: 'Panicle (40-45 days)', fertilizer: 'NPK 10:26:26', quantity: '30 kg/acre', organic: 'Vermicompost 200 kg/acre' },
        { stage: 'Flowering (60-65 days)', fertilizer: 'Potash', quantity: '15 kg/acre', organic: 'Seaweed Extract 5L/acre' },
      ],
    },
    Wheat: {
      schedule: [
        { stage: 'Sowing (0 days)', fertilizer: 'DAP', quantity: '40 kg/acre', organic: 'FYM 1000 kg/acre' },
        { stage: 'Crown Root (21 days)', fertilizer: 'Urea', quantity: '30 kg/acre', organic: 'Bone Meal 50 kg/acre' },
        { stage: 'Tillering (40 days)', fertilizer: 'NPK 12:32:16', quantity: '25 kg/acre', organic: 'Compost Tea 10L/acre' },
        { stage: 'Flowering (70 days)', fertilizer: 'Potash', quantity: '20 kg/acre', organic: 'Wood Ash 100 kg/acre' },
      ],
    },
    Cotton: {
      schedule: [
        { stage: 'Planting (0 days)', fertilizer: 'NPK 19:19:19', quantity: '45 kg/acre', organic: 'Compost 600 kg/acre' },
        { stage: 'Vegetative (30 days)', fertilizer: 'Urea', quantity: '35 kg/acre', organic: 'Neem Cake 150 kg/acre' },
        { stage: 'Flowering (60 days)', fertilizer: 'NPK 13:0:45', quantity: '30 kg/acre', organic: 'Vermicompost 250 kg/acre' },
        { stage: 'Boll Formation (90 days)', fertilizer: 'Potash', quantity: '25 kg/acre', organic: 'Seaweed 8L/acre' },
      ],
    },
  }

  const handleCropSelect = (e) => {
    const crop = e.target.value
    setSelectedCrop(crop)
    if (crop && fertilizerData[crop]) {
      setSchedule(fertilizerData[crop].schedule)
    } else {
      setSchedule(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Package className="w-16 h-16 text-amber-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Fertilizer Guide</h1>
          <p className="text-xl text-gray-600">Get crop-specific fertilizer schedules and organic alternatives</p>
        </div>

        {/* Crop Selection */}
        <div className="card max-w-2xl mx-auto mb-12">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Select Your Crop
          </label>
          <select
            value={selectedCrop}
            onChange={handleCropSelect}
            className="input-field text-lg"
          >
            <option value="">Choose a crop...</option>
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Cotton">Cotton</option>
          </select>
        </div>

        {/* Fertilizer Schedule */}
        {schedule && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Fertilizer Schedule for {selectedCrop}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {schedule.map((item, index) => (
                <div key={index} className="card hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-5 h-5 text-amber-600" />
                        <h3 className="text-xl font-bold text-gray-800">{item.stage}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 ml-16">
                    {/* Chemical Fertilizer */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-800">Chemical Fertilizer</span>
                      </div>
                      <div className="text-gray-700">
                        <div className="font-medium">{item.fertilizer}</div>
                        <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                      </div>
                    </div>

                    {/* Organic Alternative */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Leaf className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Organic Alternative</span>
                      </div>
                      <div className="text-gray-700">
                        <div className="font-medium">{item.organic}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 mt-8">
              <h3 className="text-2xl font-bold mb-4 text-green-800">Application Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Apply fertilizers in the early morning or late evening</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Ensure adequate soil moisture before application</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Mix organic fertilizers with soil for better absorption</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Follow recommended dosage to avoid over-fertilization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Store fertilizers in a cool, dry place away from sunlight</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Fertilizer
