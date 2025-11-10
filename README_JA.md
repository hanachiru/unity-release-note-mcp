# Unity Release Note MCP

[![Releases](https://img.shields.io/github/release/hanachiru/unity-release-note-mcp.svg)](https://github.com/hanachiru/unity-release-note-mcp/releases)
[![license](https://img.shields.io/badge/LICENSE-MIT-green.svg)](LICENSE)

[English](README.md) | README_JA.md

Unity のリリースノート情報を正確に取得するための MCP サーバーです。[Unity Release API(1.0)](https://services.docs.unity.com/release/v1/) を利用することで、正確な情報を取得することができます。

![gemini-cli-sample](/assets/gemini-cli-chat_JA.png)

[jsr](https://jsr.io/@hanachiru/unity-release-note-mcp), [npm](https://www.npmjs.com/package/@hanachiru/unity-release-note-mcp)

## 要件

- Node.js 18 or later, or Deno

## セットアップ

> [!NOTE]
> Deno を使用する場合は、コマンドを `deno run --allow-net jsr:@hanachiru/unity-release-note-mcp` に置き換えてください。

### Visual Studio Code (VSCode)

`.vscode/mcp.json` に以下を追加してください。

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

`.gemini/settings.json` に以下を追加してください。

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

### その他

他のツールについてはそれぞれのドキュメントを参照し、`npx @hanachiru/unity-release-note-mcp` を実行するように設定してください。

## 利用可能なツール

| 名前                              | 説明                                                                                                                                                                                         |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_unity_release_notes_content` | 特定の Unity バージョンに関するリリースノートの Markdown コンテンツを取得します。                                                                                                |
| `list_unity_releases`             | フィルタに一致するリリース一覧を返します。コンテンツは返さず、バージョン、日付、ストリームなどのメタデータのみを返します。利用可能なバージョンを見つけるのに使ってください。 |
| `get_unity_download_links`        | 特定の Unity バージョンに対するインストーラのダウンロードリンクと Unity Hub のディープリンクを取得します。                                                                             |

## Rate Limits
内部で利用している [Unity Release API(1.0)](https://services.docs.unity.com/release/v1/) にはレートリミットが設定されています。使用の際にはご注意ください。

> These APIs have rate limiting in place. Requests are limited to 10 request per second and 1000 requests per thirty minutes per endpoint. The APIs respond with a 429 HTTP status code if the rate limit is exceeded.
> https://services.docs.unity.com/release/v1/#section/Overview

## ライセンス

このライブラリは [MIT License](./LICENSE) の下で提供されます.
