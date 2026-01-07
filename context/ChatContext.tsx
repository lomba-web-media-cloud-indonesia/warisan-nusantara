"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
    isOpen: boolean;
    openChat: (initialMessage?: string) => void;
    closeChat: () => void;
    initialMessage: string | null;
    clearInitialMessage: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [initialMessage, setInitialMessage] = useState<string | null>(null);

    const openChat = (msg?: string) => {
        if (msg) setInitialMessage(msg);
        setIsOpen(true);
    };

    const closeChat = () => setIsOpen(false);
    const clearInitialMessage = () => setInitialMessage(null);

    return (
        <ChatContext.Provider
            value={{
                isOpen,
                openChat,
                closeChat,
                initialMessage,
                clearInitialMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
