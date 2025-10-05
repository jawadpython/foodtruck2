'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Truck, Users, Award, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { FoodTruck } from '@/types'

export default function HomePage() {
  const [featuredTrucks, setFeaturedTrucks] = useState<FoodTruck[]>([])

  useEffect(() => {
    // Fetch featured trucks
    fetch('/api/food-trucks?featured=true')
      .then(res => res.json())
      .then(data => setFeaturedTrucks(data.data || []))
      .catch(console.error)
  }, [])

  const testimonials = [
    {
      name: "Ahmed Benali",
      role: "Propriétaire, Pizza Mobile",
      content: "Excellent service et qualité irréprochable. Notre food truck fonctionne parfaitement depuis 2 ans.",
      rating: 5
    },
    {
      name: "Fatima Zahra",
      role: "Chef, Tacos Express",
      content: "Équipe professionnelle et à l'écoute. Ils ont su concrétiser notre vision parfaitement.",
      rating: 5
    },
    {
      name: "Youssef Alami",
      role: "Directeur, Burger King Mobile",
      content: "Construction rapide et équipements de qualité. Je recommande vivement leurs services.",
      rating: 5
    }
  ]

  const stats = [
    { icon: Truck, value: "50+", label: "Food Trucks Construits" },
    { icon: Users, value: "100+", label: "Clients Satisfaits" },
    { icon: Award, value: "5+", label: "Années d'Expérience" },
    { icon: CheckCircle, value: "100%", label: "Garantie Qualité" }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Constructeur de
              <span className="block text-sky">Food Trucks</span>
              <span className="block">au Maroc</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Créez votre food truck sur mesure avec nos solutions professionnelles. 
              Design moderne, équipements de qualité et service personnalisé.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
                Découvrir nos modèles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/contact" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-navy">
                Demander un devis
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-light dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy text-white rounded-full mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-navy dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trucks Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Nos Modèles Phares
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez notre sélection de food trucks les plus populaires, 
              conçus pour répondre à tous vos besoins.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrucks.slice(0, 6).map((truck, index) => (
              <motion.div
                key={truck.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 group cursor-pointer"
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
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald font-medium">
                    {truck.category}
                  </span>
                  <Link
                    href={`/marketplace/${truck.id}`}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    Voir détails
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/marketplace" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              Voir tous les modèles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-light dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Ce Que Disent Nos Clients
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              La satisfaction de nos clients est notre priorité
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <div className="font-semibold text-navy dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Prêt à Créer Votre Food Truck ?
            </h2>
            <p className="text-xl text-white/90">
              Contactez-nous dès aujourd'hui pour discuter de votre projet 
              et obtenir un devis personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4 bg-white text-navy hover:bg-gray-100">
                Demander un devis
              </Link>
              <Link href="/marketplace" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-navy">
                Voir nos modèles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
