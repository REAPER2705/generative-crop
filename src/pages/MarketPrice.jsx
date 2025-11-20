import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'

const MarketPrice = () => {
  const marketData = [
    { crop: 'Rice', minPrice: 1850, maxPrice: 2100, trend: 'up', change: '+5%' },
    { crop: 'Wheat', minPrice: 2000, maxPrice: 2250, trend: 'up', change: '+3%' },
    { crop: 'Cotton', minPrice: 5500, maxPrice: 6200, trend: 'down', change: '-2%' },
    { crop: 'Sugarcane', minPrice: 280, maxPrice: 320, trend: 'up', change: '+4%' },
    { crop: 'Maize', minPrice: 1650, maxPrice: 1900, trend: 'up', change: '+6%' },
    { crop: 'Soybean', minPrice: 3800, maxPrice: 4200, trend: 'down', change: '-1%' },
    { crop: 'Groundnut', minPrice: 5200, maxPrice: 5800, trend: 'up', change: '+7%' },
    { crop: 'Potato', minPrice: 800, maxPrice: 1200, trend: 'up', change: '+10%' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <DollarSign className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Market Prices</h1>
          <p className="text-xl text-gray-600">Real-time crop prices and market trends</p>
        </div>

        {/* Price Chart Visualization */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Price Comparison Chart</h2>
          <div className="space-y-4">
            {marketData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">{item.crop}</span>
                  <span className="text-sm text-gray-600">₹{item.minPrice} - ₹{item.maxPrice}/quintal</span>
                </div>
                <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${(item.maxPrice / 6500) * 100}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-end pr-4">
                    <span className="text-xs font-semibold text-white">
                      ₹{item.maxPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Table */}
        <div className="card overflow-hidden">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Detailed Price List</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Crop</th>
                  <th className="px-6 py-4 text-left font-semibold">Min Price (₹/quintal)</th>
                  <th className="px-6 py-4 text-left font-semibold">Max Price (₹/quintal)</th>
                  <th className="px-6 py-4 text-left font-semibold">Trend</th>
                  <th className="px-6 py-4 text-left font-semibold">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {marketData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">{item.crop}</td>
                    <td className="px-6 py-4 text-gray-700">₹{item.minPrice.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-700">₹{item.maxPrice.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      ) : (
                        <TrendingDown className="w-6 h-6 text-red-600" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {item.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="card bg-green-50 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-3 text-green-800">Top Gainers</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-700">Potato</span>
                <span className="text-green-600 font-semibold">+10%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Groundnut</span>
                <span className="text-green-600 font-semibold">+7%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Maize</span>
                <span className="text-green-600 font-semibold">+6%</span>
              </li>
            </ul>
          </div>

          <div className="card bg-blue-50 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-3 text-blue-800">Market Tips</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✓ Best time to sell: Early morning</li>
              <li>✓ Check quality standards before selling</li>
              <li>✓ Compare prices across markets</li>
            </ul>
          </div>

          <div className="card bg-yellow-50 border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-3 text-yellow-800">Price Alerts</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>⚠ Cotton prices declining</li>
              <li>⚠ High demand for wheat</li>
              <li>⚠ Potato prices at peak</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketPrice
