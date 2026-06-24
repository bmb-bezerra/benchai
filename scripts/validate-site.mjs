#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";

const repoRoot = resolve(new URL("..", import.meta.url).pathname);
const siteRoot = join(repoRoot, "site");
const baseUrl = "https://bmb-bezerra.github.io/benchai/";
const assetVersion = "20260624-sidebar-v1";
const requiredPages = [
  "index.html",
  "bench-news.html",
  "bench-recomenda.html",
  "bench-data.html",
  "fontes.html",
  "404.html",
  "modelos.html",
  "ides.html",
  "benchmarks.html",
  "recomendador.html"
];

const issues = [];
const warnings = [];

function fail(message) {
  issues.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readSiteFile(relativePath) {
  return readFileSync(join(siteRoot, relativePath), "utf8");
}

function isExternalUrl(value) {
  return /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(value);
}

function stripUrl(value) {
  return value.split("#")[0].split("?")[0];
}

function localTargetExists(fromFile, value) {
  const clean = stripUrl(value);
  if (!clean || clean === "./") return true;
  if (clean.startsWith("/")) return existsSync(join(siteRoot, clean.slice(1)));
  return existsSync(join(siteRoot, posix.normalize(posix.join(posix.dirname(fromFile), clean))));
}

for (const page of requiredPages) {
  if (!existsSync(join(siteRoot, page))) fail(`Missing required page: site/${page}`);
}

const htmlFiles = readdirSync(siteRoot)
  .filter(file => file.endsWith(".html"))
  .sort();

for (const file of htmlFiles) {
  const html = readSiteFile(file);

  if (!html.startsWith("<!doctype html>")) fail(`Missing doctype: site/${file}`);
  if (!/<html lang="pt-BR">/.test(html)) fail(`Missing lang pt-BR: site/${file}`);
  if (!/<meta name="viewport"/.test(html)) fail(`Missing viewport: site/${file}`);
  if (!new RegExp(`assets/css/styles\\.css\\?v=${assetVersion}`).test(html)) {
    fail(`Stylesheet cache token is stale or missing: site/${file}`);
  }

  const appIndex = html.indexOf("assets/js/app.js");
  if (appIndex !== -1) {
    const shellIndex = html.indexOf("assets/js/shell.js");
    const dataIndex = html.indexOf("assets/js/data.js");
    if (shellIndex === -1 || shellIndex > appIndex) {
      fail(`shell.js must be loaded before app.js: site/${file}`);
    }
    if (dataIndex === -1 || dataIndex > appIndex) {
      fail(`data.js must be loaded before app.js: site/${file}`);
    }
    if (shellIndex > dataIndex) {
      fail(`shell.js must be loaded before data.js: site/${file}`);
    }
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  for (const id of ids.filter((value, index) => ids.indexOf(value) !== index)) {
    fail(`Duplicate id "${id}": site/${file}`);
  }

  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (value.startsWith("#") || isExternalUrl(value)) continue;
    if (!localTargetExists(file, value)) fail(`Missing local target from site/${file}: ${value}`);
  }
}

const readme = readFileSync(join(repoRoot, "README.md"), "utf8");
for (const match of readme.matchAll(/`site\/([^`]+\.html)`/g)) {
  const page = match[1];
  if (page.includes("*")) continue;
  if (!existsSync(join(siteRoot, page))) fail(`README references missing page: site/${page}`);
}

const sitemap = readSiteFile("sitemap.xml");
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = match[1];
  if (!url.startsWith(baseUrl)) fail(`Sitemap URL is outside expected base: ${url}`);
  const relative = url.slice(baseUrl.length) || "index.html";
  if (!existsSync(join(siteRoot, relative))) fail(`Sitemap references missing page: ${relative}`);
}

try {
  const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard", "site"], {
    cwd: repoRoot,
    encoding: "utf8"
  }).trim();
  if (untracked) {
    warn(`Untracked publish files need git add before commit:\n${untracked}`);
  }
} catch {
  warn("Could not inspect git untracked files.");
}

if (warnings.length) {
  console.warn(warnings.map(message => `WARN: ${message}`).join("\n"));
}

if (issues.length) {
  console.error(issues.map(message => `ERROR: ${message}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files and sitemap.xml.`);
