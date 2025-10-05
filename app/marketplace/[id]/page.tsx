'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Truck, Phone, Mail, CheckCircle, Star } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import QuoteModal from '@/components/QuoteModal'
import { FoodTruck } from '@/types'

export default function ProductDetailPage() {
  const params = useParams()
  const [truck, setTruck] = useState<FoodTruck | null>(null)
  const [loading, setLoading] = useState(true)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/food-trucks/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setTruck(data.data)
          setLoading(false)
        })
        .catch(console.error)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!truck) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Modèle non trouvé
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Le modèle que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link href="/marketplace" className="btn-primary">
              Retour aux modèles
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const images = truck.image_url ? [truck.image_url] : []
  const specifications = truck.specifications || {}

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Breadcrumb */}
      <section className="pt-20 pb-4 bg-light dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-sm"
          >
            <Link href="/marketplace" className="text-gray-500 hover:text-navy dark:hover:text-white transition-colors">
              Nos modèles
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-navy dark:text-white font-medium">{truck.title}</span>
          </motion.div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="relative h-96 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                {images[selectedImage] ? (
                  <Image
                    src={images[selectedImage]}
                    alt={truck.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Truck className="h-24 w-24 text-gray-400" />
                  </div>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-navy' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${truck.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">
                  {truck.title}
                </h1>
                <div className="flex items-center space-x-4">
                  <span className="text-emerald font-medium bg-emerald/10 px-3 py-1 rounded-full">
                    {truck.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">(4.9/5)</span>
                  </div>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {truck.description}
                </p>
              </div>

              {/* Specifications */}
              {Object.keys(specifications).length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-navy dark:text-white mb-4">
                    Spécifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald" />
                        <span className="text-gray-600 dark:text-gray-300">
                          <strong>{key}:</strong> {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-navy dark:text-white mb-4">
                  Caractéristiques
                </h3>
                <div className="space-y-2">
                  {[
                    'Construction sur mesure',
                    'Équipements professionnels',
                    'Design moderne et attractif',
                    'Conformité aux normes',
                    'Garantie constructeur',
                    'Service après-vente'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4 pt-6">
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="btn-primary w-full text-lg py-4"
                >
                  Demander un devis
                </button>
                <div className="flex space-x-4">
                  <button className="btn-outline flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </button>
                  <button className="btn-outline flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-light dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-navy dark:text-white mb-4">
              Autres Modèles Similaires
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Découvrez d'autres modèles qui pourraient vous intéresser
            </p>
          </motion.div>

          <div className="text-center">
            <Link href="/marketplace" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              Voir tous les modèles
              <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuoteModal
          truckId={truck.id}
          truckTitle={truck.title}
          onClose={() => setShowQuoteModal(false)}
        />
      )}
    </div>
  )
}
