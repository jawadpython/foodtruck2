import { NextRequest, NextResponse } from 'next/server'
import { getQuoteRequests, createQuoteRequest, getProducts } from '@/lib/json-storage'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let quotes = await getQuoteRequests()
    const products = await getProducts()

    // Add food truck titles to quotes
    quotes = quotes.map(quote => {
      const product = products.find(p => p.id === quote.food_truck_id)
      return {
        ...quote,
        food_truck_title: product?.title || 'Unknown'
      }
    })

    // Apply status filter
    if (status) {
      quotes = quotes.filter(q => q.status === status)
    }

    // Sort by created_at descending
    quotes.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    // Apply pagination
    const total = quotes.length
    const offset = (page - 1) * limit
    const paginatedQuotes = limit > 0 ? quotes.slice(offset, offset + limit) : quotes

    return NextResponse.json({
      success: true,
      data: paginatedQuotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching quote requests:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quote requests' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, food_truck_id } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newQuote = await createQuoteRequest({
      name,
      email,
      phone,
      message: message || '',
      food_truck_id: food_truck_id ? parseInt(food_truck_id) : undefined,
      status: 'pending'
    })

    return NextResponse.json({
      success: true,
      data: newQuote
    })
  } catch (error) {
    console.error('Error creating quote request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create quote request' },
      { status: 500 }
    )
  }
}
