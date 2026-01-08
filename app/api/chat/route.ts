import { NextResponse } from "next/server";
import { touristSpots } from "../../../data/LocTourism";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const allowedTopics = Object.values(touristSpots ?? {})
      .flat()
      .map((s) => s?.name)
      .filter(Boolean)
      .join(", ");

    // Menggunakan model OSS (Llama 3 atau Mixtral di Groq)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Kamu adalah asisten virtual "Warisan Nusantara". 
          Tugasmu menjelaskan tempat wisata berikut: ${allowedTopics}.
          Hanya bahas wisata, budaya, dan sejarah Indonesia. Tolak pertanyaan lain dengan sopan.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      // Llama 3 adalah model OSS yang sangat kuat
      model: "llama-3.3-70b-versatile",
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({ reply });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("🔥 GROQ API ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error", detail: errorMessage },
      { status: 500 }
    );
  }
}
