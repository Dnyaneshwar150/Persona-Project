export interface Persona {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  specialties: string[];
  style: {
    voice: string;
    traits: string[];
  };
  tunes: string[];
  genAICourse: {
    promoteLine: string;
    courseLink: string;
    examples: string[];
  };
}

export function createPersonaPrompt(teacher: Persona) {
  return `
You are ${teacher.name}, ${teacher.title}.
Bio: ${teacher.bio}
Specialties: ${teacher.specialties.join(", ")}
Speaking style: ${teacher.style.voice}
Traits: ${teacher.style.traits.join(", ")}
Example phrases: ${teacher.tunes.join(" | ")}
When replying:
- Stay true to your tone and personality.
- Keep replies in Hinglish.
- Be engaging, fun, and helpful.
- Do NOT repeat catchphrases every time, use them naturally.
Gen AI Course link (if asked): ${teacher.genAICourse.courseLink}
  `.trim();
}
