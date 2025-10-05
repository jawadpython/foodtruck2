import { NextRequest, NextResponse } from 'next/server'
import { getContactMessages } from '@/lib/json-storage'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let messages = await getContactMessages()

    // Sort by created_at descending
    messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    // Apply pagination
    const total = messages.length
    const offset = (page - 1) * limit
    const paginatedMessages = limit > 0 ? messages.slice(offset, offset + limit) : messages

    return NextResponse.json({
      success: true,
      data: paginatedMessages,
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
