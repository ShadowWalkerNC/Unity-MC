import React from "react";

export default function SystemTokens() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Hero */}
      <section className="glass-panel" style={{ padding: "3rem 2rem", borderRadius: "16px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }} className="title-gradient">
          System Core & Standards
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "700px" }}>
          Canonical guidelines, design system tokens, and tech stack parameters applied across all active workspaces.
        </p>
      </section>

      {/* Grid of Tokens and Guidelines */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Colors and Variables */}
        <section className="glass-panel" style={{ padding: "2rem", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }} className="accent-gradient">🎨 Design System Tokens</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "block" }}>Dark Background (HSL 224, 25%, 12%)</span>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "hsl(224, 25%, 12%)", border: "1px solid rgba(255,255,255,0.1)" }} />
                <code>#151924</code>
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "block" }}>Card / Elevated Surface (HSL 224, 25%, 16%)</span>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "hsl(224, 25%, 16%)", border: "1px solid rgba(255,255,255,0.1)" }} />
                <code>#1d2230</code>
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "block" }}>Primary purple (HSL 263, 70%, 50%)</span>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "hsl(263, 70%, 50%)" }} />
                <code>#7c3aed</code>
              </div>
            </div>

            <div>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)", display: "block" }}>Accent cyan (HSL 190, 90%, 50%)</span>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "hsl(190, 90%, 50%)" }} />
                <code>#06b6d4</code>
              </div>
            </div>
          </div>
        </section>

        {/* Core Stack Guidelines */}
        <section className="glass-panel" style={{ padding: "2rem", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }} className="accent-gradient">🛠️ Stack Guidelines</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.95rem" }}>
            <div>
              <h4 style={{ color: "#fff", marginBottom: "0.25rem" }}>Next.js (App Router)</h4>
              <p style={{ color: "var(--muted)" }}>Standard template layout for all web frontends, ensuring fast server-side loading and clean API routes.</p>
            </div>
            
            <div>
              <h4 style={{ color: "#fff", marginBottom: "0.25rem" }}>Supabase Client Config</h4>
              <p style={{ color: "var(--muted)" }}>Database authentication and storage layers must activate RLS (Row Level Security) with custom project policy controls.</p>
            </div>

            <div>
              <h4 style={{ color: "#fff", marginBottom: "0.25rem" }}>Hosting</h4>
              <p style={{ color: "var(--muted)" }}>Deploy web products via Vercel for fast updates. Move server cron runners and WebSocket listeners to Railway.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
