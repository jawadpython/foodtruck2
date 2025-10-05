'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Votre message a été envoyé avec succès!')
        reset()
      } else {
        throw new Error('Erreur lors de l\'envoi')
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de votre message')
      console.error('Error submitting contact form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+212 5XX XXX XXX', '+212 6XX XXX XXX'],
      action: 'Appeler maintenant'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@foodtruck.ma', 'devis@foodtruck.ma'],
      action: 'Envoyer un email'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['123 Avenue Mohammed V', 'Casablanca 20000, Maroc'],
      action: 'Voir sur la carte'
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun - Ven: 8h00 - 18h00', 'Sam: 9h00 - 16h00'],
      action: 'Prendre RDV'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Contactez-Nous
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions et vous accompagner 
              dans la réalisation de votre projet de food truck.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-light dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-navy text-white rounded-full mb-4">
                  <info.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-navy dark:text-white mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-300 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                <button className="text-sky hover:text-navy dark:hover:text-white transition-colors text-sm font-medium">
                  {info.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="card p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-navy text-white rounded-full">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy dark:text-white">
                    Envoyez-nous un message
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        {...register('name', { required: 'Le nom est requis' })}
                        className="input-field"
                        placeholder="Votre nom complet"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'L\'email est requis',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email invalide'
                          }
                        })}
                        className="input-field"
                        placeholder="votre@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="input-field"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message', { required: 'Le message est requis' })}
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Décrivez votre projet, vos besoins, votre budget..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-navy dark:text-white mb-4">
                  Notre Localisation
                </h3>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Carte Google Maps
                    </p>
                    <p className="text-sm text-gray-400">
                      Casablanca, Maroc
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="card p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                    Chat WhatsApp
                  </h3>
                </div>
                <p className="text-green-700 dark:text-green-300 mb-4">
                  Pour une réponse rapide, contactez-nous directement sur WhatsApp
                </p>
                <a
                  href="https://wa.me/212XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary bg-green-500 hover:bg-green-600 w-full text-center block"
                >
                  Ouvrir WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-light dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Trouvez rapidement les réponses à vos questions
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Combien coûte un food truck sur mesure ?",
                answer: "Le prix varie selon la taille, les équipements et la personnalisation. Contactez-nous pour un devis gratuit adapté à vos besoins."
              },
              {
                question: "Quel est le délai de construction ?",
                answer: "En moyenne, la construction d'un food truck prend entre 4 à 8 semaines selon la complexité du projet."
              },
              {
                question: "Proposez-vous des garanties ?",
                answer: "Oui, nous offrons une garantie constructeur de 2 ans sur la structure et 1 an sur les équipements."
              },
              {
                question: "Pouvez-vous personnaliser complètement le design ?",
                answer: "Absolument ! Nous créons des designs uniques selon vos goûts, votre marque et vos besoins fonctionnels."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-navy dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
