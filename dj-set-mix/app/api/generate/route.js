import { NextResponse } from 'next/server'
import OpenAI from 'openai'




// System prompt to instruct the AI how to respond based on the audio features
const systemPrompt = `
You are an AI DJ expert. Given the audio metrics of two tracks (such as tempo, key, energy, and mode),
provide suggestions on how to transition between the two tracks in a smooth DJ mix. Consider the energy,
matching key, and tempo to make a recommendation.
`

export async function POST(req) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,  // Make sure your API key is set in your environment variables
    });
    
    // Parse the request body to get the audio features of the two songs
    const { track1Features, track2Features } = await req.json()

    // Create a prompt that describes the two songs based on the metrics provided
    const userPrompt = `
    Track 1 has the following metrics:
    - Tempo: ${track1Features.tempo}
    - Key: ${track1Features.key}
    - Energy: ${track1Features.energy}
    - Danceability: ${track1Features.danceability}
    - Mode: ${track1Features.mode}
    - Time Signature: ${track1Features.time_signature}

    Track 2 has the following metrics:
    - Tempo: ${track2Features.tempo}
    - Key: ${track2Features.key}
    - Energy: ${track2Features.energy}
    - Danceability: ${track2Features.danceability}
    - Mode: ${track2Features.mode}
    - Time Signature: ${track2Features.time_signature}

    Based on the metrics of these two tracks, suggest the best way to transition between them in a DJ mix. Take into account the differences in tempo, key, and energy, and recommend the ideal technique for a smooth transition.
    `

    try {
        // Use the OpenAI API to generate a suggestion for the DJ transition
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',  // You can use gpt-3.5-turbo if preferred
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ]
        })

        // Extract the response from OpenAI
        const aiResponse = completion.choices[0].message.content

        // Return the response from OpenAI to the client
        return NextResponse.json({ suggestion: aiResponse })

    } catch (error) {
        console.error('Error in OpenAI request:', error)
        return NextResponse.json({ error: 'Failed to generate suggestion.' }, { status: 500 })
    }
}
