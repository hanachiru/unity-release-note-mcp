import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  getUnityReleaseNotesContent,
  listUnityReleases,
  getUnityDownloadLinks,
} from "./tools.ts";
import denoJson from "../deno.json" with { type: "json" };

const server = new McpServer(
  {
    name: "unity-release-note-mcp",
    version: denoJson.version,
  },
);

server.registerTool(
  "get_unity_release_notes_content",
  {
    description:
      "Gets the full Markdown content of the release notes for a single, specific Unity version.",
    inputSchema: {
      version: z.string().describe("The exact version string (e.g., '2022.3.10f1')."),
    },
  },
  async ({ version }) => {
    const notesContent = await getUnityReleaseNotesContent(version);
    return {
      content: [
        {
          type: "text",
          text: notesContent,
        },
      ],
    };
  },
);

server.registerTool(
  "list_unity_releases",
  {
    description:
      "Lists Unity Editor releases matching filters. Does not return the content, only metadata like version, date, and stream. Use this to find available versions.",
    inputSchema: {
      version: z.string().optional().describe("Version filter (e.g., '2023.1', '2022')."),
      stream: z.enum(["LTS", "BETA", "ALPHA", "TECH"]).optional().describe("Filter by release stream."),
      order: z.enum(["RELEASE_DATE_ASC", "RELEASE_DATE_DESC"]).optional().describe("Sort order (default: DESC)."),
      limit: z.number().optional().describe("How many results to return. default: 5"),
    },
  },
  async (params) => {
    const releases = await listUnityReleases(params);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(releases, null, 2),
        },
      ],
    };
  },
);

server.registerTool(
  "get_unity_download_links",
  {
    description:
      "Gets the installer download links and Unity Hub deep-link for a single, specific Unity version.",
    inputSchema: {
      version: z.string().describe("The exact version string (e.g., '2022.3.10f1')."),
    },
  },
  async ({ version }) => {
    const links = await getUnityDownloadLinks(version);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(links, null, 2),
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Unity Release Note MCP Server running on stdio");
}

Deno.addSignalListener("SIGINT", async () => {
  await server.close();
  Deno.exit(0);
});

if (import.meta.main) {
  main().catch((error) => {
    console.error("Failed to start server:", error);
    Deno.exit(1);
  });
}