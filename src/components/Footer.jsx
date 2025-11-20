import { Sprout, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="w-8 h-8" />
              <span className="text-2xl font-bold">Green Crops</span>
            </div>
            <p className="text-primary-100">
              Smart Farming Assistant - Empowering farmers with technology for better yields and sustainable agriculture.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-primary-300 transition-colors">Home</a></li>
              <li><a href="/soil" className="hover:text-primary-300 transition-colors">Soil Health</a></li>
              <li><a href="/crops" className="hover:text-primary-300 transition-colors">Crop Recommendation</a></li>
              <li><a href="/weather" className="hover:text-primary-300 transition-colors">Weather Forecast</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>support@greencrops.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center">
          <p className="text-primary-200">© 2025 Green Crops. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 

