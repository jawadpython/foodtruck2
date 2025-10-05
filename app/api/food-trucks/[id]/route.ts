import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/json-storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const product = await getProductById(id)

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Food truck not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: product
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
    const id = parseInt(params.id)
    const body = await request.json()
    const { title, description, category, image_url, specifications } = body

    const updatedProduct = await updateProduct(id, {
      title,
      description,
      category,
      image_url,
      specifications
    })

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: 'Food truck not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct
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
    const id = parseInt(params.id)
    const deleted = await deleteProduct(id)

    if (!deleted) {
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
