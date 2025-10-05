'use client'

import { motion } from 'framer-motion'
import { Users, Award, Target, Heart, Truck, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous nous engageons à fournir des food trucks de la plus haute qualité, répondant aux normes les plus strictes.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Nous travaillons en étroite collaboration avec nos clients pour concrétiser leur vision unique.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Nous intégrons les dernières technologies et tendances pour créer des solutions modernes et efficaces.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Notre passion pour l\'artisanat et l\'innovation se reflète dans chaque projet que nous réalisons.'
    }
  ]

  const team = [
    {
      name: 'Ahmed Benali',
      role: 'Directeur Général',
      description: 'Plus de 10 ans d\'expérience dans l\'industrie alimentaire et la construction mobile.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Fatima Zahra',
      role: 'Chef de Projet',
      description: 'Spécialisée dans la conception et la gestion de projets de food trucks sur mesure.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Youssef Alami',
      role: 'Ingénieur en Chef',
      description: 'Expert en ingénierie et conformité technique pour les véhicules commerciaux.',
      image: '/api/placeholder/300/300'
    }
  ]

  const milestones = [
    {
      year: '2019',
      title: 'Fondation',
      description: 'Création de l\'entreprise avec une vision claire : démocratiser les food trucks au Maroc.'
    },
    {
      year: '2020',
      title: 'Premier Succès',
      description: 'Livraison de nos 10 premiers food trucks avec une satisfaction client de 100%.'
    },
    {
      year: '2021',
      title: 'Expansion',
      description: 'Ouverture de notre atelier principal et recrutement d\'une équipe d\'experts.'
    },
    {
      year: '2022',
      title: 'Innovation',
      description: 'Introduction de solutions écologiques et technologies de pointe dans nos constructions.'
    },
    {
      year: '2023',
      title: 'Reconnaissance',
      description: 'Certification qualité et partenariats avec les plus grandes marques du secteur.'
    },
    {
      year: '2024',
      title: 'Avenir',
      description: 'Lancement de notre plateforme digitale et expansion vers de nouveaux marchés.'
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
              À Propos de Nous
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Depuis 2019, nous sommes le leader marocain de la construction de food trucks sur mesure. 
              Notre mission est de transformer vos idées en réalité mobile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Tout a commencé avec une vision simple : permettre à chaque entrepreneur marocain 
                  de réaliser son rêve de posséder un food truck professionnel. Nous avons constaté 
                  que le marché manquait d'options de qualité et personnalisées.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'avoir construit plus de 50 food trucks uniques, 
                  chacun reflétant la personnalité et les besoins spécifiques de nos clients. 
                  Notre approche collaborative et notre attention aux détails nous distinguent 
                  dans l'industrie.
                </p>
                <p>
                  Nous croyons fermement que chaque food truck doit être une extension de votre 
                  marque et de votre passion. C'est pourquoi nous nous engageons à créer des 
                  solutions qui dépassent vos attentes.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <Truck className="h-32 w-32 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-light dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Les principes qui guident notre travail au quotidien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy text-white rounded-full mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-navy dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Des professionnels passionnés à votre service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-navy dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-emerald font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-light dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
              Notre Parcours
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Les étapes importantes de notre croissance
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-navy/20"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card p-6">
                      <div className="text-2xl font-bold text-navy dark:text-white mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-semibold text-navy dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-4 h-4 bg-navy rounded-full border-4 border-white dark:border-gray-800 z-10"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
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
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Prêt à Créer Votre Food Truck ?
            </h2>
            <p className="text-xl text-white/90">
              Rejoignez la famille de nos clients satisfaits et donnez vie à votre projet
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary text-lg px-8 py-4 bg-white text-navy hover:bg-gray-100">
                Nous contacter
              </a>
              <a href="/marketplace" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-navy">
                Voir nos modèles
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
