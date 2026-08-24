import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a production environment, you would generate a secure short-lived token here
    // using your GEMINI_API_KEY from the server environment.
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    return NextResponse.json({ token: apiKey });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
