'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Image as ImageIcon, Save, Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FoodTruck } from '@/types'

interface TruckModalProps {
  truck?: FoodTruck | null
  onClose: () => void
  onSuccess: () => void
}

interface TruckFormData {
  title: string
  description: string
  category: string
  specifications: string
}

export default function TruckModal({ truck, onClose, onSuccess }: TruckModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadingImage, setUploadingImage] = useState(false)

  const isEditing = !!truck

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<TruckFormData>()

  useEffect(() => {
    if (truck) {
      setValue('title', truck.title)
      setValue('description', truck.description)
      setValue('category', truck.category)
      setValue('specifications', JSON.stringify(truck.specifications || {}, null, 2))
      if (truck.image_url) {
        setImagePreview(truck.image_url)
      }
    }
  }, [truck, setValue])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Image upload failed')
    }

    const data = await response.json()
    return data.url
  }

  const onSubmit = async (data: TruckFormData) => {
    setIsSubmitting(true)

    try {
      let imageUrl = truck?.image_url || ''

      // Upload new image if provided
      if (imageFile) {
        setUploadingImage(true)
        imageUrl = await uploadImage(imageFile)
        setUploadingImage(false)
      }

      // Parse specifications
      let specifications = {}
      try {
        specifications = JSON.parse(data.specifications)
      } catch (e) {
        // If JSON is invalid, store as empty object
        specifications = {}
      }

      const payload = {
        title: data.title,
        description: data.description,
        category: data.category,
        image_url: imageUrl,
        specifications
      }

      const url = isEditing ? `/api/food-trucks/${truck.id}` : '/api/food-trucks'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        toast.success(isEditing ? 'Food truck modifié avec succès!' : 'Food truck créé avec succès!')
        onSuccess()
      } else {
        throw new Error('Failed to save truck')
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde')
      console.error('Save error:', error)
    } finally {
      setIsSubmitting(false)
      setUploadingImage(false)
    }
  }

  const categories = [
    'Vintage Food-Trucks',
    'Food Trucks',
    'Kiosque',
    'Conteneur',
    'Remorque',
    'Modulaire',
    'Mobile chef',
    'Charrette'
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-navy dark:text-white">
              {isEditing ? 'Modifier le Food Truck' : 'Ajouter un Food Truck'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image
              </label>
              <div className="space-y-4">
                {imagePreview && (
                  <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadingImage ? (
                        <Loader className="w-8 h-8 mb-4 text-gray-500 animate-spin" />
                      ) : (
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      )}
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG ou WEBP (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Titre *
              </label>
              <input
                type="text"
                {...register('title', { required: 'Le titre est requis' })}
                className="input-field"
                placeholder="Nom du food truck"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Catégorie *
              </label>
              <select
                {...register('category', { required: 'La catégorie est requise' })}
                className="input-field"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                {...register('description', { required: 'La description est requise' })}
                rows={4}
                className="input-field resize-none"
                placeholder="Décrivez le food truck, ses caractéristiques, équipements..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Spécifications (JSON)
              </label>
              <textarea
                {...register('specifications')}
                rows={6}
                className="input-field resize-none font-mono text-sm"
                placeholder='{"Dimensions": "3m x 2m", "Capacité": "50 personnes", "Équipements": ["Friteuse", "Grill"]}'
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Format JSON pour les spécifications techniques
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting || uploadingImage}
                className="btn-primary flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Modifier' : 'Créer'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
