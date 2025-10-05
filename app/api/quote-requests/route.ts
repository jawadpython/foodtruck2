import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mockDatabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // For now, return empty data since we don't have quote requests in mock data
    return NextResponse.json({
      success: true,
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
        pages: 0
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

    const db = await getDatabase()
    const result = await db.query(
      'INSERT INTO quote_requests (name, email, phone, message, food_truck_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, message, food_truck_id]
    )

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating quote request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create quote request' },
      { status: 500 }
    )
  }
}
