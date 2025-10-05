'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, 
  MessageSquare, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import { FoodTruck, QuoteRequest, ContactMessage } from '@/types'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalTrucks: 0,
    totalQuotes: 0,
    totalMessages: 0,
    pendingQuotes: 0
  })
  const [recentQuotes, setRecentQuotes] = useState<QuoteRequest[]>([])
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [trucksRes, quotesRes, messagesRes] = await Promise.all([
        fetch('/api/food-trucks'),
        fetch('/api/quote-requests?limit=5'),
        fetch('/api/contact-messages?limit=5')
      ])

      const trucksData = await trucksRes.json()
      const quotesData = await quotesRes.json()
      const messagesData = await messagesRes.json()

      const pendingQuotes = quotesData.data?.filter((q: QuoteRequest) => q.status === 'pending').length || 0

      setStats({
        totalTrucks: trucksData.data?.length || 0,
        totalQuotes: quotesData.pagination?.total || 0,
        totalMessages: messagesData.pagination?.total || 0,
        pendingQuotes
      })

      setRecentQuotes(quotesData.data || [])
      setRecentMessages(messagesData.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }

  const statCards = [
    {
      icon: Truck,
      title: 'Food Trucks',
      value: stats.totalTrucks,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      icon: FileText,
      title: 'Devis Demandés',
      value: stats.totalQuotes,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      icon: MessageSquare,
      title: 'Messages',
      value: stats.totalMessages,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      icon: AlertCircle,
      title: 'En Attente',
      value: stats.pendingQuotes,
      color: 'bg-orange-500',
      change: '-3%'
    }
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tableau de Bord
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Vue d'ensemble de votre activité
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Dernière mise à jour: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500 font-medium">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs mois dernier</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Quote Requests */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Demandes de Devis Récentes
                </h3>
                <a
                  href="/admin/quotes"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  Voir tout
                </a>
              </div>
            </div>
            <div className="p-6">
              {recentQuotes.length > 0 ? (
                <div className="space-y-4">
                  {recentQuotes.map((quote) => (
                    <div key={quote.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {quote.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {quote.email}
                        </p>
                        {quote.food_truck_title && (
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            {quote.food_truck_title}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          quote.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          quote.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {quote.status === 'pending' ? 'En attente' :
                           quote.status === 'in_progress' ? 'En cours' : 'Terminé'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(quote.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Aucune demande récente
                </p>
              )}
            </div>
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Messages Récents
                </h3>
                <a
                  href="/admin/messages"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  Voir tout
                </a>
              </div>
            </div>
            <div className="p-6">
              {recentMessages.length > 0 ? (
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {message.name}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(message.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {message.message}
                      </p>
                      {message.email && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          {message.email}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Aucun message récent
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Actions Rapides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/trucks/new"
              className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <Plus className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Ajouter un Food Truck
              </span>
            </a>
            <a
              href="/admin/quotes"
              className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <FileText className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                Gérer les Devis
              </span>
            </a>
            <a
              href="/admin/messages"
              className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-purple-600 mr-3" />
              <span className="text-purple-600 dark:text-purple-400 font-medium">
                Voir les Messages
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
