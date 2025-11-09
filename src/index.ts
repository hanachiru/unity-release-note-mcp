import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  type CallToolRequest,
  CallToolRequestSchema,
  type ListToolsRequest,
  ListToolsRequestSchema,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";
import {
  getUnityReleaseNotesContent,
  listUnityReleases,
  getUnityDownloadLinks,
  type ListReleasesParams,
} from "./tools.ts";

const server: Server = new Server(
  {
    name: "unity-release-note-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

const tools: Tool[] = [
  {
    name: "get_unity_release_notes_content",
    description:
      "Gets the full Markdown content of the release notes for a single, specific Unity version.",
    inputSchema: {
      type: "object",
      properties: {
        version: {
          type: "string",
          description: "The exact version string (e.g., '2022.3.10f1').",
        },
      },
      required: ["version"],
    },
  },
  {
    name: "list_unity_releases",
    description:
      "Lists Unity Editor releases matching filters. Does not return the content, only metadata like version, date, and stream. Use this to find available versions.",
    inputSchema: {
      type: "object",
      properties: {
        version: {
          type: "string",
          description: "Version filter (e.g., '2023.1', '2022').",
        },
        stream: {
          type: "string",
          description: "Filter by release stream. enum: LTS, BETA, ALPHA, TECH",
        },
        order: {
          type: "string",
          description: "Sort order (default: DESC). enum: RELEASE_DATE_ASC, RELEASE_DATE_DESC",
        },
        limit: {
          type: "number",
          description: "How many results to return. default: 5",
        }
      },
      required: [],
    }
  },
  {
    name: "get_unity_download_links",
    description:
      "Gets the installer download links and Unity Hub deep-link for a single, specific Unity version.",
    inputSchema: {
      type: "object",
      properties: {
        version: {
          type: "string",
          description: "The exact version string (e.g., '2022.3.10f1').",
        },
      },
      required: ["version"],
    }
  }
];

server.setRequestHandler(
  ListToolsRequestSchema,
  (_request: ListToolsRequest) => {
    return {
      tools,
    };
  },
);

server.setRequestHandler(
  CallToolRequestSchema,
  async (request: CallToolRequest) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case "get_unity_release_notes_content": {
          const { version } = args as { version: string };
          if (!version) {
            throw new Error("`version` parameter is required");
          }

          const notesContent = await getUnityReleaseNotesContent(version);
          return {
            content: [
              {
                type: "text",
                text: notesContent,
              },
            ],
          };
        }

        case "list_unity_releases": {
          const params = args as ListReleasesParams;
          
          const releases = await listUnityReleases(params);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(releases, null, 2),
              },
            ],
          };
        }

        case "get_unity_download_links": {
          const { version } = args as { version: string };
          if (!version) {
            throw new Error("`version` parameter is required");
          }
              
          const links = await getUnityDownloadLinks(version);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(links, null, 2),
              },
            ],
          };
        }

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : String(error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
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