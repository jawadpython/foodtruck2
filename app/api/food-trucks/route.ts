import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mockDatabase'
import { FoodTruck } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let query = 'SELECT * FROM food_trucks'
    const params: any[] = []
    const conditions: string[] = []

    if (featured === 'true') {
      // For mock database, return all trucks as featured
      // In production, you would use: conditions.push('id IN (1, 2, 3, 4, 5, 6)')
    }

    if (category && category !== 'all') {
      conditions.push('LOWER(category) = LOWER($' + (params.length + 1) + ')')
      params.push(category)
    }

    if (search) {
      conditions.push('(LOWER(title) LIKE LOWER($' + (params.length + 1) + ') OR LOWER(description) LIKE LOWER($' + (params.length + 2) + '))')
      params.push(`%${search}%`, `%${search}%`)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY created_at DESC'

    const db = await getDatabase()
    const result = await db.query(query, params)
    
    return NextResponse.json({
      success: true,
      data: result.rows
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

    const db = await getDatabase()
    const result = await db.query(
      'INSERT INTO food_trucks (title, description, category, image_url, specifications) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, category, image_url, specifications]
    )

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating food truck:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create food truck' },
      { status: 500 }
    )
  }
}
