'use client'

import Link from 'next/link'
import { Truck, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-sky" />
              <span className="text-xl font-bold">Food Truck Maroc</span>
            </div>
            <p className="text-gray-300">
              Constructeur de food trucks personnalisés au Maroc. 
              Nous créons des solutions mobiles sur mesure pour votre entreprise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-300 hover:text-white transition-colors">
                  Nos Modèles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Construction sur mesure</li>
              <li className="text-gray-300">Design personnalisé</li>
              <li className="text-gray-300">Équipements professionnels</li>
              <li className="text-gray-300">Maintenance & SAV</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sky" />
                <span className="text-gray-300">+212 5XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sky" />
                <span className="text-gray-300">contact@foodtruck.ma</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-sky" />
                <span className="text-gray-300">Casablanca, Maroc</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Food Truck Maroc. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
