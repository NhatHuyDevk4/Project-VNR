import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getRetriever } from "@/utils/retriever";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  sessionId: string;
  message: string;
  history?: Message[];
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, history = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get relevant context from vector store
    let context = "";
    try {
      const retriever = await getRetriever();
      const docs = await retriever.invoke(message);

      if (docs && docs.length > 0) {
        context = docs
          .map((doc, idx) => `[Tài liệu ${idx + 1}]:\n${doc.pageContent}`)
          .join("\n\n");
      }
    } catch (error) {
      console.error("Error retrieving context:", error);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // System prompt
    const systemPrompt = `Bạn là một trợ lý AI thông minh và hữu ích. Nhiệm vụ của bạn là trả lời câu hỏi của người dùng một cách chính xác, chi tiết và dễ hiểu.

${
  context
    ? `Dưới đây là một số tài liệu tham khảo có thể hữu ích:\n\n${context}\n\n`
    : ""
}

Hãy trả lời câu hỏi dựa trên thông tin được cung cấp (nếu có) và kiến thức của bạn. Nếu bạn không chắc chắn về câu trả lời, hãy thành thật nói rằng bạn không biết.`;

    // Build chat history
    const chatHistory = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Tôi hiểu. Tôi sẽ trả lời câu hỏi của bạn một cách chính xác và hữu ích nhất có thể.",
            },
          ],
        },
        ...chatHistory,
      ],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
      sessionId: body.sessionId,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "Đã có lỗi xảy ra khi xử lý yêu cầu",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
