import { useEffect, useState } from "react"

function App() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'
  const totalPokemons = 40 
  
  // Función para obtener múltiples pokémons
  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const promises = []
      for (let i = 1; i <= totalPokemons; i++) {  // ← CAMBIO AQUÍ: de 5 a 1
        promises.push(fetch(`${BASE_URL}${i}`).then(res => res.json()))
      }
      
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false)
    } catch (error) {
      console.error('ERROR AL OBTENER POKÉMONS:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 md:p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
          Pokédex
        </h1>
        <p className="text-white/80 text-lg">
          Encuentra tu Pokémon favorito
        </p>
      </header>

      {/* Loading */}
      {loading && (
        <div className="text-center text-white text-2xl">
          Cargando Pokémons...
        </div>
      )}

      {/* Grid de Pokémons - RESPONSIVO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {pokemons.map((pokemon) => (
          <div 
            key={pokemon.id}
            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
          >
            {/* Imagen del Pokémon */}
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="w-full h-32 object-contain"
              />
            </div>

            {/* Nombre y número */}
            <div className="text-center">
              <p className="text-gray-500 text-sm font-semibold">
                #{pokemon.id.toString().padStart(3, '0')}
              </p>
              <h2 className="text-2xl font-bold text-gray-800 capitalize">
                {pokemon.name}
              </h2>

              {/* Tipos */}
              <div className="flex gap-2 justify-center mt-3">
                {pokemon.types.map((type) => (
                  <span 
                    key={type.type.name}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-4 text-sm text-gray-600">
                <p>Altura: {pokemon.height / 10}m</p>
                <p>Peso: {pokemon.weight / 10}kg</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App