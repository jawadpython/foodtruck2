import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mockDatabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const result = await db.query(
      'SELECT * FROM food_trucks WHERE id = $1',
      [params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Food truck not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching food truck:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch food truck' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, category, image_url, specifications } = body

    const db = await getDatabase()
    const result = await db.query(
      'UPDATE food_trucks SET title = $1, description = $2, category = $3, image_url = $4, specifications = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [title, description, category, image_url, specifications, params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Food truck not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating food truck:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update food truck' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDatabase()
    const result = await db.query(
      'DELETE FROM food_trucks WHERE id = $1 RETURNING *',
      [params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Food truck not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Food truck deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting food truck:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete food truck' },
      { status: 500 }
    )
  }
}
