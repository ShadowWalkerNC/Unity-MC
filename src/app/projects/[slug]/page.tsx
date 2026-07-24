"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import projectsData from "../../../data/projects.json";
import { updateProject, runWorkspaceTest, getLiveGitHubRepoStats } from "../../actions";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

interface GitHubStats {
  stars: number;
  openIssues: number;
  pushedAt: string;
  defaultBranch: string;
  archived: boolean;
}

export default function ProjectDetails({ params }: ProjectDetailsPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  
  // Find project
  const project = projectsData.find((p) => p.id === slug);

  const [status, setStatus] = useState(project?.status || "Active");
  const [deployUrl, setDeployUrl] = useState(project?.deployUrl || "");
  const [newIssue, setNewIssue] = useState("");
  const [newRoadmap, setNewRoadmap] = useState("");
  const [changelogMessage, setChangelogMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const [liveStats, setLiveStats] = useState<GitHubStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (project) {
      setStatsLoading(true);
      getLiveGitHubRepoStats(project.name).then((data) => {
        setLiveStats(data);
        setStatsLoading(false);
      });
    }
  }, [project]);

  if (!project) {
    return (
      <div className="glass-panel" style={{ padding: "3rem", textAlign: "center", borderRadius: "16px" }}>
        <h2 style={{ marginBottom: "1rem" }}>Project not found</h2>
        <Link href="/" className="btn btn-secondary">Back to Dashboard</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await updateProject(project.id, {
      status,
      deployUrl,
      newIssue,
      newRoadmap,
      changelogMessage
    });

    setLoading(false);
    if (res.success) {
      setMessage("Project updated successfully!");
      setNewIssue("");
      setNewRoadmap("");
      setChangelogMessage("");
      router.refresh();
    } else {
      setMessage(`Error: ${res.error}`);
    }
  };

  const handleRunTest = async () => {
    setTesting(true);
    setTestOutput(null);
    const res = await runWorkspaceTest(project.id);
    setTesting(false);
    setTestOutput(res.output);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header Link */}
      <Link href="/" style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
        ← Back to Projects Dashboard
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "2rem", alignItems: "start" }}>
        {/* Project View Profile */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <section className="glass-panel" style={{ padding: "2rem", borderRadius: "16px" }}>
            <span style={{ fontSize: "0.9rem", color: "var(--muted)", fontWeight: 500 }}>{project.group}</span>
            <h1 style={{ fontSize: "2.25rem", margin: "0.25rem 0 1rem 0" }} className="title-gradient">
              {project.name}
            </h1>
            <p style={{ color: "#111", fontSize: "1.1rem", marginBottom: "1.5rem" }}>{project.description}</p>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "1.5rem" }}>
              <div>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)" }}>Status</span>
                <span style={{ fontWeight: 600 }}>{project.status}</span>
              </div>
              {project.deployUrl && (
                <div>
                  <span style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)" }}>Deployment</span>
                  <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                    Open App ↗
                  </a>
                </div>
              )}
              <div>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)" }}>Active Stack</span>
                <code>{project.techStack}</code>
              </div>
            </div>

            {/* Live GitHub Data Panel */}
            <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <h4 style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "0.5rem" }}>🌐 Live GitHub API Sync</h4>
              {statsLoading ? (
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Fetching live repository telemetry...</p>
              ) : liveStats ? (
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.85rem" }}>
                  <div>
                    <span style={{ color: "var(--muted)" }}>GitHub Stars:</span> <strong>{liveStats.stars}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)" }}>Open GitHub Issues:</span> <strong>{liveStats.openIssues}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)" }}>Default Branch:</span> <code>{liveStats.defaultBranch}</code>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)" }}>Last Commit Push:</span> <strong>{new Date(liveStats.pushedAt).toLocaleDateString()}</strong>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Live repository stats unavailable (or private repository).</p>
              )}
            </div>

            {/* Test Execution Controls */}
            <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <button onClick={handleRunTest} disabled={testing} className="btn btn-secondary" style={{ fontSize: "0.85rem", gap: "0.5rem" }}>
                🧪 {testing ? "Running Workspace Test..." : `Run Test Suite (@apps/${project.id})`}
              </button>
              {testOutput && (
                <div style={{ marginTop: "1rem", padding: "0.75rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", fontSize: "0.8rem", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <span style={{ fontWeight: 600, display: "block", marginBottom: "0.25rem" }}>Test Output:</span>
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>{testOutput}</pre>
                </div>
              )}
            </div>
          </section>

          {/* Known Issues & Roadmap lists */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <section className="glass-panel" style={{ padding: "1.5rem", borderRadius: "12px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }} className="accent-gradient">🚨 Known Issues</h3>
              {project.knownIssues.length === 0 ? (
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>No open issues registered.</p>
              ) : (
                <ul style={{ paddingLeft: "1.2rem", fontSize: "0.9rem", color: "var(--muted)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {project.knownIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              )}
            </section>

            <section className="glass-panel" style={{ padding: "1.5rem", borderRadius: "12px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }} className="accent-gradient">🗺️ Roadmap</h3>
              {project.roadmap.length === 0 ? (
                <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>No upcoming milestones registered.</p>
              ) : (
                <ul style={{ paddingLeft: "1.2rem", fontSize: "0.9rem", color: "var(--muted)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {project.roadmap.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* MCP Bridge Settings */}
          {project.mcpServers.length > 0 && (
            <section className="glass-panel" style={{ padding: "1.5rem", borderRadius: "12px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>🔌 Active MCP Bridges</h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                {project.mcpServers.map((server) => (
                  <code key={server} style={{ background: "rgba(0,0,0,0.03)", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem", border: "1px solid rgba(0,0,0,0.08)" }}>
                    {server}
                  </code>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Update Form Sidebar */}
        <section className="glass-panel" style={{ padding: "1.5rem", borderRadius: "16px" }}>
          <h3 style={{ fontSize: "1.2rem", borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
            Log Change & Update
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {/* Status select */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.25rem" }}>Project Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "6px",
                  color: "inherit",
                  fontFamily: "inherit"
                }}
              >
                <option value="Active">Active</option>
                <option value="Active (private)">Active (Private)</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Deploy URL */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.25rem" }}>Deploy URL</label>
              <input
                type="text"
                value={deployUrl}
                onChange={(e) => setDeployUrl(e.target.value)}
                placeholder="https://..."
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "6px",
                  color: "inherit",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Append New Issue */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.25rem" }}>Add Known Issue</label>
              <input
                type="text"
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
                placeholder="e.g. Broken routing on refresh"
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "6px",
                  color: "inherit",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Append New Roadmap */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.25rem" }}>Add Roadmap Milestone</label>
              <input
                type="text"
                value={newRoadmap}
                onChange={(e) => setNewRoadmap(e.target.value)}
                placeholder="e.g. Integrate Analytics panel"
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "6px",
                  color: "inherit",
                  fontFamily: "inherit"
                }}
              />
            </div>

            {/* Changelog entry */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--muted)", marginBottom: "0.25rem" }}>Changelog Update (Appends to CHANGELOG.md)</label>
              <textarea
                value={changelogMessage}
                onChange={(e) => setChangelogMessage(e.target.value)}
                placeholder="Describe what changed in this version..."
                rows={3}
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "0.6rem 0.8rem",
                  borderRadius: "6px",
                  color: "inherit",
                  fontFamily: "inherit",
                  resize: "vertical"
                }}
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%" }}>
              {loading ? "Saving changes..." : "Save & Log Update"}
            </button>

            {message && (
              <div style={{
                marginTop: "0.5rem",
                padding: "0.5rem",
                borderRadius: "6px",
                textAlign: "center",
                background: message.includes("success") ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                color: message.includes("success") ? "rgb(5, 150, 105)" : "rgb(220, 38, 38)",
                fontSize: "0.85rem"
              }}>
                {message}
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
