import { NextResponse } from "next/server";
import { touristSpots } from "@/data/LocTourism";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    // 1. Validasi API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Kesalahan: GEMINI_API_KEY tidak ditemukan di .env");
      return NextResponse.json(
        { error: "Konfigurasi server error (API Key)" },
        { status: 500 }
      );
    }

    const { message } = await req.json();

    // 2. Persiapkan Konteks
    const allowedTopics = Object.values(touristSpots)
      .flat()
      .map((s) => s.name)
      .join(", ");

    const genAI = new GoogleGenerativeAI(apiKey);

    // Menggunakan Gemini 1.5 Flash
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Kamu adalah asisten virtual "Warisan Nusantara". Jelaskan wisata: ${allowedTopics}. Jawab ramah, ringkas, gunakan Bahasa Indonesia. Tolak pertanyaan di luar wisata/budaya/sejarah Indonesia.`,
    });

    console.log("Mengirim pesan ke Gemini...");

    // 3. Eksekusi Generate Content
    const result = await model.generateContent(message);
    const response = await result.response;
    const reply = response.text();

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    // Cek konsol terminal VSC Anda untuk melihat detail error ini
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("DETEKSI ERROR PADA API ROUTE:", errorMessage);

    return NextResponse.json(
      { error: "Gagal memproses permintaan AI", details: errorMessage },
      { status: 500 }
    );
  }
}
