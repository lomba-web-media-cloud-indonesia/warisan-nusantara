import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log("Sending request to OpenRouter...");
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer sk-or-v1-28ddd957f57ee73c5fac0fc260b533b1c443b544bfa97dbf6691d03e12dce6ddsk-or-v1-28ddd957f57ee73c5fac0fc260b533b1c443b544bfa97dbf6691d03e12dce6dd`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter for free tier sometimes
          "X-Title": "Warisan Nusantara",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b:free",
          messages: [
            {
              role: "system",
              content:
                "Kamu adalah asisten virtual yang HANYA menjawab pertanyaan seputar tempat wisata, budaya, dan sejarah di Indonesia. Jika pengguna bertanya tentang hal lain (seperti coding, politik, matematika umum yang tidak relevan), tolah dengan sopan dan katakan bahwa kamu hanya bisa membahas warisan nusantara. Jawab dengan ringkas, ramah, dan informatif.",
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
