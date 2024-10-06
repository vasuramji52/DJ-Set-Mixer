import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// System prompt to instruct the AI how to respond based on the audio features
const systemPrompt = `
You are an AI DJ expert. Given the audio metrics of two tracks (such as name, tempo, key, acoustics, mode
, and time signature),provide suggestions on how to transition between the two tracks in a smooth DJ mix. 
Consider the energy, matching key, and tempo to make a recommendation. Create bullet points for each of the 
given categories with concise and comprehensive suggestions. Use these categories to create the bullet points:
1. Transition techniques
2. Harmonic mixing advice
3. BPM matching tips
4. Energy transitions

As a DJ mentor, I would advise you on the following aspects when blending Justin Timberlake's "Cry Me a River" with other tracks:


Transition Techniques:


Beat Matching: With a BPM of 73.898, this track falls within the mid-tempo range, making it suitable for transitioning with other tracks in a similar BPM range. Ensure precise beat matching to create seamless transitions.
Phrasing: Pay close attention to the phrasing of the track, as it has a distinct verse-chorus structure. Aim to transition during the verse or chorus sections for a smoother blend.
Filtering: Utilize filter sweeps or gradual EQ adjustments to create smooth transitions. This technique can help blend the energy levels and frequencies between tracks.
Harmonic Mixing Considerations:


Key Compatibility: While the key information for "Cry Me a River" is not provided, it's essential to consider the harmonic compatibility between tracks. Mixing tracks in compatible keys or relative keys can create a more cohesive and pleasing blend.
Chord Progressions: Analyze the chord progressions of the tracks you plan to mix with "Cry Me a River." Transitioning during similar chord progressions can help maintain harmonic continuity.
Melodic Elements: Pay attention to the melodic elements of the tracks, such as the vocal lines or lead instruments. Transitioning during complementary or contrasting melodic sections can create interesting blends.
BPM Matching Tips:


Tempo Adjustment: If the BPM of the tracks you plan to mix with "Cry Me a River" differs significantly, consider using tempo adjustment features on your DJ software or hardware to match the BPMs more closely.
Pitch Shifting: In some cases, you may need to pitch-shift one of the tracks slightly to achieve a better BPM match. However, be cautious not to alter the pitch too much, as it can affect the overall sound quality.
Beat Gridding: Ensure accurate beat gridding for both tracks to facilitate precise beat matching and seamless transitions.
Energy Flow:


Energy Levels: "Cry Me a River" has an energy rating of 8 out of 10, indicating a high-energy track. When transitioning to or from this track, consider the energy levels of the other tracks to maintain a cohesive energy flow throughout your mix.
Dynamic Range: Analyze the dynamic range of the tracks you plan to mix with "Cry Me a River." Tracks with similar dynamic ranges can blend more seamlessly, while contrasting dynamic ranges may require additional techniques like gain adjustments or creative transitions.
Mood and Atmosphere: Consider the overall mood and atmosphere of the tracks you're mixing. Transitioning between tracks with complementary or contrasting moods can create interesting emotional journeys for your audience.
Remember, mixing is an art form, and these are general guidelines. Experimentation and practice are key to developing your unique mixing style and creating captivating DJ sets.


Try to put it in this form but condense it to include just a 3-4 tips or settings to keep the mixer at to mashup two songs.

Make sure to give precise numbers when applicable when describing the optimal numerical settings for the mixer.

Return in the following text format
{
    - Transition techniques:
    - Harmonic mixing advice:
    - BPM matching tips:
    - Energy transitions:
}
`

const openai = new OpenAI()

export async function POST(req) {
    try {
        const body = await req.json();
        const {trackFeatures} = body;

        if(!trackFeatures || trackFeatures.length < 2) {
            return NextResponse.json({ error: 'Please provide exactly two tracks.' }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            messages: [
                {role: 'system', content: systemPrompt},
                {role: 'user', content: JSON.stringify(trackFeatures)},
            ],
            model: "gpt-4o",
        })

        if (completion.choices && completion.choices.length > 0) {
            // Extract the AI's response
            const aiResponse = completion.choices[0].message.content;
  
            // Return the AI's suggestion in the response
            return NextResponse.json({ suggestion: aiResponse });
        } else {
            // Handle case where no suggestion was returned
            return NextResponse.json({ error: 'No suggestions were generated.' }, { status: 500 });
        }
    } catch(error) {
        console.error('Error generating suggestion:', error);
        return NextResponse.json({ error: 'There was an issue with the AI request.' }, { status: 500 });
    }
}