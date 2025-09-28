import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const aiTools = await db.aITool.findMany({
      include: {
        promptVersions: {
          orderBy: { version: 'desc' },
          take: 5
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(aiTools)
  } catch (error) {
    console.error('Get AI tools error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, inputFields, prompt, llmSettings, testInterface } = await request.json()

    if (!name || !prompt) {
      return NextResponse.json(
        { error: 'Name and prompt are required' },
        { status: 400 }
      )
    }

    const aiTool = await db.aITool.create({
      data: {
        name,
        description,
        inputFields: inputFields || '[]',
        prompt,
        llmSettings: llmSettings || '{}',
        testInterface: testInterface || '{}'
      },
      include: {
        promptVersions: true
      }
    })

    // Create initial prompt version
    await db.promptVersion.create({
      data: {
        version: 1,
        prompt,
        toolId: aiTool.id,
        notes: 'Initial version'
      }
    })

    return NextResponse.json(aiTool)
  } catch (error) {
    console.error('Create AI tool error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}