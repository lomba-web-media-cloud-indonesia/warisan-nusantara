import type { Metadata } from "next";
import { Kalnia, Poppins } from "next/font/google";
import "./globals.css";

const kalnia = Kalnia({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Warisan Nusantara",
  description: "Eksplorasi budaya dan wisata Indonesia melalui peta interaktif dan chatbot edukatif.",
};

import { ChatProvider } from "@/context/ChatContext";
import ModalComponent from "@/components/modal/ModalComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kalnia.variable} ${poppins.variable} antialiased`}
      >
        <ChatProvider>
          {children}
          <ModalComponent />
        </ChatProvider>
      </body>
    </html>
  );
}
