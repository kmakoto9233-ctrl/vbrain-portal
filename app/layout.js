import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "V-BRAIN | VTuber Intelligence Portal",
  description: "AI-driven premium VTuber & Streamer news and analytics portal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <div className="bg-glow"></div>
        {children}
      </body>
    </html>
  );
}
