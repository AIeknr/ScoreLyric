import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function render(worker, path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the ScoreLyric catalog with product metadata", async () => {
  const response = await render(await loadWorker(), "/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /ScoreLyric/);
  assert.match(html, /月亮代表我的心/);
  assert.match(html, /查看歌词/);
  assert.match(html, /搜索歌名、歌手、专辑或歌词片段/);
  assert.doesNotMatch(html, /AI 服务|系统正常/);
  assert.doesNotMatch(html, /Starter Project|codex-preview/);
});

test("renders recognition and removes the AI service route", async () => {
  const worker = await loadWorker();
  const recognize = await render(worker, "/recognize");
  const admin = await render(worker, "/admin/ai-services");
  assert.equal(recognize.status, 200);
  assert.equal(admin.status, 404);
  assert.match(await recognize.text(), /从歌谱提取歌词/);
});
