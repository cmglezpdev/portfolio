// Run with: node scripts/check-section-navigation.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = readFileSync(process.argv[2] ?? new URL('../src/scripts/interactions.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
});

function createPage(width, height, ids, observerAvailable = true) {
  const listeners = new Map();
  const frames = [];
  let scrollY = 0;
  const sections = ids.map((id, index) => ({
    id,
    getBoundingClientRect: () => ({ top: 500 + index * 600 - scrollY, bottom: 1100 + index * 600 - scrollY }),
  }));
  const links = ids.map((id) => {
    const attributes = new Map([['data-nav', id]]);
    return {
      getAttribute: (name) => attributes.get(name) ?? null,
      setAttribute: (name, value) => attributes.set(name, value),
      removeAttribute: (name) => attributes.delete(name),
    };
  });
  const window = {
    innerWidth: width,
    innerHeight: height,
    matchMedia: () => ({ matches: true }),
    addEventListener: (name, callback) => listeners.set(name, callback),
    requestAnimationFrame: (callback) => frames.push(callback),
  };
  // An observer cannot drive selection here: only scroll and resize events do.
  if (observerAvailable) window.IntersectionObserver = class { observe() {} };
  const document = {
    querySelectorAll: (selector) => selector === '[data-nav]' ? links : [],
    querySelector: () => null,
    getElementById: (id) => sections.find((section) => section.id === id),
  };
  runInNewContext(outputText, { window, document, IntersectionObserver: window.IntersectionObserver, HTMLDialogElement: class {} });
  const active = () => links.flatMap((link, index) => link.getAttribute('aria-current') === 'location' ? [ids[index]] : []);
  const emit = (name) => listeners.get(name)?.();
  const flush = () => frames.splice(0).forEach((callback) => callback());
  return { window, frames, active, emit, flush, scrollTo: (position) => { scrollY = position; emit('scroll'); } };
}

for (const [width, height] of [[1200, 900], [390, 844]]) {
  for (const ids of [['experience', 'work'], ['overview', 'implementation']]) {
    for (const observerAvailable of [true, false]) {
      const page = createPage(width, height, ids, observerAvailable);
      const readingPoint = height * 0.35;
      assert.deepEqual(page.active(), [], 'hero has no active section');
      page.scrollTo(500 - readingPoint - 1);
      page.flush();
      assert.deepEqual(page.active(), [], 'section is inactive just before the reading point');
      page.scrollTo(500 - readingPoint);
      page.flush();
      assert.deepEqual(page.active(), [ids[0]], 'section activates exactly at the reading point');
      page.scrollTo(1100 - readingPoint);
      page.emit('scroll');
      page.emit('scroll');
      assert.equal(page.frames.length, 1, 'scroll events share one pending animation frame');
      page.flush();
      assert.deepEqual(page.active(), [ids[1]], 'boundary clears the first section and activates the next');
      page.scrollTo(1800);
      page.flush();
      assert.deepEqual(page.active(), [], 'jump past all sections clears selection');
      page.scrollTo(400);
      page.flush();
      assert.deepEqual(page.active(), [ids[0]], 'upward jump recomputes selection');
      page.scrollTo(0);
      page.flush();
      assert.deepEqual(page.active(), [], 'return to hero clears selection');
      page.window.innerHeight = 1600;
      page.emit('resize');
      page.flush();
      assert.deepEqual(page.active(), [ids[0]], 'resize uses the new viewport height');
    }
  }
}
console.log('Section navigation checks passed for desktop and phone, homepage and project links, with and without IntersectionObserver.');
