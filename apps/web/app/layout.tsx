import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import OnboardingGuard from "./OnboardingGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillMentor App",
  description: "SkillMentor Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <OnboardingGuard>
            {children}
          </OnboardingGuard>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
