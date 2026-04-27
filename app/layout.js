import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "V-BRAIN | Virtual Sphere Insights",
  description: "VTuber・ストリーマー界隈の最新動向を網羅。データに基づく専門的なレポートをお届けします。",
  metadataBase: new URL("https://vbrain-portal.vercel.app"),
  alternatives: {
    canonical: "/",
  },
  verification: {
    google: "YbeCaeTMleDXVbZlCJu05CEBCog7QCfTBdhVCcQYjoo",
  },
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
