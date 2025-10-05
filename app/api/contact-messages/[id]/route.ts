import { NextRequest, NextResponse } from 'next/server'
import { deleteContactMessage } from '@/lib/json-storage'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const deleted = await deleteContactMessage(id)

    if (!deleted) {
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
