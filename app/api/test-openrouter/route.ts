import { NextResponse } from 'next/server';
import { OpenRouter } from "@openrouter/sdk";

export async function GET() {
    try {
        // Pastikan API key tersedia
        if (!process.env.OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: "OPENROUTER_API_KEY tidak ditemukan di file .env" },
                { status: 500 }
            );
        }

        const openrouter = new OpenRouter({
            apiKey: process.env.OPENROUTER_API_KEY
        });

        console.log("Testing OpenRouter connection...");

        // Test dengan request sederhana
        const completion = await openrouter.chat.send({
            model: "openai/gpt-oss-120b:free",
            messages: [
                {
                    role: "user",
                    content: "Say 'OpenRouter is working!' in Indonesian"
                }
            ],
        });

        const response = completion.choices[0]?.message?.content || "No response";

        return NextResponse.json({
            success: true,
            message: "OpenRouter berhasil terhubung!",
            response: response,
            model: completion.model,
            usage: completion.usage
        });

    } catch (error: any) {
        console.error("OpenRouter test error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Unknown error",
                details: error.toString()
            },
            { status: 500 }
        );
    }
}
