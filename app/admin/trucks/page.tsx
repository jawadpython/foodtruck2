'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Truck,
  Calendar,
  Tag
} from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import TruckModal from '@/components/TruckModal'
import { FoodTruck } from '@/types'
import toast from 'react-hot-toast'

export default function AdminTrucksPage() {
  const [trucks, setTrucks] = useState<FoodTruck[]>([])
  const [filteredTrucks, setFilteredTrucks] = useState<FoodTruck[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingTruck, setEditingTruck] = useState<FoodTruck | null>(null)

  const categories = [
    'all',
    'Vintage Food-Trucks',
    'Food Trucks',
    'Kiosque',
    'Conteneur',
    'Remorque',
    'Modulaire',
    'Mobile chef',
    'Charrette'
  ]

  useEffect(() => {
    fetchTrucks()
  }, [])

  useEffect(() => {
    filterTrucks()
  }, [searchTerm, selectedCategory, trucks])

  const fetchTrucks = async () => {
    try {
      const response = await fetch('/api/food-trucks')
      const data = await response.json()
      setTrucks(data.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching trucks:', error)
      setLoading(false)
    }
  }

  const filterTrucks = () => {
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
  }

  const handleEdit = (truck: FoodTruck) => {
    setEditingTruck(truck)
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce food truck ?')) {
      return
    }

    try {
      const response = await fetch(`/api/food-trucks/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Food truck supprimé avec succès')
        fetchTrucks()
      } else {
        toast.error('Erreur lors de la suppression')
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression')
      console.error('Delete error:', error)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingTruck(null)
  }

  const handleModalSuccess = () => {
    fetchTrucks()
    handleModalClose()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestion des Food Trucks
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gérez votre catalogue de food trucks
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un Food Truck
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un food truck..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
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

        {/* Trucks Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredTrucks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrucks.map((truck, index) => (
              <motion.div
                key={truck.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {truck.image_url ? (
                    <img
                      src={truck.image_url}
                      alt={truck.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Truck className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {truck.title}
                    </h3>
                    <span className="text-xs text-emerald bg-emerald/10 px-2 py-1 rounded-full">
                      {truck.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {truck.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    Créé le {new Date(truck.created_at).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(truck)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(truck.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <a
                      href={`/marketplace/${truck.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Voir en public"
                    >
                      <Eye className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Aucun food truck trouvé
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Commencez par ajouter votre premier food truck'
              }
            </p>
            {!searchTerm && selectedCategory === 'all' && (
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un Food Truck
              </button>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-navy dark:text-white">
                {trucks.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total Food Trucks
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald">
                {trucks.filter(t => t.category).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Avec Catégorie
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sky">
                {trucks.filter(t => t.image_url).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Avec Image
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <TruckModal
          truck={editingTruck}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </AdminLayout>
  )
}
