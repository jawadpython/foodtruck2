import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status || !['pending', 'in_progress', 'completed'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      'UPDATE quote_requests SET status = $1 WHERE id = $2 RETURNING *',
      [status, params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Quote request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error updating quote request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update quote request' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query(
      'DELETE FROM quote_requests WHERE id = $1 RETURNING *',
      [params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Quote request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting quote request:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete quote request' },
      { status: 500 }
    )
  }
}
