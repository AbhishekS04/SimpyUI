import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Components from './pages/Components'
import ComponentDetail from './pages/ComponentDetail'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/components" element={<Components />} />
          <Route path="/components/:slug" element={<ComponentDetail />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
