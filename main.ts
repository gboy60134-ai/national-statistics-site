// Bharat by Numbers v2 — the hand-in program (Node 22, standard library only).
//
// What it does, in order:
//   1. Works out where this file lives and where the output goes
//      (MAKEFUN_OUTPUT_DIR outside the grader, /output inside it).
//   2. Copies the whole site (app/) and its screenshots (screenshots/) over.
//   3. Checks every screenshot is a real PNG or JPEG under the 256 KiB cap.
//   4. Writes dossier.json with the kit's own library, vendor/makefun-frontend.ts,
//      which is copied from the kit unchanged and never edited.
//   5. Reads the dossier back and reports the byte counts, so a bad run is loud.
//
// The grader runs this twice from an arbitrary working directory with /bot
// read-only, so nothing here writes anywhere but the output directory, and
// every path is built from this file's own location, never from process.cwd().

import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const SHOT_LIMIT = 262144; // 256 KiB, the scorer's cap on each screenshot

function fail(message) {
  throw new Error('hand-in failed: ' + message);
}

async function countFiles(dir) {
  let total = 0;
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, name.name);
    total += name.isDirectory() ? await countFiles(path) : 1;
  }
  return total;
}

async function checkShots(dir) {
  const names = (await readdir(dir)).filter((n) => !n.startsWith('.')).sort();
  if (names.length < 3 || names.length > 4) {
    fail('expected 3 or 4 screenshots, found ' + names.length);
  }
  for (const name of names) {
    const path = join(dir, name);
    const bytes = await readFile(path);
    if (bytes.length > SHOT_LIMIT) fail(name + ' is ' + bytes.length + ' bytes, over the 256 KiB cap');
    const png = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
    const jpg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (!png && !jpg) fail(name + ' is neither a PNG nor a JPEG');
    console.log('shot ' + name + ' ' + bytes.length + ' bytes');
  }
  return names.length;
}

async function handIn() {
  const root = dirname(fileURLToPath(import.meta.url));
  const out = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
  if (out === '/') fail('refusing to use / as the output directory');

  await mkdir(out, { recursive: true });
  // Clear the output directory's contents without removing the directory
  // itself: in the grader /output is a mounted volume, and removing a mount
  // point fails with EBUSY (that is what killed the first submission's
  // grade run). The grader hands us an empty /output anyway.
  for (const name of await readdir(out)) {
    await rm(join(out, name), { recursive: true, force: true });
  }
  await cp(join(root, 'app'), join(out, 'app'), { recursive: true });
  await cp(join(root, 'screenshots'), join(out, 'screenshots'), { recursive: true });

  const appFiles = await countFiles(join(out, 'app'));
  const shots = await checkShots(join(out, 'screenshots'));

  const dossier = buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: SHOT_LIMIT },
    app_max_files: 993,
    app_max_bytes: 16777216,
  });
  const dossierPath = join(out, 'dossier.json');
  await writeFile(dossierPath, dossier);
  // Read it back and make sure it is the JSON the library wrote, not a
  // truncated or empty file: a bad dossier is caught here, not by the scorer.
  const written = await readFile(dossierPath, 'utf8');
  const parsed = JSON.parse(written);
  if (parsed.schema !== 'makefun/dossier/v1') fail('dossier has the wrong schema: ' + parsed.schema);
  const dossierBytes = Buffer.byteLength(written);
  console.log('dossier ' + dossierBytes + ' bytes, schema ' + parsed.schema + ', ' + (parsed.images?.length ?? 0) + ' images listed');
  console.log('handed in: ' + appFiles + ' app files, ' + shots + ' screenshots, dossier ' + dossierBytes + ' bytes');
}

handIn().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
});
