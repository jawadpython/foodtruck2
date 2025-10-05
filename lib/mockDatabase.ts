// Mock database for development when PostgreSQL is not available
import bcrypt from 'bcryptjs'

// Mock data storage
let mockData = {
  users: [
    {
      id: 1,
      email: 'admin@foodtruck.ma',
      password: '$2a$10$oR5M8m/rMN531vPNZe8iu.K1S7XmbqdqX.rzHUYomcbHGFcyL37Ei', // admin123
      name: 'Admin',
      role: 'admin',
      created_at: new Date().toISOString()
    }
  ],
  food_trucks: [
    {
      id: 1,
      title: 'Food Truck Pizza Premium',
      description: 'Food truck spécialisé dans la pizza avec four à bois intégré. Équipé d\'une cuisine professionnelle et d\'un espace de service optimisé.',
      category: 'Pizza',
      image_url: '/uploads/pizza-truck.jpg',
      specifications: {
        dimensions: '6m x 2.5m',
        capacity: '50 pizzas/heure',
        equipment: ['Four à bois', 'Réfrigérateur', 'Plan de travail']
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Burger Mobile Deluxe',
      description: 'Food truck moderne pour burgers gourmets avec gril professionnel et système de ventilation intégré.',
      category: 'Burger',
      image_url: '/uploads/burger-truck.jpg',
      specifications: {
        dimensions: '5.5m x 2.3m',
        capacity: '80 burgers/heure',
        equipment: ['Gril professionnel', 'Friteuse', 'Plan de préparation']
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Tacos Express',
      description: 'Food truck coloré pour tacos et burritos avec cuisine ouverte et service rapide.',
      category: 'Tacos',
      image_url: '/uploads/tacos-truck.jpg',
      specifications: {
        dimensions: '5m x 2.2m',
        capacity: '60 tacos/heure',
        equipment: ['Plancha', 'Réfrigérateur', 'Évier']
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      title: 'Sandwich Corner',
      description: 'Food truck polyvalent pour sandwiches, paninis et salades avec espace de préparation spacieux.',
      category: 'Sandwich',
      image_url: '/uploads/sandwich-truck.jpg',
      specifications: {
        dimensions: '5.8m x 2.4m',
        capacity: '70 sandwiches/heure',
        equipment: ['Grille panini', 'Réfrigérateur', 'Plan de travail']
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 5,
      title: 'Dessert Paradise',
      description: 'Food truck spécialisé dans les desserts avec vitrine réfrigérée et espace de création.',
      category: 'Dessert',
      image_url: '/uploads/dessert-truck.jpg',
      specifications: {
        dimensions: '4.5m x 2.1m',
        capacity: '40 desserts/heure',
        equipment: ['Vitrine réfrigérée', 'Mixer', 'Plan de décoration']
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 6,
      title: 'Boissons & Smoothies',
      description: 'Food truck pour boissons fraîches, smoothies et jus de fruits avec blender professionnel.',
      category: 'Boissons',
      image_url: '/uploads/drinks-truck.jpg',
      specifications: {
        dimensions: '4m x 2m',
        capacity: '100 boissons/heure',
        equipment: ['Blender professionnel', 'Réfrigérateur', 'Distributeur de glace']
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  quote_requests: [],
  contact_messages: []
}

// Mock database functions
export const mockDb = {
  async query(text: string, params: any[] = []) {
    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 10))
    
    const query = text.toLowerCase().trim()
    
    // Debug logging for featured trucks
    if (query.includes('featured') || query.includes('id in')) {
      console.log('Mock DB Query:', text)
      console.log('Mock DB Params:', params)
    }
    
    // Handle different query types
    if (query.includes('select')) {
      return this.handleSelect(text, params)
    } else if (query.includes('insert')) {
      return this.handleInsert(text, params)
    } else if (query.includes('update')) {
      return this.handleUpdate(text, params)
    } else if (query.includes('delete')) {
      return this.handleDelete(text, params)
    }
    
    return { rows: [], rowCount: 0 }
  },

  handleSelect(text: string, params: any[]) {
    const query = text.toLowerCase()
    
    // Users queries
    if (query.includes('from users')) {
      if (query.includes('where email')) {
        const email = params[0]
        const user = mockData.users.find(u => u.email === email)
        return { rows: user ? [user] : [], rowCount: user ? 1 : 0 }
      }
      return { rows: mockData.users, rowCount: mockData.users.length }
    }
    
    // Food trucks queries
    if (query.includes('from food_trucks')) {
      if (query.includes('where id')) {
        const id = params[0]
        const truck = mockData.food_trucks.find(t => t.id === id)
        return { rows: truck ? [truck] : [], rowCount: truck ? 1 : 0 }
      }
      
      // Handle featured trucks query (id IN (1, 2, 3, 4, 5, 6))
      if (query.includes('id in (1, 2, 3, 4, 5, 6)') || query.includes('id IN (1, 2, 3, 4, 5, 6)')) {
        const featuredTrucks = mockData.food_trucks.filter(t => [1, 2, 3, 4, 5, 6].includes(t.id))
        return { rows: featuredTrucks, rowCount: featuredTrucks.length }
      }
      
      return { rows: mockData.food_trucks, rowCount: mockData.food_trucks.length }
    }
    
    // Quote requests queries
    if (query.includes('from quote_requests')) {
      if (query.includes('left join food_trucks')) {
        // Handle JOIN query for quote requests with food truck titles
        let quotesWithTrucks = mockData.quote_requests.map(quote => {
          const truck = mockData.food_trucks.find(t => t.id === quote.food_truck_id)
          return {
            ...quote,
            food_truck_title: truck ? truck.title : null
          }
        })
        
        // Apply LIMIT and OFFSET if present
        if (query.includes('limit') && query.includes('offset')) {
          const limit = params[params.length - 2] || 10
          const offset = params[params.length - 1] || 0
          quotesWithTrucks = quotesWithTrucks.slice(offset, offset + limit)
        }
        
        return { rows: quotesWithTrucks, rowCount: quotesWithTrucks.length }
      }
      return { rows: mockData.quote_requests, rowCount: mockData.quote_requests.length }
    }
    
    // Contact messages queries
    if (query.includes('from contact_messages')) {
      return { rows: mockData.contact_messages, rowCount: mockData.contact_messages.length }
    }
    
    // Count queries
    if (query.includes('count(*)')) {
      if (query.includes('from quote_requests')) {
        // Handle filtered count for quote requests
        let count = mockData.quote_requests.length
        if (params.length > 0) {
          // If there are parameters, it might be a filtered count
          // For now, return the total count
          count = mockData.quote_requests.length
        }
        return { rows: [{ count: count.toString() }], rowCount: 1 }
      }
      if (query.includes('from contact_messages')) {
        return { rows: [{ count: mockData.contact_messages.length.toString() }], rowCount: 1 }
      }
      if (query.includes('from food_trucks')) {
        return { rows: [{ count: mockData.food_trucks.length.toString() }], rowCount: 1 }
      }
      if (query.includes('from users')) {
        return { rows: [{ count: mockData.users.length.toString() }], rowCount: 1 }
      }
    }
    
    return { rows: [], rowCount: 0 }
  },

  handleInsert(text: string, params: any[]) {
    const query = text.toLowerCase()
    
    if (query.includes('into food_trucks')) {
      const newTruck = {
        id: mockData.food_trucks.length + 1,
        title: params[0],
        description: params[1],
        category: params[2],
        image_url: params[3],
        specifications: params[4],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockData.food_trucks.push(newTruck)
      return { rows: [newTruck], rowCount: 1 }
    }
    
    if (query.includes('into quote_requests')) {
      const newQuote = {
        id: mockData.quote_requests.length + 1,
        name: params[0],
        email: params[1],
        phone: params[2],
        message: params[3],
        food_truck_id: params[4],
        status: 'pending',
        created_at: new Date().toISOString()
      }
      mockData.quote_requests.push(newQuote)
      return { rows: [newQuote], rowCount: 1 }
    }
    
    if (query.includes('into contact_messages')) {
      const newMessage = {
        id: mockData.contact_messages.length + 1,
        name: params[0],
        email: params[1],
        phone: params[2],
        message: params[3],
        created_at: new Date().toISOString()
      }
      mockData.contact_messages.push(newMessage)
      return { rows: [newMessage], rowCount: 1 }
    }
    
    return { rows: [], rowCount: 0 }
  },

  handleUpdate(text: string, params: any[]) {
    const query = text.toLowerCase()
    
    if (query.includes('update food_trucks')) {
      const id = parseInt(params[5]) // Last parameter is the ID
      const truckIndex = mockData.food_trucks.findIndex(t => t.id === id)
      
      if (truckIndex !== -1) {
        mockData.food_trucks[truckIndex] = {
          ...mockData.food_trucks[truckIndex],
          title: params[0],
          description: params[1],
          category: params[2],
          image_url: params[3],
          specifications: params[4],
          updated_at: new Date().toISOString()
        }
        return { rows: [mockData.food_trucks[truckIndex]], rowCount: 1 }
      }
      return { rows: [], rowCount: 0 }
    }
    
    return { rows: [], rowCount: 1 }
  },

  handleDelete(text: string, params: any[]) {
    const query = text.toLowerCase()
    
    if (query.includes('delete from food_trucks')) {
      const id = parseInt(params[0])
      const truckIndex = mockData.food_trucks.findIndex(t => t.id === id)
      
      if (truckIndex !== -1) {
        const deletedTruck = mockData.food_trucks[truckIndex]
        mockData.food_trucks.splice(truckIndex, 1)
        return { rows: [deletedTruck], rowCount: 1 }
      }
      return { rows: [], rowCount: 0 }
    }
    
    return { rows: [], rowCount: 1 }
  }
}

// Check if PostgreSQL is available
export async function isPostgreSQLAvailable(): Promise<boolean> {
  try {
    const { Pool } = await import('pg')
    const testPool = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'foodtruck_marketplace',
      password: process.env.DB_PASSWORD || 'password',
      port: parseInt(process.env.DB_PORT || '5432'),
    })
    
    await testPool.query('SELECT 1')
    await testPool.end()
    return true
  } catch (error) {
    return false
  }
}

// Get the appropriate database instance
export async function getDatabase() {
  const isAvailable = await isPostgreSQLAvailable()
  
  if (isAvailable) {
    const { default: pool } = await import('./database')
    return pool
  } else {
    console.log('PostgreSQL not available, using mock database')
    return mockDb
  }
}
