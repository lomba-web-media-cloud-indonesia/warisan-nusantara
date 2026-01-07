"use client"
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export default function ModalComponent() {
    const [isOpen, setIsOpen] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, terjadi kesalahan pada server." }]);
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Gagal terhubung ke server." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button (Floating Action Button) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 z-50 bg-[#2F6B4F] hover:bg-[#24523b] text-[#C6A664] p-4 rounded-full shadow-lg transition-all transform hover:scale-105 border-2 border-[#C6A664]"
                >
                    <div className="flex items-center gap-2">
                        <span className="font-bold hidden md:block">Tanya Warisan</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                </button>
            )}

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">

                    {/* Close Area (Click outside) */}
                    <div className="absolute inset-0" onClick={() => setIsOpen(false)}></div>

                    {/* Main Modal Wrapper */}
                    <div className="relative w-full max-w-[350px] h-[65vh] min-h-[480px] max-h-[600px] mt-20 transition-all">

                        {/* Close Button X */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-[100px] right-0 z-50 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-md transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header Image */}
                        <div className="absolute -top-[90px] left-1/2 -translate-x-1/2 z-20 w-[120%] h-auto pointer-events-none flex justify-center">
                            <Image
                                src="/asset/images/HeaderModal.png"
                                alt="Header Modal"
                                width={420}
                                height={210}
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Modal Content Container */}
                        <div className="w-full h-full bg-[#2F6B4F] rounded-[30px] overflow-hidden flex flex-col shadow-2xl relative z-10 border-4 border-[#C6A664]/30">

                            {/* Background Pattern */}
                            <div className="absolute inset-0 z-0 bg-[url('/asset/images/bg-modal.png')] bg-cover bg-center bg-no-repeat opacity-50 mix-blend-overlay"></div>

                            {/* Messages Area */}
                            <div className="relative z-10 flex-1 overflow-y-auto p-4 scrollbar-hide space-y-3 pb-32">
                                {messages.length === 0 && (
                                    <div className="text-center text-white/70 text-sm mt-10 p-4 bg-black/20 rounded-xl backdrop-blur-sm">
                                        <p>👋 Halo! Saya asisten Warisan Nusantara.</p>
                                        <p className="mt-2">Tanyakan apa saja tentang tempat wisata, sejarah, atau budaya Indonesia!</p>
                                    </div>
                                )}

                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                                                    ? 'bg-[#C6A664] text-white rounded-br-none'
                                                    : 'bg-white/90 text-[#2F6B4F] rounded-bl-none shadow-md'
                                                }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/80 rounded-2xl p-3 rounded-bl-none">
                                            <div className="flex space-x-1">
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
                                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%]">
                                        <form onSubmit={handleSubmit}>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}
                                                    placeholder="Tanya wisata..."
                                                    disabled={isLoading}
                                                    className="w-full h-9 pl-9 pr-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-white text-xs placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-[#C6A664] shadow-lg transition-all"
                                                />
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={!input.trim() || isLoading}
                                                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-[#C6A664] rounded-full text-white hover:bg-[#b09252] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
    )
}