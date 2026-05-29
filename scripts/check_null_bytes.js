#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const allowedExt = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.md']);
const ignoreDirs = new Set(['.git', 'node_modules', 'dist', 'release', 'test-results']);
let hadNull = false;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (ignoreDirs.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    const ext = path.extname(name);
    if (!allowedExt.has(ext)) continue;

    const buf = fs.readFileSync(full);
    if (buf.includes(0)) {
      console.error('Null byte found in', full);
      hadNull = true;
    }
  }
}

walk(process.cwd());
if (hadNull) process.exit(2);
console.log('No null bytes found');

