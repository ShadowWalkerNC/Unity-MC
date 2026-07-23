"use server";

import fs from "fs/promises";
import path from "path";

const PROJECTS_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "projects.json"
);

const CHANGELOG_PATH = path.join(
  process.cwd(),
  "CHANGELOG.md"
);

interface Project {
  id: string;
  name: string;
  group: string;
  status: string;
  techStack: string;
  deployUrl: string;
  description: string;
  knownIssues: string[];
  roadmap: string[];
  mcpServers: string[];
}

export async function updateProject(id: string, formData: {
  status: string;
  deployUrl: string;
  newIssue?: string;
  newRoadmap?: string;
  changelogMessage?: string;
}) {
  try {
    // 1. Read existing projects
    const rawData = await fs.readFile(PROJECTS_PATH, "utf-8");
    const projects: Project[] = JSON.parse(rawData);

    // 2. Find and update target project
    const projectIdx = projects.findIndex((p) => p.id === id);
    if (projectIdx === -1) throw new Error("Project not found");

    const project = projects[projectIdx];
    project.status = formData.status;
    project.deployUrl = formData.deployUrl;

    if (formData.newIssue && formData.newIssue.trim()) {
      project.knownIssues.push(formData.newIssue.trim());
    }

    if (formData.newRoadmap && formData.newRoadmap.trim()) {
      project.roadmap.push(formData.newRoadmap.trim());
    }

    // Write back to projects.json
    await fs.writeFile(PROJECTS_PATH, JSON.stringify(projects, null, 2), "utf-8");

    // 3. Write log to CHANGELOG.md if message exists
    if (formData.changelogMessage && formData.changelogMessage.trim()) {
      const today = new Date().toISOString().split("T")[0];
      const logEntry = `\n- **${project.name}**: ${formData.changelogMessage.trim()} (${today})`;
      
      const changelogContent = await fs.readFile(CHANGELOG_PATH, "utf-8");
      
      // Insert log entry under the "[Unreleased]" section or header
      let updatedChangelog = changelogContent;
      const unreleasedHeaderIdx = changelogContent.indexOf("## [Unreleased]");
      
      if (unreleasedHeaderIdx !== -1) {
        const insertPosition = unreleasedHeaderIdx + "## [Unreleased]".length;
        updatedChangelog = 
          changelogContent.slice(0, insertPosition) + 
          "\n" + 
          logEntry + 
          changelogContent.slice(insertPosition);
      } else {
        // Fallback append
        updatedChangelog += `\n\n## [${today}]\n${logEntry}`;
      }

      await fs.writeFile(CHANGELOG_PATH, updatedChangelog, "utf-8");
    }

    return { success: true };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating project data: ", error);
    return { success: false, error: errMsg };
  }
}
