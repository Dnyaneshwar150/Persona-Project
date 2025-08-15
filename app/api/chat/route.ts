// app/api/chat/route.ts
import { personas } from "@/app/data/teachers";
import { fetchData } from "@/app/lib/fetchData";
import { createPersonaPrompt } from "@/app/lib/prompt";
import { NextResponse } from "next/server";

export interface SingleMessage {
  role: "system" | "user" | "assistant" | "developer";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { teacherId, message, history = [] } = await req.json();
    const teacher = personas.find((p) => p.id === teacherId);

    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    const systemPrompt = createPersonaPrompt(teacher);

    const messages: SingleMessage[] = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message },
    ];

    const responseText = await fetchData(messages);

    const updatedHistory: SingleMessage[] = [
      ...history,
      { role: "user", content: message },
      { role: "assistant", content: responseText },
    ];

    return NextResponse.json({
      reply: responseText,
      history: updatedHistory,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
