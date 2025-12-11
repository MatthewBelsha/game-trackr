import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GameTrackr",
  description: "Track your games easily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
  style={{
    backgroundColor: "#e9e9e9",  // light grey background
    color: "#333",               // darker text for readability
    minHeight: "100vh",
  }}
>
  <Navbar />

  <div
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "24px",
      backgroundColor: "#f7f7f7",   // off-white content background
      borderRadius: "12px",
      minHeight: "100vh",
    }}
  >
    {children}
  </div>
</body>

    </html>
  );
}
