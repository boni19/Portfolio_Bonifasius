import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY?.trim();
const genAI = new GoogleGenerativeAI(apiKey || '');

export async function POST(req: NextRequest) {
  try {
    const { message, lang } = await req.json();

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({ role: 'assistant', content: "API Key belum diatur." });
    }

    const publicDir = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(publicDir);
    const pdfFiles = files.filter(file => file.toLowerCase().endsWith('.pdf'));

    const pdfParts = pdfFiles.map(fileName => {
      const dataBuffer = fs.readFileSync(path.join(publicDir, fileName));
      return {
        inlineData: {
          data: dataBuffer.toString('base64'),
          mimeType: 'application/pdf'
        }
      };
    });

    const currentTime = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    // MENGGUNAKAN NAMA MODEL YANG PASTI ADA DI AKUN ANDA
    const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

    const systemInstruction = `
      You are Bonifasius's Personal AI Assistant. Represent him professionally and warmly.
      CRITICAL RULES:
      1. If the user greets you (e.g., Hi, Halo, Selamat pagi), reply with a matching greeting. HOWEVER, if they greet you with the WRONG time of day (e.g. saying "Selamat sore" when it's actually morning), you MUST be firm and explicitly correct them based on the current time provided below (e.g. "Maaf, saat ini masih pagi. Ada yang bisa saya bantu tentang Boni?").
      2. Answer directly and naturally. NEVER mention "based on documents" or "PDF".
      3. Act as if you naturally know everything about Bonifasius.
      4. Today's date/time: ${currentTime}.
      5. DO NOT use markdown formatting like asterisks (** or *) for bolding or lists. Use pure plain text only.
      6. AGENTIC CAPABILITY: If the user asks to see your skills/expertise, include the exact string [ACTION:SCROLL_EXPERTISE] in your response. If they want to contact or hire you, include [ACTION:SCROLL_CONTACT]. This will automatically trigger the website UI.
      Always respond in ${lang === 'ID' ? 'Indonesian' : 'English'}.
    `;

    const result = await model.generateContentStream([
      systemInstruction,
      ...pdfParts,
      { text: message }
    ]);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text().replace(/\*/g, '');
            if (chunkText) {
              controller.enqueue(new TextEncoder().encode(chunkText));
            }
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      },
    });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    let errorMessage = "Maaf, terjadi kendala teknis (Server Error).";
    if (error.message && error.message.includes('429')) {
      errorMessage = "Maaf, kuota harian sistem AI saya sedang habis. Google saat ini membatasi hanya 20 chat per hari untuk akun gratis. Mohon coba lagi besok.";
    } else if (error.message && error.message.includes('503')) {
      errorMessage = "Maaf, server AI Google sedang *down* atau kepenuhan (*Service Unavailable*). Mohon coba lagi dalam beberapa menit.";
    }

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(errorMessage));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      },
    });
  }
}
