import { NextResponse } from "next/server";
import { touristSpots } from "@/data/LocTourism";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Flatten tourist spots for system prompt
    const allowedTopics = Object.values(touristSpots)
      .flat()
      .map((s) => s.name)
      .join(", ");

    console.log("Sending request to OpenRouter...");
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter for free tier sometimes
          "X-Title": "Warisan Nusantara",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b:free",
          messages: [
            {
              role: "system",
              content: `Kamu adalah asisten virtual untuk aplikasi \"Warisan Nusantara\". Tugasmu adalah menjelaskan tentang tempat-tempat wisata berikut ini di Indonesia: ${allowedTopics}. \n\nInstruksi:\n1. Jawab pertanyaan pengguna dengan ramah, ringkas, dan informatif.\n2. HANYA bahas topik seputar pariwisata, budaya, dan sejarah Indonesia, terutama yang ada dalam daftar di atas.\n3. Jika pengguna bertanya hal di luar konteks (coding, math, politik, dll), tolak dengan sopan.\n4. Gunakan Bahasa Indonesia yang baik dan menarik.`,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    console.log("OpenRouter Response Status:", response.status);

    const responseText = await response.text();
    console.log("OpenRouter Raw Response:", responseText);

    if (!response.ok) {
      return NextResponse.json(
        { error: `OpenRouter API Error: ${response.status} - ${responseText}` },
        { status: response.status }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return NextResponse.json(
        { error: "Invalid JSON response from OpenRouter" },
        { status: 500 }
      );
    }

    // Check if OpenRouter returned an error object inside 200 OK (unlikely but possible)
    if (data.error) {
      console.error("OpenRouter API Error Object:", data.error);
      return NextResponse.json(
        { error: data.error.message || "Error from AI provider" },
        { status: 500 }
      );
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Maaf, saya tidak dapat memproses permintaan saat ini.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
