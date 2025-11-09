# Unity Release Note MCP

[![Releases](https://img.shields.io/github/release/hanachiru/unity-release-note-mcp.svg)](https://github.com/hanachiru/unity-release-note-mcp/releases)
[![license](https://img.shields.io/badge/LICENSE-MIT-green.svg)](LICENSE)

English | [日本語](README_JA.md)

MCP server for searching Unity release note.

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

## License

This library is provided under the [MIT License](./LICENSE).
