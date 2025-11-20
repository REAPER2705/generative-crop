import { Link } from 'react-router-dom'
import { Sparkles, Leaf, CloudRain, DollarSign, ArrowRight, CheckCircle, Play } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI Crop Analysis',
      description: 'Upload crop photos for instant AI-powered disease detection and health analysis',
      link: '/ai-analysis',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Soil Health',
      description: 'Analyze NPK values and get detailed soil condition reports',
      link: '/soil',
    },
    {
      icon: <CloudRain className="w-8 h-8" />,
      title: 'Weather Forecast',
      description: '7-day accurate weather predictions for better farm planning',
      link: '/weather',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Market Prices',
      description: 'Real-time crop prices and market trends analysis',
      link: '/market',
    },
  ]

  const benefits = [
    'AI-Powered Crop Disease Detection',
    'Real-time Weather Monitoring',
    'Soil Health Analysis',
    'Market Price Tracking',
    'Data-Driven Insights',
    '24/7 Support'
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-50 via-white to-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                  🌾 Smart Agriculture Technology
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Grow Smarter with
                <span className="text-primary-600"> AI-Powered</span> Farming
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your farming with cutting-edge AI technology. Get instant crop analysis, 
                weather forecasts, and market insights all in one platform.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/ai-analysis" className="btn-primary inline-flex items-center space-x-2">
                  <span>Start Analysis</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-secondary inline-flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-primary-600">10K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">95%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800"
                  alt="Smart Farming"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to make data-driven farming decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-8 bg-white border-2 border-gray-100 rounded-2xl hover:border-primary-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose Green Crops?
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Join thousands of farmers who are already using AI to increase their yields and reduce costs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 text-white">
                    <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Start Your Free Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Upload Crop Photo</h4>
                    <p className="text-gray-600 text-sm">Take a photo of your crop or soil</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI Analysis</h4>
                    <p className="text-gray-600 text-sm">Our AI analyzes in seconds</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Get Insights</h4>
                    <p className="text-gray-600 text-sm">Receive detailed recommendations</p>
                  </div>
                </div>
              </div>
              <Link to="/ai-analysis" className="btn-primary w-full mt-8 text-center">
                Try AI Analysis Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers using AI-powered insights to grow better crops
          </p>
          <Link to="/ai-analysis" className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4">
            <span>Get Started Free</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
