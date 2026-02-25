#!/usr/bin/env node
/**
 * Regenerates photography-data.js from photography-data.json.
 * Run: node build-photography-data.js
 * Watch (auto-regenerate on save): node build-photography-data.js --watch
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const JSON_PATH = path.join(DIR, 'photography-data.json');
const JS_PATH = path.join(DIR, 'photography-data.js');

const HEADER = '// Auto-generated from photography-data.json — do not edit. Run: node build-photography-data.js\n' +
  '// Used when the page is opened via file:// (fetch blocked by CORS).\n' +
  'window.__PHOTO_DATA__ = ';

function build() {
  try {
    const raw = fs.readFileSync(JSON_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    const jsonStr = JSON.stringify(parsed);
    const out = HEADER + jsonStr + ';\n';
    fs.writeFileSync(JS_PATH, out, 'utf8');
    console.log('[build-photography-data] Updated photography-data.js');
  } catch (err) {
    console.error('[build-photography-data] Error:', err.message);
    process.exitCode = 1;
  }
}

const isWatch = process.argv.includes('--watch');
if (isWatch) {
  build();
  console.log('[build-photography-data] Watching photography-data.json — save the file to regenerate .js (Ctrl+C to stop)\n');

  let debounceTimer = null;
  const DEBOUNCE_MS = 200;

  fs.watch(JSON_PATH, function (event, filename) {
    if (!filename || event !== 'change') return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      debounceTimer = null;
      build();
    }, DEBOUNCE_MS);
  });
} else {
  build();
}
