"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { useTypewriter } from "@/hooks/useTypewriter";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Component for rendering individual messages with potential typewriter effect
const MessageBubble = ({ msg, isLast }: { msg: Message; isLast: boolean }) => {
  const { displayedText, isComplete } = useTypewriter(
    msg.content,
    isLast && msg.role === "assistant" ? 20 : 0
  );

  // Use displayedText only if it's the last message and from assistant, otherwise show full content immediately (for history)
  const textToShow =
    isLast && msg.role === "assistant" ? displayedText : msg.content;

  return (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}>
      <div
        className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
          msg.role === "user"
            ? "bg-[#C6A664] text-white rounded-br-none"
            : "bg-white/95 text-[#2F6B4F] rounded-bl-none border border-[#2F6B4F]/10"
        }`}>
        {/* Simple formatting: preserve line breaks */}
        <div className="whitespace-pre-wrap font-medium">{textToShow}</div>
      </div>
    </div>
  );
};

export default function ModalComponent() {
  const { isOpen, openChat, closeChat, initialMessage, clearInitialMessage } =
    useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle initial message from Context (e.g. from Map click)
  useEffect(() => {
    if (isOpen && initialMessage) {
      handleSendMessage(initialMessage);
      clearInitialMessage();
    }
  }, [isOpen, initialMessage]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Maaf, terjadi kesalahan pada server.",
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Gagal terhubung ke server." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <>
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          {/* Close Area (Click outside) */}
          <div className="absolute inset-0" onClick={closeChat}></div>

          {/* Main Modal Wrapper - Responsive width */}
          <div className="relative w-full max-w-[350px] md:max-w-[420px] h-[75vh] min-h-[500px] max-h-[700px] mt-16 transition-all duration-300 ease-out transform scale-100">
            {/* Close Button X */}
            <button
              onClick={closeChat}
              className="absolute -top-[60px] right-0 z-50 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-md transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header Image */}
            <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 z-20 w-[110%] h-auto pointer-events-none flex justify-center">
              <Image
                src="/asset/images/HeaderModal.png"
                alt="Header Modal"
                width={450}
                height={230}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Modal Content Container */}
            <div className="w-full h-full bg-[#2F6B4F] rounded-[30px] overflow-hidden flex flex-col shadow-2xl relative z-10 border-[3px] border-[#C6A664]/40">
              {/* Background Pattern */}
              <div className="absolute inset-0 z-0 bg-[url('/asset/images/bg-modal.png')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"></div>

              {/* Messages Area */}
              <div className="relative z-10 flex-1 overflow-y-auto p-5 scrollbar-hide space-y-4 pb-36 pt-8">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-[60%] text-center text-white/80 p-6">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                      <span className="text-3xl">👋</span>
                    </div>
                    <p className="font-bold text-lg text-[#C6A664]">
                      Halo! Saya asisten Warisan Nusantara.
                    </p>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">
                      Tanyakan apa saja tentang tempat wisata, sejarah, atau
                      budaya Indonesia!
                    </p>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <MessageBubble
                    key={index}
                    msg={msg}
                    isLast={index === messages.length - 1}
                  />
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/90 rounded-2xl p-4 rounded-bl-none shadow-sm border border-white/20">
                      <div className="flex space-x-1.5 items-center">
                        <div className="w-2 h-2 bg-[#2F6B4F] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#2F6B4F] rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-[#2F6B4F] rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Footer Section */}
              <div className="absolute bottom-0 left-0 right-0 z-20">
                <div className="w-full relative">
                  <Image
                    src="/asset/images/footerModal.png"
                    alt="Footer Decoration"
                    width={350}
                    height={150}
                    className="w-full h-auto object-cover"
                  />

                  {/* Input Form */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%]">
                    <form onSubmit={handleSubmit}>
                      <div className="relative group">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Tanya wisata..."
                          disabled={isLoading}
                          className="w-full h-11 pl-11 pr-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#C6A664] focus:bg-white/30 shadow-lg transition-all"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        <button
                          type="submit"
                          disabled={!input.trim() || isLoading}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-[#C6A664] rounded-full text-white hover:bg-[#b09252] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
