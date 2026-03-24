import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!) || 'AIzaSyAms63d1TEgavQW67PAwxfAH9srj1vZmrs';
console.log(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
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

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Thiếu tin nhắn" }, { status: 400 });
    }

    // Khởi tạo model với System Instruction (Cách chuẩn để AI giữ vai)
    // Thử dùng "gemini-1.5-flash" - đây là ID ổn định nhất hiện tại
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_PROMPT
    });

    // Chuyển đổi history sang định dạng Gemini SDK yêu cầu
    const chatHistory = history.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Sử dụng startChat để quản lý ngữ cảnh thay vì nối chuỗi thủ công
    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("Chat API error:", error);

    // Xử lý lỗi 404 cụ thể
    if (error.message?.includes("404")) {
      return NextResponse.json(
        { error: "Model ID không hợp lệ hoặc không được hỗ trợ. Hãy thử đổi sang 'gemini-1.5-flash'." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Lỗi: " + (error?.message || "Không thể gửi tin nhắn") },
      { status: 500 }
    );
  }
}