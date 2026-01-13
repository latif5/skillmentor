import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "SkillMentor - Master Your Skills",
  description: "The ultimate platform for learning and skill development. Join thousands of students mastering their craft with SkillMentor.",
  keywords: ["learning", "education", "flashcards", "study", "skills"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-slate-950 text-white min-h-screen antialiased selection:bg-indigo-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
