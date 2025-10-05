import { NextRequest, NextResponse } from 'next/server'
import { getProducts, createProduct } from '@/lib/json-storage'
import { FoodTruck } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let products = await getProducts()

    // Apply filters
    if (featured === 'true') {
      // For now, return all trucks as featured
      // In production, you could add a featured field to the product schema
    }

    if (category && category !== 'all') {
      products = products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      )
    }

    // Sort by created_at descending
    products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    
    return NextResponse.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Error fetching food trucks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch food trucks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category, image_url, specifications } = body

    if (!title || !description || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newProduct = await createProduct({
      title,
      description,
      category,
      image_url: image_url || '',
      specifications: specifications || {}
    })

    return NextResponse.json({
      success: true,
      data: newProduct
    })
  } catch (error) {
    console.error('Error creating food truck:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create food truck' },
      { status: 500 }
    )
  }
}
