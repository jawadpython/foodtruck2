'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, Filter, Truck, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FoodTruck } from '@/types'

export default function MarketplacePage() {
  const [trucks, setTrucks] = useState<FoodTruck[]>([])
  const [filteredTrucks, setFilteredTrucks] = useState<FoodTruck[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = [
    'all',
    'Pizza',
    'Burger',
    'Tacos',
    'Sandwich',
    'Dessert',
    'Boissons',
    'Autre'
  ]

  useEffect(() => {
    fetch('/api/food-trucks')
      .then(res => res.json())
      .then(data => {
        setTrucks(data.data || [])
        setFilteredTrucks(data.data || [])
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    let filtered = trucks

    if (searchTerm) {
      filtered = filtered.filter(truck =>
        truck.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        truck.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(truck =>
        truck.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    setFilteredTrucks(filtered)
  }, [searchTerm, selectedCategory, trucks])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Header */}
      <section className="pt-20 pb-12 bg-light dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Nos Modèles de Food Trucks
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez notre gamme complète de food trucks personnalisés. 
              Chaque modèle est conçu pour répondre à vos besoins spécifiques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un modèle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Toutes catégories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredTrucks.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {filteredTrucks.length} modèle{filteredTrucks.length > 1 ? 's' : ''} trouvé{filteredTrucks.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTrucks.map((truck, index) => (
                  <motion.div
                    key={truck.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card p-6 group cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      {truck.image_url ? (
                        <Image
                          src={truck.image_url}
                          alt={truck.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <Truck className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-navy dark:text-white mb-2">
                      {truck.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {truck.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-emerald font-medium bg-emerald/10 px-3 py-1 rounded-full">
                        {truck.category}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <Link
                        href={`/marketplace/${truck.id}`}
                        className="btn-primary w-full text-center block"
                      >
                        Voir détails
                      </Link>
                      <button className="btn-secondary w-full">
                        Demander un devis
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Aucun modèle trouvé
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-light dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-navy dark:text-white">
              Vous ne trouvez pas ce que vous cherchez ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Nous créons des food trucks sur mesure selon vos besoins spécifiques
            </p>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              Demander un devis personnalisé
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
