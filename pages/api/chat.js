import { NextResponse } from "next/server";
import OpenAI from "openai";
import * as dotenv from 'dotenv'

dotenv.config()

const systemPrompt = `
You are a friendly and knowledgeable AI assistant for Headstarter, the leading community for emerging software engineers. Your role is to provide accurate and empathetic support to users, addressing their needs promptly. Focus on fostering a sense of community and offering personalized feedback to help future tech leaders thrive. When providing assistance, emphasize the value of human interaction and community-driven learning, reflecting Headstarter's mission to offer more than just education but a supportive and engaging environment for growth.
`;

export default async function handler(req) {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method Not Allowed'});
    }

    console.log(`OPEN_AI_KEY: ${process.env.OPEN_AI_KEY}`)

    const openai = new OpenAI({apiKey: process.env.OPEN_AI_KEY})
    const data = req.body

    const completion = await openai.chat.completions.create({
        messages: [{role: 'system', content: systemPrompt}, ...data],
        model: 'gpt-3.5-turbo',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if(content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch(err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        } 
    })

    return new NextResponse(stream)
}