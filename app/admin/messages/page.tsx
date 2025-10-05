'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Eye, 
  Trash2, 
  MessageSquare,
  Calendar,
  User,
  Mail,
  Phone,
  Reply,
  X
} from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import { ContactMessage } from '@/types'
import toast from 'react-hot-toast'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [currentPage])

  useEffect(() => {
    filterMessages()
  }, [searchTerm, messages])

  const fetchMessages = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      })

      const response = await fetch(`/api/contact-messages?${params}`)
      const data = await response.json()
      
      setMessages(data.data || [])
      setTotalPages(data.pagination?.pages || 1)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching messages:', error)
      setLoading(false)
    }
  }

  const filterMessages = () => {
    if (!searchTerm) {
      setFilteredMessages(messages)
      return
    }

    const filtered = messages.filter(message =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setFilteredMessages(filtered)
  }

  const deleteMessage = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return
    }

    try {
      const response = await fetch(`/api/contact-messages/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Message supprimé avec succès')
        fetchMessages()
      } else {
        toast.error('Erreur lors de la suppression')
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression')
      console.error('Delete error:', error)
    }
  }

  const openEmailClient = (email: string, subject: string) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`
    window.open(mailtoLink)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Messages de Contact
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Gérez les messages reçus via le formulaire de contact
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou contenu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {loading ? (
                <div className="p-6 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : filteredMessages.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="h-8 w-8 rounded-full bg-navy flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                {message.name}
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {message.email}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {message.message}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(message.created_at).toLocaleDateString()}
                            {message.phone && (
                              <>
                                <Phone className="h-3 w-3 ml-3 mr-1" />
                                {message.phone}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              openEmailClient(message.email, `Re: Votre message du ${new Date(message.created_at).toLocaleDateString()}`)
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Répondre"
                          >
                            <Reply className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteMessage(message.id)
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    Aucun message trouvé
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm 
                      ? 'Essayez de modifier vos critères de recherche'
                      : 'Aucun message reçu pour le moment'
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} sur {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Précédent
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Détails du message
                  </h3>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedMessage.name}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedMessage.email}
                    </p>
                  </div>

                  {selectedMessage.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Téléphone
                      </label>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {selectedMessage.phone}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {new Date(selectedMessage.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <div className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {selectedMessage.message}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <button
                      onClick={() => openEmailClient(selectedMessage.email, `Re: Votre message du ${new Date(selectedMessage.created_at).toLocaleDateString()}`)}
                      className="btn-primary flex-1 flex items-center justify-center"
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Répondre
                    </button>
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="btn-outline flex items-center justify-center px-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">
                  Sélectionnez un message pour voir les détails
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
