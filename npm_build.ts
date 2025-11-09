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
    license: "MIT",
    bin: {
      "unity-release-note-mcp": "./src/index.ts",
    },
  },
});