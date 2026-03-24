import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testTTS() {
  try {
    const mp3 = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "verse",
      input: "Xin chao, toi la tro ly am thuc Viet Nam. Ban muon tim hieu ve mon an nao?",
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    require("fs").writeFileSync("test-tts.mp3", buffer);
    console.log("TTS created: test-tts.mp3");
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
  }
}

testTTS();
