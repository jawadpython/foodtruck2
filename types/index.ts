export interface FoodTruck {
  id: number
  title: string
  description: string
  category: string
  image_url?: string
  specifications?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface QuoteRequest {
  id: number
  name: string
  email: string
  phone: string
  message?: string
  food_truck_id?: number
  status: 'pending' | 'in_progress' | 'completed'
  created_at: string
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  created_at: string
}

export interface User {
  id: number
  email: string
  name: string
  role: string
  created_at: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
