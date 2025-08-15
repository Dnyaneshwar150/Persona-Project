"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Bot, User, Zap, Brain, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  emoji?: string;
}

export default function PiyushChatPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [history, setHistory] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: "piyush",
          message: inputMessage,
          history,
        }),
      });

      if (!res.ok) {
        toast({ description: "Something went wrong", variant: "destructive" });
        setIsLoading(false);
        return;
      }

      const data = await res.json();

      setHistory(data.history);

      // Convert backend history into UI-friendly messages
      const mappedMessages = data.history.map((m, id) => ({
        id: id,
        sender: m.role === "user" ? "user" : "ai",
        content: m.content,
        timestamp: new Date(),
      }));

      setMessages(mappedMessages);
      setInputMessage("");
    } catch (error) {
      console.error(error);
      toast({ description: "Server error", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='min-h-screen bg-background flex flex-col relative overflow-hidden'>
      {/* Magical floating background elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 right-10 w-20 h-20 bg-blue-500/5 rounded-full blur-xl animate-pulse' />
        <div className='absolute top-60 left-20 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl animate-pulse [animation-delay:1s]' />
        <div className='absolute bottom-40 right-1/3 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl animate-pulse [animation-delay:2s]' />
      </div>

      {/* Wizard magic popup */}
      {/* {showWizardMagic && (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce'>
          <div className='bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full shadow-lg'>
            <p className='font-bold text-sm'>
              {
                wizardEncouragements[
                  Math.floor(Math.random() * wizardEncouragements.length)
                ]
              }
            </p>
          </div>
        </div>
      )} */}

      <header className='border-b border-border/20 bg-background/80 backdrop-blur-sm sticky top-0 z-10'>
        <div className='container mx-auto max-w-4xl px-6 py-6'>
          <div className='flex items-center justify-between'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => router.push("/")}
              className='text-muted-foreground hover:text-foreground -ml-2 hover:scale-105 transition-transform duration-200'
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to MainScreen
            </Button>

            <div className='flex items-center gap-4'>
              <div className='w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center animate-pulse'>
                <img
                  src='/piyush.png'
                  alt={"piyush"}
                  className='h-full w-full object-cover  rounded-2xl'
                />
              </div>
              <div className='text-right'>
                <h1 className='text-xl font-bold text-foreground flex items-center gap-2'>
                  Piyush Sir
                  <Zap className='h-4 w-4 text-blue-500' />
                </h1>
                <p className='text-sm text-muted-foreground'>
                  The Knowledge Wizard 🧙‍♂️
                </p>
                <div className='flex gap-1 justify-end mt-1'>
                  <Brain className='h-3 w-3 text-blue-500 animate-pulse' />
                  <Star className='h-3 w-3 text-cyan-500 animate-pulse [animation-delay:0.5s]' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='flex-1 overflow-y-auto chat-scroll'>
        <div className='container mx-auto max-w-3xl px-6 py-8 space-y-8'>
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-4 duration-500`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {message.sender === "ai" && (
                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 mt-1 hover:scale-110 transition-transform duration-200'>
                  <img
                    src='/piyush.png'
                    alt={"piyush"}
                    className='h-full w-full object-cover  rounded-2xl'
                  />
                </div>
              )}

              <div
                className={`max-w-[80%] ${
                  message.sender === "user" ? "order-1" : ""
                }`}
              >
                <div
                  className={`rounded-2xl px-6 py-4 relative group ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white ml-auto hover:shadow-lg hover:shadow-blue-500/25"
                      : "bg-muted/50 text-foreground hover:bg-muted/70"
                  } transition-all duration-300 hover:scale-[1.02]`}
                >
                  {message.emoji && message.sender === "ai" && (
                    <div className='absolute -top-2 -right-2 text-2xl animate-bounce'>
                      {message.emoji}
                    </div>
                  )}
                  <p className='leading-relaxed text-[15px]'>
                    {message.content}
                  </p>
                </div>
                <p
                  className={`text-xs mt-2 px-2 ${
                    message.sender === "user"
                      ? "text-right text-muted-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {message.sender === "user" && (
                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shrink-0 mt-1 order-2 hover:scale-110 transition-transform duration-200'>
                  <User className='h-6 w-6 text-white' />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className='flex gap-4 justify-start animate-in slide-in-from-bottom-4'>
              <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 mt-1'>
                <img
                  src='/piyush.png'
                  alt={"piyush"}
                  className='h-full w-full object-cover  rounded-2xl'
                />
              </div>
              <div className='bg-muted/50 rounded-2xl px-6 py-4 hover:bg-muted/70 transition-colors duration-300'>
                <div className='flex gap-1'>
                  <div className='w-3 h-3 bg-blue-500 rounded-full animate-bounce' />
                  <div className='w-3 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.1s]' />
                  <div className='w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]' />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='border-t border-border/20 bg-background/80 backdrop-blur-sm'>
        <div className='container mx-auto max-w-3xl px-6 py-6'>
          <div className='flex gap-3 items-end'>
            <div className='flex-1'>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='What knowledge magic should we unlock? 🔮'
                className='min-h-[52px] text-[15px] border-border/40 focus:border-blue-500/50 rounded-xl resize-none hover:border-blue-500/30 transition-colors duration-200'
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size='lg'
              className='bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-lg hover:shadow-blue-500/25 rounded-xl h-[52px] px-6 hover:scale-105 transition-all duration-200'
            >
              <Send className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
