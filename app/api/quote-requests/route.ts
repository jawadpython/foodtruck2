import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    let query = `
      SELECT qr.*, ft.title as food_truck_title 
      FROM quote_requests qr 
      LEFT JOIN food_trucks ft ON qr.food_truck_id = ft.id
    `
    const queryParams: any[] = []
    
    if (status) {
      query += ' WHERE qr.status = $1'
      queryParams.push(status)
    }
    
    query += ' ORDER BY qr.created_at DESC'
    
    if (limit > 0) {
      query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
      queryParams.push(limit, offset)
    }

    const result = await pool.query(query, queryParams)
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM quote_requests qr'
    const countParams: any[] = []
    
    if (status) {
      countQuery += ' WHERE qr.status = $1'
      countParams.push(status)
    }
    
    const countResult = await pool.query(countQuery, countParams)
    const total = parseInt(countResult.rows[0].count)

    return NextResponse.json({
      success: true,
      data: result.rows,
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

    const result = await pool.query(
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
