/* Fails the build when the site states a number that the screenshots contradict.
 *
 * Dependency-free on purpose: the site is static with no build step, so this has to
 * run with a bare node. Usage: node tests/check-claims.mjs
 *
 * The bug class this exists for: every number that got shipped wrong on this page
 * looked correct in the markup and was only wrong relative to the phone image
 * printed beside it. A reviewer reading HTML cannot see that. This can.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const facts = JSON.parse(fs.readFileSync(path.join(__dirname, 'facts.json'), 'utf8'));
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let failed = 0;
const fail = (msg) => { console.log('  FAIL  ' + msg); failed++; };
const pass = (msg) => console.log('  PASS  ' + msg);

// ---- 1. hero stats must match the profile screenshot ----
console.log('\nhero stats vs ' + Object.keys(facts.screenshots)[0]);
const hero = html.match(/<dl class="hero__stats">([\s\S]*?)<\/dl>/);
if (!hero) {
  fail('could not find .hero__stats in index.html');
} else {
  for (const stat of facts.hero_stats) {
    const row = hero[1].match(new RegExp('<dt>' + stat.label + '</dt>\\s*<dd>([^<]*)</dd>'));
    if (!row) { fail('hero is missing a "' + stat.label + '" stat'); continue; }
    const actual = row[1].trim();
    if (stat.must_equal !== undefined && actual !== stat.must_equal) {
      fail(stat.label + ' says "' + actual + '" but the screenshot shows ' + stat.must_equal + ' (' + stat.proves + ')');
    } else if (stat.must_contain !== undefined && actual.replace(/[^\d.]/g, '').indexOf(stat.must_contain) === -1) {
      fail(stat.label + ' says "' + actual + '" but the screenshot shows ' + stat.must_contain + ' (' + stat.proves + ')');
    } else {
      pass(stat.label + ' = ' + actual + ' matches the screenshot');
    }
  }
}

// ---- 2. every screenshot referenced by the site must exist ----
console.log('\nscreenshots referenced by the site');
const srcs = [...html.matchAll(/<img[^>]+src="assets\/screens\/([^"]+)"/g)].map((m) => m[1]);
const missing = [...new Set(srcs)].filter((f) => !fs.existsSync(path.join(ROOT, 'assets', 'screens', f)));
if (missing.length) fail('missing screenshot files: ' + missing.join(', '));
else pass(new Set(srcs).size + ' screenshot files all present');

// ---- 3. no fabricated stat that no screenshot supports ----
// A hero stat with a number in it must be either pinned above, or provably
// decorative. Catches someone re-adding "Streak 30 days" style inventions.
console.log('\nno unpinned numeric claims in the hero');
const unpinned = [];
for (const m of hero ? hero[1].matchAll(/<dt>([^<]+)<\/dt>\s*<dd>([^<]*)<\/dd>/g) : []) {
  const label = m[1].trim();
  const hasNumber = /\d/.test(m[2]);
  const isPinned = facts.hero_stats.some((s) => s.label === label);
  if (hasNumber && !isPinned) unpinned.push(label + ' = ' + m[2].trim());
}
if (unpinned.length) {
  fail('these hero stats show a number that no screenshot backs: ' + unpinned.join('; ') +
       '. Add them to tests/facts.json with a source, or drop the number.');
} else {
  pass('every numeric hero stat is pinned to a screenshot');
}

// ---- 4. the licence claim must match reality ----
// KOVA is closed source. If the app ever goes public, this is the line to change.
console.log('\nlicence claims');
const all = ['index.html', 'hevy-alternative.html', 'strong-alternative.html',
             'switch-from-hevy.html', 'README.md', 'llms.txt']
  .map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
if (/GPL|gnu\.org|licenses\/gpl/i.test(all)) {
  fail('a GPL or gnu.org reference is back. KOVA is closed source; remove it or update this test deliberately.');
} else {
  pass('no GPL or gnu.org reference anywhere');
}
if (/SoftwareSourceCode/.test(all)) {
  fail('SoftwareSourceCode is back in the JSON-LD; that asserts public source');
} else {
  pass('no SoftwareSourceCode assertion in the structured data');
}

// ---- 5. permissions must match the manifest block in the same file ----
// Catches the two drifting apart, which is how the site ended up listing four
// while the manifest printed a different set.
console.log('\npermission table vs manifest block');
const block = (html.match(/<pre class="manifest__code">([\s\S]*?)<\/pre>/) || ['', ''])[1];
const blockPerms = [...block.matchAll(/android\.permission\.([A-Z_]+)/g)]
  .map((m) => m[1])
  .filter((p, i, a) => a.indexOf(p) === i && p !== 'INTERNET');
const tablePerms = [...html.matchAll(/<tr><th scope="row"><code>([A-Z_]+)<\/code>/g)]
  .map((m) => m[1])
  .filter((p) => p !== 'INTERNET');
const blockSet = new Set(blockPerms);
const tableSet = new Set(tablePerms);
const onlyBlock = blockPerms.filter((p) => !tableSet.has(p));
const onlyTable = tablePerms.filter((p) => !blockSet.has(p));
if (onlyBlock.length || onlyTable.length) {
  fail('manifest and table disagree. only in manifest: [' + onlyBlock + ']  only in table: [' + onlyTable + ']');
} else {
  pass(blockPerms.length + ' permissions, manifest and table agree');
}
if (blockPerms.length !== 10) {
  fail('expected 10 documented permissions, found ' + blockPerms.length + '. If the app really changed, verify against the APK before editing this number.');
} else {
  pass('permission count is 10');
}

console.log(failed === 0
  ? '\nAll claim checks passed.\n'
  : '\n' + failed + ' claim check(s) failed.\n');
process.exit(failed === 0 ? 0 : 1);
