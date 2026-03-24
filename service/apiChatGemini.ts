"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || 'AIzaSyAms63d1TEgavQW67PAwxfAH9srj1vZmrs');

const SYSTEM_PROMPT = `Vai trò:
Bạn là chuyên gia về ẩm thực và văn hóa Việt Nam thời Bao cấp (1976-1986).
Bạn am hiểu sâu sắc về hệ thống tem phiếu, các món ăn đặc trưng như bo bo, cơm độn khoai/sắn, cháo cám, bánh bột mì hấp.

Phong cách:
- Diễn đạt gần gũi, hoài niệm nhưng mạch lạc.
- Sử dụng tiếng Việt chuẩn.
- Dùng **in đậm** cho các từ khóa quan trọng liên quan đến lịch sử/món ăn.

Quy tắc:
1. Luôn trả lời dựa trên kiến thức về thời Bao cấp và dân dã Việt Nam.
2. Nếu câu hỏi không liên quan, hãy khéo léo dẫn dắt người dùng quay lại chủ đề ẩm thực/văn hóa xưa.`;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatOptions {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  error?: string;
}

export async function chatWithGemini({ message, history = [] }: ChatOptions): Promise<ChatResponse> {
  try {
    if (!message?.trim()) {
      return { reply: "", error: "Thiếu tin nhắn" };
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_PROMPT
    });

    const chatHistory = history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return { reply };

  } catch (error: any) {
    console.error("Chat Gemini error:", error);

    if (error.message?.includes("404")) {
      return { 
        reply: "", 
        error: "Model ID không hợp lệ hoặc không được hỗ trợ." 
      };
    }

    return { 
      reply: "", 
      error: error?.message || "Không thể gửi tin nhắn" 
    };
  }
}
