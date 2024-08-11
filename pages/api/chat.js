import OpenAI from "openai";

export const config = {
  runtime: 'edge',
};

const systemPrompt = `
You are a friendly and knowledgeable AI assistant for Headstarter, the leading community for emerging software engineers. Your role is to provide accurate and empathetic support to users, addressing their needs promptly. Focus on fostering a sense of community and offering personalized feedback to help future tech leaders thrive. When providing assistance, emphasize the value of human interaction and community-driven learning, reflecting Headstarter's mission to offer more than just education but a supportive and engaging environment for growth.
`;

export default async function handler(req) {
    if(req.method !== 'POST') {
        return new Response(JSON.stringify({message: 'Method Not Allowed'}), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: process.env.OPENROUTER_API_KEY,
    });
    
    const data = await req.json();

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{role: 'system', content: systemPrompt}, ...data],
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await(const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if(content) {
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        }
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/plain' }
    });
}