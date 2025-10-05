import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mockDatabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // For now, return empty data since we don't have contact messages in mock data
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
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}
