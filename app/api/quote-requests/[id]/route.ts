import { NextRequest, NextResponse } from 'next/server'
import { updateQuoteRequest, deleteQuoteRequest } from '@/lib/json-storage'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const { status } = body

    if (!status || !['pending', 'in_progress', 'completed'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      )
    }

    const updatedQuote = await updateQuoteRequest(id, { status })

    if (!updatedQuote) {
      return NextResponse.json(
        { success: false, error: 'Quote request not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedQuote
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
    const id = parseInt(params.id)
    const deleted = await deleteQuoteRequest(id)

    if (!deleted) {
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
