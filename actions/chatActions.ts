"use server";

import { embedder } from "@/lib/embed";
import { supabase } from "@/lib/supabase";

interface ChatHistory {
  role: string;
  content: string;
}

function buildPrompt(
  context: string,
  history: ChatHistory[],
  question: string
) {
  const his = history
    ?.map((m) => `${m.role === "user" ? "Người dùng" : "Trợ lý"}: ${m.content}`)
    .join("\n");

  return `Vai trò:
Bạn là **trợ lý ảo thông minh, thân thiện và học thuật**,
chuyên giải thích các khái niệm, tư tưởng, giá trị trong **Tư tưởng Hồ Chí Minh**.
Bạn có khả năng diễn đạt tự nhiên, mạch lạc và giàu cảm xúc, giúp sinh viên hiểu sâu vấn đề.

Phong cách:
- Viết bằng **tiếng Việt chuẩn, học thuật nhưng dễ hiểu**.
- Có thể **nhấn mạnh** bằng cách sử dụng các dấu như **in đậm**, *nghiêng*, hoặc liệt kê rõ ràng.
- Nếu nội dung dài, hãy chia nhỏ từng ý, đảm bảo đủ và dễ theo dõi.
- Giữ **tôn trọng và thiện chí**, ngay cả khi người dùng hỏi ngoài lề.

Quy tắc nội dung:
1. Luôn dựa vào **CONTEXT** được cung cấp để trả lời.  
2. Nếu câu hỏi **liên quan** đến Tư tưởng Hồ Chí Minh:
   - Giải thích kỹ, có ví dụ minh họa.
   - Kết nối câu trả lời với thực tiễn (nếu phù hợp).
3. Nếu câu hỏi **ngoài phạm vi**, hãy:
   - Trả lời ngắn gọn, lịch sự (có thể 1–2 câu thú vị hoặc định hướng học tập),
   - Sau đó gợi ý quay lại đúng chủ đề, ví dụ:
     > "Câu hỏi này khá thú vị! Tuy nhiên, lĩnh vực đó nằm ngoài phạm vi Tư tưởng Hồ Chí Minh. Bạn muốn mình giải thích về khía cạnh tư tưởng, đạo đức, văn hóa tương ứng không?"

Dữ liệu cuộc trò chuyện trước:
${his ? his + "\n" : "(chưa có)"}

CONTEXT từ tài liệu:
${context}

CÂU HỎI MỚI:
${question}`.trim();
}

async function callGeminiWithRetry(
  url: string,
  payload: Record<string, unknown>,
  retries = 3
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return await res.json();

    const text = await res.text();
    console.error(`Gemini API error (attempt ${attempt}):`, text);

    if (res.status === 429 && attempt < retries) {
      const delay = 2000 * attempt;
      console.log(`Waiting ${delay / 1000}s before retry...`);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    throw new Error(`Gemini API failed: ${text}`);
  }
}

/**
 * Send chat message and get AI response
 * Server Action - không expose endpoint
 */
export async function sendChatMessage(
  question: string,
  history: ChatHistory[] = []
): Promise<{ answer?: string; error?: string; contextSnippet?: string }> {
  try {
    if (!question?.trim()) {
      return { error: "Thiếu câu hỏi!" };
    }

    // Lấy embedding cho câu hỏi
    const questionEmbedding = await embedder.embedQuery(question);

    // Tìm context trong Supabase
    const { data: matches, error } = await supabase.rpc("match_documents", {
      query_embedding: JSON.stringify(questionEmbedding),
      match_count: 5,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return { error: "Lỗi khi truy vấn cơ sở dữ liệu" };
    }

    if (!matches?.length) {
      return {
        answer:
          "Xin lỗi, tôi không tìm thấy thông tin phù hợp trong tài liệu về Tư tưởng Hồ Chí Minh.",
      };
    }

    // Ghép context
    const context = matches
      .map((m: { content: string }) => (m?.content ?? "").trim())
      .filter(Boolean)
      .join("\n---\n");

    // Build prompt
    const prompt = buildPrompt(context, history, question);

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;

    const json = await callGeminiWithRetry(endpoint, {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const answer =
      json?.candidates?.[0]?.content?.parts
        ?.map((p: { text: string }) => p.text)
        .join("\n")
        .trim() || "Xin lỗi, tôi chưa có dữ liệu phù hợp để trả lời.";

    return {
      answer,
      contextSnippet: context.slice(0, 500),
    };
  } catch (e) {
    console.error("Server error:", e);
    return { error: "Lỗi máy chủ nội bộ" };
  }
}
