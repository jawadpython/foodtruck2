import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const query = `
      SELECT * FROM contact_messages 
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `
    
    const result = await pool.query(query, [limit, offset])
    
    // Get total count
    const countResult = await pool.query('SELECT COUNT(*) FROM contact_messages')
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
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}
