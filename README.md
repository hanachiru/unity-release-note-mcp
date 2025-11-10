# Unity Release Note MCP

[![Releases](https://img.shields.io/github/release/hanachiru/unity-release-note-mcp.svg)](https://github.com/hanachiru/unity-release-note-mcp/releases)
[![license](https://img.shields.io/badge/LICENSE-MIT-green.svg)](LICENSE)

English | [日本語](README_JA.md)

This is an MCP server for accurately retrieving Unity release note information. It uses the [Unity Release API (1.0)](https://services.docs.unity.com/release/v1/) to obtain precise data.

![gemini-cli-sample](/assets/gemini-cli-chat.png)

[jsr](https://jsr.io/@hanachiru/unity-release-note-mcp), [npm](https://www.npmjs.com/package/@hanachiru/unity-release-note-mcp)

## Requirements

- Node.js 18 or later, or Deno

## Setup

> [!NOTE]
> If you use Deno, replace the command with `deno run --allow-net jsr:@hanachiru/unity-release-note-mcp`.

### Visual Studio Code (VSCode)

Add the following to `.vscode/mcp.json`:

```json
{
  "servers": {
    "unity-release-note-mcp": {
      "command": "npx",
      "args": ["@hanachiru/unity-release-note-mcp@latest", "-y"]
    }
  }
}
```

### Gemini Cli

Add the following to `.gemini/settings.json`:

```json
{
  "mcpServers": {
    "unity-release-note-mcp": {
      "command": "npx",
      "args": ["@hanachiru/unity-release-note-mcp@latest", "-y"]
    }
  }
}
```

### Others

For other tools, please refer to the documentation as needed and add an MCP server that runs the command `npx @hanachiru/unity-release-note-mcp`.

## Available Tools

| Name                              | Description                                                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_unity_release_notes_content` | Gets the full Markdown content of the release notes for a single, specific Unity version.                                                                     |
| `list_unity_releases`             | Lists Unity Editor releases matching filters. Does not return the content, only metadata like version, date, and stream. Use this to find available versions. |
| `get_unity_download_links`        | Gets the installer download links and Unity Hub deep-link for a single, specific Unity version.                                                               |

## Rate Limits
The internally used [Unity Release API (1.0)](https://services.docs.unity.com/release/v1/) has rate limits. Please be aware of this when using the tool.

> These APIs have rate limiting in place. Requests are limited to 10 request per second and 1000 requests per thirty minutes per endpoint. The APIs respond with a 429 HTTP status code if the rate limit is exceeded.
> https://services.docs.unity.com/release/v1/#section/Overview

## License

This library is provided under the [MIT License](./LICENSE).