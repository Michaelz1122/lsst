import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { inputData } = await request.json()

    if (!inputData) {
      return NextResponse.json(
        { error: 'Input data is required' },
        { status: 400 }
      )
    }

    // Get AI tool
    const aiTool = await db.aITool.findUnique({
      where: { id: params.id }
    })

    if (!aiTool) {
      return NextResponse.json(
        { error: 'AI tool not found' },
        { status: 404 }
      )
    }

    if (!aiTool.isActive) {
      return NextResponse.json(
        { error: 'AI tool is not active' },
        { status: 400 }
      )
    }

    // Parse LLM settings
    const llmSettings = JSON.parse(aiTool.llmSettings || '{}')
    
    // Replace placeholders in prompt with input data
    let finalPrompt = aiTool.prompt
    Object.keys(inputData).forEach(key => {
      const placeholder = `{{${key}}}`
      finalPrompt = finalPrompt.replace(new RegExp(placeholder, 'g'), inputData[key])
    })

    try {
      // Initialize ZAI SDK
      const zai = await ZAI.create()
      
      // Make AI request
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: finalPrompt
          }
        ],
        ...(llmSettings.model && { model: llmSettings.model }),
        ...(llmSettings.temperature !== undefined && { temperature: llmSettings.temperature }),
        ...(llmSettings.max_tokens && { max_tokens: llmSettings.max_tokens })
      })

      const result = completion.choices[0]?.message?.content || 'No response generated'

      return NextResponse.json({
        result,
        promptUsed: finalPrompt,
        settings: llmSettings
      })

    } catch (aiError) {
      console.error('AI generation error:', aiError)
      return NextResponse.json(
        { error: 'Failed to generate AI response', details: aiError instanceof Error ? aiError.message : 'Unknown error' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Run AI tool error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}