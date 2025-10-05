import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/database'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query(
      'DELETE FROM contact_messages WHERE id = $1 RETURNING *',
      [params.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Contact message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Contact message deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact message' },
      { status: 500 }
    )
  }
}
