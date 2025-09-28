import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const aiTool = await db.aITool.findUnique({
      where: { id: params.id },
      include: {
        promptVersions: {
          orderBy: { version: 'desc' }
        }
      }
    })

    if (!aiTool) {
      return NextResponse.json(
        { error: 'AI tool not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(aiTool)
  } catch (error) {
    console.error('Get AI tool error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { name, description, inputFields, prompt, llmSettings, testInterface, isActive } = await request.json()

    const existingTool = await db.aITool.findUnique({
      where: { id: params.id }
    })

    if (!existingTool) {
      return NextResponse.json(
        { error: 'AI tool not found' },
        { status: 404 }
      )
    }

    // Check if prompt changed, if so create new version
    let newVersion = null
    if (prompt && prompt !== existingTool.prompt) {
      const latestVersion = await db.promptVersion.findFirst({
        where: { toolId: params.id },
        orderBy: { version: 'desc' }
      })

      const newVersionNumber = latestVersion ? latestVersion.version + 1 : 1

      newVersion = await db.promptVersion.create({
        data: {
          version: newVersionNumber,
          prompt,
          toolId: params.id,
          notes: 'Updated prompt'
        }
      })
    }

    const aiTool = await db.aITool.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(inputFields !== undefined && { inputFields }),
        ...(prompt && { prompt }),
        ...(llmSettings !== undefined && { llmSettings }),
        ...(testInterface !== undefined && { testInterface }),
        ...(isActive !== undefined && { isActive })
      },
      include: {
        promptVersions: {
          orderBy: { version: 'desc' }
        }
      }
    })

    return NextResponse.json({ aiTool, newVersion })
  } catch (error) {
    console.error('Update AI tool error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    await db.aITool.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'AI tool deleted successfully' })
  } catch (error) {
    console.error('Delete AI tool error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}