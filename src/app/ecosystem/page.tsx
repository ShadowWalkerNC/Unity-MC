"use client";

import React, { useState } from "react";
import Link from "next/link";
import projectsData from "../../data/projects.json";

interface Connection {
  from: string;
  to: string;
  type: "database" | "event" | "sync";
  description: string;
}

export default function Ecosystem() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Connection mapping rules
  const connections: Connection[] = [
    { from: "culinaryos", to: "supabase", type: "database", description: "Reads/Writes Menus and Recipes" },
    { from: "plated", to: "supabase", type: "database", description: "Shares plating configuration data" },
    { from: "kitchenkit", to: "supabase", type: "database", description: "Syncs dynamic checklists" },
    { from: "culinaryops", to: "supabase", type: "database", description: "Automates background operations" },
    { from: "post-pilot", to: "supabase", type: "database", description: "Queries menu data for marketing automation" },
    { from: "mercury", to: "culinaryos", type: "event", description: "Webhooks for menu changes & user events" },
    { from: "mercury", to: "culinaryops", type: "event", description: "Trigger scripts & jobs" },
    { from: "mercury", to: "shorelineops", type: "event", description: "Fires urgent care system notifications" },
    { from: "emergency-cad", to: "cad_db", type: "database", description: "Writes isolated emergency cad events" },
    { from: "emergency-cad", to: "mercury", type: "sync", description: "Streams live updates via WebSocket" }
  ];

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const getActiveConnections = () => {
    if (!selectedNode) return [];
    return connections.filter(
      (c) => c.from === selectedNode || c.to === selectedNode
    );
  };

  const renderNode = (id: string, name: string, icon: string, x: number, y: number) => {
    const isSelected = selectedNode === id;
    const isRelated = selectedNode
      ? connections.some((c) => (c.from === selectedNode && c.to === id) || (c.to === selectedNode && c.from === id)) || isSelected
      : true;

    return (
      <button
        onClick={() => handleNodeClick(id)}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          transform: "translate(-50%, -50%)",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          cursor: "pointer",
          border: "none",
          width: "140px",
          zIndex: isSelected ? 20 : 10,
          opacity: isRelated ? 1 : 0.25,
          background: isSelected ? "var(--primary)" : "rgba(25, 30, 45, 0.8)",
          borderRadius: "12px",
          boxShadow: isSelected ? "0 0 20px var(--primary)" : "0 4px 10px rgba(0, 0, 0, 0.3)"
        }}
        className="glass-panel"
      >
        <span style={{ fontSize: "1.75rem" }}>{icon}</span>
        <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#fff", textAlign: "center" }}>{name}</span>
      </button>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <section className="glass-panel" style={{ padding: "3rem 2rem", borderRadius: "16px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }} className="title-gradient">
          Ecosystem Visualizer
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "700px" }}>
          Click on any node in the map to see its incoming and outgoing data connections, shared databases, and platform integration channels.
        </p>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem", minHeight: "500px" }}>
        {/* Interactive SVG / Node Canvas */}
        <div style={{
          position: "relative",
          background: "rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "16px",
          overflow: "hidden",
          height: "600px"
        }}>
          {/* SVG Connection Lines */}
          <svg style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
            {connections.map((conn, idx) => {
              // Approximate coordinates for nodes
              const coords: Record<string, { x: number; y: number }> = {
                culinaryos: { x: 20, y: 15 },
                plated: { x: 20, y: 35 },
                kitchenkit: { x: 20, y: 55 },
                culinaryops: { x: 20, y: 75 },
                post_pilot: { x: 20, y: 90 }, // Map post-pilot key safely
                "post-pilot": { x: 20, y: 90 },
                supabase: { x: 50, y: 45 },
                mercury: { x: 80, y: 30 },
                shorelineops: { x: 80, y: 65 },
                "emergency-cad": { x: 80, y: 15 },
                cad_db: { x: 50, y: 15 }
              };

              const start = coords[conn.from];
              const end = coords[conn.to];

              if (!start || !end) return null;

              const isHighlighted = selectedNode === conn.from || selectedNode === conn.to;
              const opacity = selectedNode ? (isHighlighted ? 0.8 : 0.05) : 0.25;

              return (
                <line
                  key={idx}
                  x1={`${start.x}%`}
                  y1={`${start.y}%`}
                  x2={`${end.x}%`}
                  y2={`${end.y}%`}
                  stroke={conn.type === "database" ? "hsl(190, 90%, 50%)" : "hsl(263, 70%, 50%)"}
                  strokeWidth={isHighlighted ? 3 : 1.5}
                  strokeDasharray={conn.type === "sync" ? "5,5" : undefined}
                  style={{ opacity, transition: "all 0.3s" }}
                />
              );
            })}
          </svg>

          {/* Node Buttons */}
          {renderNode("culinaryos", "CulinaryOS", "🍽️", 20, 15)}
          {renderNode("plated", "Plated", "🍽️", 20, 35)}
          {renderNode("kitchenkit", "KitchenKit", "🍽️", 20, 55)}
          {renderNode("culinaryops", "CulinaryOps", "⚙️", 20, 75)}
          {renderNode("post-pilot", "Post-Pilot", "🚀", 20, 90)}

          {renderNode("supabase", "Shared Supabase", "🗄️", 50, 45)}
          {renderNode("cad_db", "CAD Database", "🗄️", 50, 15)}

          {renderNode("emergency-cad", "Emergency CAD", "🚑", 80, 15)}
          {renderNode("mercury", "Mercury Bus", "💬", 80, 30)}
          {renderNode("shorelineops", "ShorelineOps", "🏥", 80, 65)}
        </div>

        {/* Connection Detail Sidebar */}
        <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.2rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "0.5rem" }}>
            Node Inspector
          </h3>

          {!selectedNode ? (
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              Select a project or component on the canvas to inspect its integrations.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <h4 style={{ color: "#fff", textTransform: "capitalize" }}>{selectedNode}</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                  Connected to {getActiveConnections().length} other systems.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {getActiveConnections().map((conn, idx) => (
                  <div key={idx} style={{
                    padding: "0.75rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    fontSize: "0.85rem"
                  }}>
                    <div style={{ fontWeight: "bold", color: conn.type === "database" ? "var(--accent)" : "var(--primary)", marginBottom: "0.25rem" }}>
                      {conn.from} ➔ {conn.to}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{conn.description}</div>
                  </div>
                ))}
              </div>

              {projectsData.some((p) => p.id === selectedNode) && (
                <Link href={`/projects/${selectedNode}`} className="btn btn-primary" style={{ width: "100%", fontSize: "0.85rem" }}>
                  View Project Workspace
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
