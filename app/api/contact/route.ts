import { NextRequest, NextResponse } from 'next/server'
import { createContactMessage } from '@/lib/json-storage'

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

    const newMessage = await createContactMessage({
      name,
      email,
      phone: phone || '',
      message
    })

    return NextResponse.json({
      success: true,
      data: newMessage
    })
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create contact message' },
      { status: 500 }
    )
  }
}
