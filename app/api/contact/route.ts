import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mockDatabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const result = await db.query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, message]
    )

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create contact message' },
      { status: 500 }
    )
  }
}
