import { promises as fs } from 'fs'
import { join } from 'path'
import { FoodTruck, QuoteRequest, ContactMessage, User } from '@/types'

const DATA_DIR = join(process.cwd(), 'data')
const PRODUCTS_FILE = join(DATA_DIR, 'products.json')
const QUOTES_FILE = join(DATA_DIR, 'quotes.json')
const MESSAGES_FILE = join(DATA_DIR, 'messages.json')
const USERS_FILE = join(DATA_DIR, 'users.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Initialize JSON files with default data
async function initializeFiles() {
  await ensureDataDir()
  
  // Initialize products.json
  try {
    await fs.access(PRODUCTS_FILE)
  } catch {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify([], null, 2))
  }
  
  // Initialize quotes.json
  try {
    await fs.access(QUOTES_FILE)
  } catch {
    await fs.writeFile(QUOTES_FILE, JSON.stringify([], null, 2))
  }
  
  // Initialize messages.json
  try {
    await fs.access(MESSAGES_FILE)
  } catch {
    await fs.writeFile(MESSAGES_FILE, JSON.stringify([], null, 2))
  }
  
  // Initialize users.json with default admin user
  try {
    await fs.access(USERS_FILE)
  } catch {
    const bcrypt = require('bcryptjs')
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const defaultUsers: User[] = [{
      id: 1,
      email: 'admin@foodtruck.ma',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      created_at: new Date().toISOString()
    }]
    await fs.writeFile(USERS_FILE, JSON.stringify(defaultUsers, null, 2))
  }
}

// Products CRUD operations
export async function getProducts(): Promise<FoodTruck[]> {
  await initializeFiles()
  const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
  return JSON.parse(data)
}

export async function getProductById(id: number): Promise<FoodTruck | null> {
  const products = await getProducts()
  return products.find(p => p.id === id) || null
}

export async function createProduct(product: Omit<FoodTruck, 'id' | 'created_at' | 'updated_at'>): Promise<FoodTruck> {
  const products = await getProducts()
  const newProduct: FoodTruck = {
    ...product,
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  products.push(newProduct)
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
  return newProduct
}

export async function updateProduct(id: number, updates: Partial<Omit<FoodTruck, 'id' | 'created_at'>>): Promise<FoodTruck | null> {
  const products = await getProducts()
  const index = products.findIndex(p => p.id === id)
  
  if (index === -1) return null
  
  products[index] = {
    ...products[index],
    ...updates,
    updated_at: new Date().toISOString()
  }
  
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
  return products[index]
}

export async function deleteProduct(id: number): Promise<boolean> {
  const products = await getProducts()
  const index = products.findIndex(p => p.id === id)
  
  if (index === -1) return false
  
  products.splice(index, 1)
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
  return true
}

// Quote Requests CRUD operations
export async function getQuoteRequests(): Promise<QuoteRequest[]> {
  await initializeFiles()
  const data = await fs.readFile(QUOTES_FILE, 'utf-8')
  return JSON.parse(data)
}

export async function getQuoteRequestById(id: number): Promise<QuoteRequest | null> {
  const quotes = await getQuoteRequests()
  return quotes.find(q => q.id === id) || null
}

export async function createQuoteRequest(quote: Omit<QuoteRequest, 'id' | 'created_at'>): Promise<QuoteRequest> {
  const quotes = await getQuoteRequests()
  const newQuote: QuoteRequest = {
    ...quote,
    id: quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1,
    created_at: new Date().toISOString()
  }
  
  quotes.push(newQuote)
  await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2))
  return newQuote
}

export async function updateQuoteRequest(id: number, updates: Partial<Omit<QuoteRequest, 'id' | 'created_at'>>): Promise<QuoteRequest | null> {
  const quotes = await getQuoteRequests()
  const index = quotes.findIndex(q => q.id === id)
  
  if (index === -1) return null
  
  quotes[index] = { ...quotes[index], ...updates }
  await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2))
  return quotes[index]
}

export async function deleteQuoteRequest(id: number): Promise<boolean> {
  const quotes = await getQuoteRequests()
  const index = quotes.findIndex(q => q.id === id)
  
  if (index === -1) return false
  
  quotes.splice(index, 1)
  await fs.writeFile(QUOTES_FILE, JSON.stringify(quotes, null, 2))
  return true
}

// Contact Messages CRUD operations
export async function getContactMessages(): Promise<ContactMessage[]> {
  await initializeFiles()
  const data = await fs.readFile(MESSAGES_FILE, 'utf-8')
  return JSON.parse(data)
}

export async function getContactMessageById(id: number): Promise<ContactMessage | null> {
  const messages = await getContactMessages()
  return messages.find(m => m.id === id) || null
}

export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at'>): Promise<ContactMessage> {
  const messages = await getContactMessages()
  const newMessage: ContactMessage = {
    ...message,
    id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
    created_at: new Date().toISOString()
  }
  
  messages.push(newMessage)
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2))
  return newMessage
}

export async function deleteContactMessage(id: number): Promise<boolean> {
  const messages = await getContactMessages()
  const index = messages.findIndex(m => m.id === id)
  
  if (index === -1) return false
  
  messages.splice(index, 1)
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2))
  return true
}

// Users operations
export async function getUsers(): Promise<User[]> {
  await initializeFiles()
  const data = await fs.readFile(USERS_FILE, 'utf-8')
  return JSON.parse(data)
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers()
  return users.find(u => u.email === email) || null
}

// Initialize the storage system
export async function initStorage() {
  await initializeFiles()
  console.log('JSON storage initialized successfully')
}
