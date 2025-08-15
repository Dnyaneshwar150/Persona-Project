"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Bot, MessageCircle, Sparkles, Zap, Heart, Star } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const teachers = [
    {
      id: "hitesh",
      name: "Hitesh Choudhary",
      nickname: "Tech Educator & Entrepreneur",
      tagline: "Makes boring stuff actually fun!",
      description:
        "Passionate about teaching programming with a focus on practical knowledge and real-world applications.",
      color: "from-purple-500 to-pink-500",
      route: "/chat/hitesh",
      image: "hitesh.jpg",
      personality: "🚀 Creative • 🎯 Innovative • ✨ Fun",
      funFact: "Can explain rocket science using pizza analogies!",
    },
    {
      id: "piyush",
      name: "Piyush",
      nickname: "The Knowledge Wizard 🧙‍♂️",
      tagline: "Your friendly neighborhood genius",
      description:
        "I break down anything complex into bite-sized, easy-to-digest pieces of awesome",
      color: "from-blue-500 to-cyan-400",
      route: "/chat/piyush",
      image: "piyush.png",
      personality: "🧠 Smart • 😄 Friendly • 🎪 Entertaining",
      funFact: "Loves turning 'impossible' into 'I'm possible'!",
    },
  ];

  return (
    <div className='min-h-screen bg-background overflow-hidden'>
      {/* Floating background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse' />
        <div className='absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse [animation-delay:1s]' />
        <div className='absolute bottom-32 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-xl animate-pulse [animation-delay:2s]' />
      </div>

      <header className='relative border-b border-border/20'>
        <div className='container mx-auto px-6 py-8'>
          <div className='flex items-center justify-center'>
            <div className='flex items-center gap-4 group'>
              <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <Bot className='h-7 w-7 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-foreground group-hover:text-purple-500 transition-colors duration-300'>
                TeachBot
              </h1>
              <div className='flex gap-1'>
                <Heart className='h-4 w-4 text-pink-500 animate-pulse' />
                <Star className='h-4 w-4 text-yellow-500 animate-pulse [animation-delay:0.5s]' />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className='relative py-20 px-6'>
        <div className='container mx-auto max-w-4xl text-center'>
          <div className='mb-8'>
            <div className='w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-400 flex items-center justify-center mx-auto mb-6 animate-bounce'>
              <Sparkles className='h-10 w-10 text-white' />
            </div>
          </div>
          <h2 className='text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight'>
            Chat with Your
            <br />
            <span className='bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse'>
              Tech Buddies! 🤖
            </span>
          </h2>
          <p className='text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed'>
            Two awesome friends ready to make learning ridiculously fun! 🎉
          </p>
        </div>
      </section>

      <section className='relative py-16 px-6'>
        <div className='container mx-auto max-w-5xl'>
          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            {teachers.map((teacher) => {
              const isHovered = hoveredCard === teacher.id;

              return (
                <Card
                  key={teacher.id}
                  className='group relative overflow-hidden border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3 cursor-pointer'
                  onMouseEnter={() => setHoveredCard(teacher.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${teacher.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Fun floating elements */}
                  <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                    <div className='flex gap-1'>
                      <div className='w-2 h-2 bg-yellow-400 rounded-full animate-bounce' />
                      <div className='w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0.1s]' />
                      <div className='w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]' />
                    </div>
                  </div>

                  <CardContent className='relative p-8'>
                    <div className='mb-8'>
                      <div className='flex items-start gap-4 mb-6'>
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${teacher.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <img
                            src={teacher.image}
                            alt={teacher.name}
                            className='h-full w-full object-cover  rounded-2xl'
                          />
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-2xl font-bold text-foreground mb-1 group-hover:text-purple-500 transition-colors duration-300'>
                            {teacher.name}
                          </h3>
                          <p className='text-primary font-medium text-sm mb-2'>
                            {teacher.nickname}
                          </p>
                          <p className='text-lg font-semibold text-foreground/80'>
                            {teacher.tagline}
                          </p>
                        </div>
                      </div>

                      <p className='text-muted-foreground leading-relaxed text-[15px] mb-4'>
                        {teacher.description}
                      </p>

                      <div className='space-y-2 mb-6'>
                        <p className='text-sm font-medium text-foreground/70'>
                          {teacher.personality}
                        </p>
                        <p className='text-xs text-muted-foreground italic'>
                          💡 {teacher.funFact}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => router.push(teacher.route)}
                      className={`w-full bg-gradient-to-r ${teacher.color} hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 text-white font-semibold py-6 text-lg rounded-xl group-hover:scale-105`}
                    >
                      <MessageCircle className='h-5 w-5 mr-3' />
                      Let's Chat! 🚀
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <footer className='relative border-t border-border/20 py-16 px-6 mt-24'>
        <div className='container mx-auto text-center'>
          <p className='text-muted-foreground text-xl font-medium mb-4'>
            Your journey to MasterJi tech starts here — let’s go! 💡
          </p>
          <div className='flex justify-center gap-2 text-2xl'>
            <span className='animate-bounce'>🎯</span>
            <span className='animate-bounce [animation-delay:0.1s]'>🚀</span>
            <span className='animate-bounce [animation-delay:0.2s]'>✨</span>
            <span className='animate-bounce [animation-delay:0.3s]'>🎉</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
