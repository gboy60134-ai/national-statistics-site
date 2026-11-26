// Bharat by Numbers — the hand-in program (Node 22, standard library only).
// It copies the static site (app/) and its screenshots (screenshots/) beside this
// file into the output directory, then writes dossier.json with the kit's
// vendored library, exactly as the scorer rebuilds it. vendor/makefun-frontend.ts
// is the kit's copy, unchanged.
import { existsSync } from "node:fs";
import { copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

async function copyTree(src: string, dest: string): Promise<void> {
  await mkdir(dest, { recursive: true });
  for (const name of await readdir(src)) {
    const from = join(src, name);
    const to = join(dest, name);
    const info = await stat(from);
    if (info.isDirectory()) {
      await copyTree(from, to);
    } else {
      await copyFile(from, to);
    }
  }
}

await mkdir(out, { recursive: true });
await copyTree(join(here, "app"), join(out, "app"));
if (existsSync(join(here, "screenshots"))) {
  await copyTree(join(here, "screenshots"), join(out, "screenshots"));
}

const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
await writeFile(join(out, "dossier.json"), dossier);
const shots = await readdir(join(out, "screenshots"));
console.log(`dossier.json: ${dossier.length} bytes; screenshots: ${shots.length}`);
