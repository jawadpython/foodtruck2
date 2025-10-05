import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('admin-session')
    
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const sessionData = JSON.parse(sessionCookie.value)
    
    return NextResponse.json({
      success: true,
      user: sessionData
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { success: false, error: 'Invalid session' },
      { status: 401 }
    )
  }
}
