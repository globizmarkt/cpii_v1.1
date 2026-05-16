import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-blue-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Club Privado de Inversores
              </h1>
            </div>
            <div className="flex space-x-4">
              <a href="#inicio" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Inicio
              </a>
              <a href="#oportunidades" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Oportunidades
              </a>
              <a href="#miembros" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Miembros
              </a>
              <a href="#recursos" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Recursos
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-cyan-600 transition">
                Acceder
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Invierte en Inmuebles de Alto Rendimiento
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Únete a una comunidad exclusiva de inversores que acceden a oportunidades inmobiliarias 
              cuidadosamente seleccionadas con retornos superiores al promedio del mercado.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition transform hover:scale-105">
              Solicitar Membresía
            </button>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Beneficios Exclusivos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900/60 backdrop-blur-sm border border-blue-800/30 rounded-lg p-6 hover:border-blue-600/50 transition">
                <div className="text-blue-400 text-4xl mb-4">📊</div>
                <h4 className="text-xl font-semibold text-white mb-3">Análisis Profesional</h4>
                <p className="text-gray-400">
                  Reportes detallados de cada oportunidad con proyecciones de ROI, análisis de mercado y due diligence completo.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-blue-800/30 rounded-lg p-6 hover:border-blue-600/50 transition">
                <div className="text-blue-400 text-4xl mb-4">🤝</div>
                <h4 className="text-xl font-semibold text-white mb-3">Red de Contactos</h4>
                <p className="text-gray-400">
                  Conecta con inversores experimentados, desarrolladores y profesionales del sector inmobiliario.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-sm border border-blue-800/30 rounded-lg p-6 hover:border-blue-600/50 transition">
                <div className="text-blue-400 text-4xl mb-4">💼</div>
                <h4 className="text-xl font-semibold text-white mb-3">Acceso Prioritario</h4>
                <p className="text-gray-400">
                  Oportunidades exclusivas antes que lleguen al mercado público, con condiciones preferenciales.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Oportunidades Destacadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-900/60 backdrop-blur-sm border border-blue-800/30 rounded-lg overflow-hidden hover:border-blue-600/50 transition">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-500"></div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">RESIDENCIAL</span>
                  <h4 className="text-xl font-semibold text-white mt-4 mb-2">Desarrollo Residencial Premium</h4>
                  <p className="text-gray-400 text-sm mb-4">Madrid, España</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-xs">ROI Proyectado</p>
                      <p className="text-green-400 text-lg font-bold">18.5%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Inversión Min.</p>
                      <p className="text-white text-lg font-bold">€50K</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-sm border border-blue-800/30 rounded-lg overflow-hidden hover:border-blue-600/50 transition">
                <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-500"></div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">COMERCIAL</span>
                  <h4 className="text-xl font-semibold text-white mt-4 mb-2">Centro Comercial Zona Norte</h4>
                  <p className="text-gray-400 text-sm mb-4">Barcelona, España</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-xs">ROI Proyectado</p>
                      <p className="text-green-400 text-lg font-bold">22.3%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Inversión Min.</p>
                      <p className="text-white text-lg font-bold">€100K</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-sm border border-blue-800/30 rounded-lg overflow-hidden hover:border-blue-600/50 transition">
                <div className="h-48 bg-gradient-to-br from-green-600 to-teal-500"></div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">TURÍSTICO</span>
                  <h4 className="text-xl font-semibold text-white mt-4 mb-2">Complejo Vacacional Costa</h4>
                  <p className="text-gray-400 text-sm mb-4">Valencia, España</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-xs">ROI Proyectado</p>
                      <p className="text-green-400 text-lg font-bold">15.8%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Inversión Min.</p>
                      <p className="text-white text-lg font-bold">€75K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-slate-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-6">¿Listo para Comenzar?</h3>
            <p className="text-gray-300 mb-8">
              Solicita tu membresía hoy y obtén acceso inmediato a nuestra plataforma exclusiva de inversión.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-cyan-600 transition transform hover:scale-105">
              Solicitar Acceso Ahora
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 border-t border-blue-800/30 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2026 Club Privado de Inversores Inmobiliarios. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
