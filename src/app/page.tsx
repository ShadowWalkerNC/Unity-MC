"use client";

import React, { useState } from "react";
import Link from "next/link";
import projectsData from "../data/projects.json";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Group names and emojis mapping
  const groups = Array.from(new Set(projectsData.map((p) => p.group)));
  const statuses = Array.from(new Set(projectsData.map((p) => p.status)));

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.techStack.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGroup = selectedGroup ? project.group === selectedGroup : true;
    const matchesStatus = selectedStatus ? project.status === selectedStatus : true;

    return matchesSearch && matchesGroup && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    if (status.toLowerCase().includes("active")) return "badge-active";
    if (status.toLowerCase().includes("private")) return "badge-private";
    return "badge-archived";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Hero Section */}
      <section className="glass-panel" style={{ padding: "3rem 2rem", borderRadius: "16px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }} className="title-gradient">
          Project Center
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: "700px" }}>
          Explore and coordinate across the {projectsData.length} repositories in the ShadowWalkerNC ecosystem. Filter by category, stack, or active state.
        </p>

        {/* Stats Row */}
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }} className="accent-gradient">
              {projectsData.length}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Total Repos</div>
          </div>
          <div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "rgb(52, 211, 153)" }}>
              {projectsData.filter((p) => p.status.includes("Active")).length}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Active Projects</div>
          </div>
          <div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "rgb(251, 191, 36)" }}>
              {projectsData.filter((p) => p.group.includes("Culinary")).length}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Culinary Apps</div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search projects, stack, keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: "250px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "0.8rem 1.2rem",
            borderRadius: "8px",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: "1rem",
            outline: "none"
          }}
        />

        {/* Group Filter */}
        <select
          value={selectedGroup || ""}
          onChange={(e) => setSelectedGroup(e.target.value || null)}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "0.8rem 1.2rem",
            borderRadius: "8px",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: "1rem",
            outline: "none",
            cursor: "pointer"
          }}
        >
          <option value="" style={{ background: "var(--surface)" }}>All Categories</option>
          {groups.map((g) => (
            <option key={g} value={g} style={{ background: "var(--surface)" }}>
              {g}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus || ""}
          onChange={(e) => setSelectedStatus(e.target.value || null)}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "0.8rem 1.2rem",
            borderRadius: "8px",
            color: "#fff",
            fontFamily: "inherit",
            fontSize: "1rem",
            outline: "none",
            cursor: "pointer"
          }}
        >
          <option value="" style={{ background: "var(--surface)" }}>All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s} style={{ background: "var(--surface)" }}>
              {s}
            </option>
          ))}
        </select>
      </section>

      {/* Grid Section */}
      <section style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1.5rem"
      }}>
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="glass-panel glowing-card"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "200px"
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: "500" }}>{project.group}</span>
                <span className={`badge ${getStatusBadgeClass(project.status)}`}>{project.status}</span>
              </div>
              <h3 style={{ fontSize: "1.35rem", marginBottom: "0.75rem" }}>{project.name}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {project.description}
              </p>
            </div>
            <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)", paddingTop: "0.75rem", fontSize: "0.8rem", color: "var(--muted)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
              <code>{project.techStack}</code>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
