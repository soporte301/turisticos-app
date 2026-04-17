import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Catalog from './pages/Catalog'
import Admin from './pages/Admin'
import CompanyAccess from './pages/CompanyAccess'

function App() {
  return (
    <BrowserRouter>
      {/* Tourm Theme does not require background images by default, just the clean bg color set in CSS */}
      <div className="relative min-h-screen z-10 antialiased selection:bg-primary/20 selection:text-heading transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/catalogo/:companyName" element={<Catalog />} />
          <Route path="/acceso/:companyName" element={<CompanyAccess />} />
          <Route path="/admin" element={<Admin />} />
          {/* Legacy route support */}
          <Route path="/supercolchones" element={<Catalog legacyCompany="Super Colchones" />} />
          {/* Direct dynamic route mapping request: /(Empresa) */}
          <Route path="/:companyName" element={<Catalog />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
