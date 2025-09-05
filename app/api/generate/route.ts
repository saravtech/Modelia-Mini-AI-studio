import { NextResponse } from 'next/server'

function randomDelay(minMs = 1000, maxMs = 2000) {
  return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body || typeof body.prompt !== 'string' || typeof body.style !== 'string' || typeof body.imageDataUrl !== 'string') {
    return NextResponse.json({ message: 'Bad request' }, { status: 400 })
  }

  await new Promise<void>((resolve) => setTimeout(resolve, randomDelay()))

  if (Math.random() < 0.2) {
    return NextResponse.json({ message: 'Model overloaded' }, { status: 503 })
  }

  return NextResponse.json({
    id: crypto.randomUUID(),
    imageUrl: body.imageDataUrl,
    prompt: body.prompt,
    style: body.style,
    createdAt: new Date().toISOString(),
  })
}
