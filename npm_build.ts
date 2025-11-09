import { build, emptyDir } from "@deno/dnt";
import denoJson from "./deno.json" with { type: "json" };

await emptyDir("./npm");

await build({
  entryPoints: [{
    kind: 'bin',
    name: 'unity-release-note-mcp',
    path: './src/index.ts',
  }],
  outDir: "./npm",
  shims: { deno: true },
  typeCheck: false,
  test: false,
  package: {
    name: denoJson.name,
    version: denoJson.version,
    description: denoJson.description,
    license: "MIT",
    repository: { // リポジトリ情報も追加推奨
      type: "git",
      url: "git+https://github.com/hanachiru/unity-release-note-mcp.git",
    },
    bugs: {
      url: "https://github.com/hanachiru/unity-release-note-mcp/issues",
    }
  },
});