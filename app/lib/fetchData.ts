import { SingleMessage } from "../api/chat/route";

const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY!;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function fetchData(messages: SingleMessage[]) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma2-9b-it",
        messages,
        max_tokens: 150,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    const rawOutput = data?.choices?.[0]?.message?.content;
    return rawOutput;
  } catch (error) {
    throw error;
  }
}
