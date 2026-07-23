import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ShadowWalkerNC Hub — Central Platform",
  description: "The primary operations, design systems, and roadmaps dashboard for the ShadowWalkerNC repository ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        {/* Navigation Bar */}
        <header className="glass-panel" style={{
          position: "sticky",
          top: "1rem",
          zIndex: 50,
          margin: "1rem auto",
          maxWidth: "1200px",
          width: "calc(100% - 2rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          borderRadius: "16px"
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🌌</span>
            <span style={{ fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.03em" }} className="accent-gradient">
              ShadowWalkerNC Hub
            </span>
          </Link>
          <nav style={{ display: "flex", gap: "1.5rem", fontSize: "0.95rem", fontWeight: 500 }}>
            <Link href="/" className="nav-link">
              Projects
            </Link>
            <Link href="/ecosystem" className="nav-link">
              Ecosystem
            </Link>
            <Link href="/system" className="nav-link">
              System
            </Link>
          </nav>
        </header>

        {/* Main Content Area */}
        <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1rem", minHeight: "calc(100vh - 12rem)" }}>
          {children}
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: "center",
          padding: "3rem 1rem",
          fontSize: "0.85rem",
          color: "var(--muted)",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          marginTop: "4rem"
        }}>
          <p>© {new Date().getFullYear()} ShadowWalkerNC. Hub & Spoke Centralized Engine.</p>
        </footer>
      </body>
    </html>
  );
}
