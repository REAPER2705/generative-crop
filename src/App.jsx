import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AIAnalysis from './pages/AIAnalysis'
import SoilHealth from './pages/SoilHealth'
import CropRecommendation from './pages/CropRecommendation'
import Weather from './pages/Weather'
import Fertilizer from './pages/Fertilizer'
import MarketPrice from './pages/MarketPrice'
import DebugEnv from './pages/DebugEnv'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-analysis" element={<AIAnalysis />} />
            <Route path="/soil" element={<SoilHealth />} />
            <Route path="/crops" element={<CropRecommendation />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/fertilizer" element={<Fertilizer />} />
            <Route path="/market" element={<MarketPrice />} />
            <Route path="/debug" element={<DebugEnv />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
