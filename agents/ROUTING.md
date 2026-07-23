# 🤖 AI Agent Routing System

This routing map instructs Antigravity and other AI agents on which rule systems, MCP connections, and contexts to activate when editing projects in this ecosystem.

## 🎯 Target Rule Files

Organization-wide AI instructions are loaded from the `.github` repository (`ShadowWalkerNC/.github/`), while project-specific details are fetched from this `hub/` repository.

| Project Scope | Primary Rule / Config File | Active MCP Servers |
| :--- | :--- | :--- |
| **All Projects** | `.github/workflows/` / System Prompt | Core system MCPs |
| **Culinary Group** | `hub/projects/culinaryos.md` | `mcp-culinary-server` |
| **Emergency-CAD** | `hub/projects/emergency-cad.md` | `mcp-emergency-cad` |
| **Mercury Bus** | `hub/projects/mercury.md` | `mcp-mercury-bridge` |

---

## 🛠️ Instructions for Agents

When requested to modify an app:
1. **Locate the Profile**: Read the corresponding file in `hub/projects/<project-name>.md` to get the latest status, tech decisions, and paths.
2. **Consult Stack Guidelines**: Align code styling and architecture with `hub/STACK.md` and `hub/DESIGN.md`.
3. **Log Changes**: Update `hub/CHANGELOG.md` with the new version or features introduced.
