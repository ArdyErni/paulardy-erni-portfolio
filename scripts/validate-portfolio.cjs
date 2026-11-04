const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const configPath = path.join(root, 'tsconfig.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
// Check the typed content boundary independently of unrelated application errors.
const program = ts.createProgram([path.join(root, 'src/lib/portfolio.ts')], {
  ...parsed.options,
  incremental: false,
  noEmit: true,
});
const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCurrentDirectory: () => root,
    getCanonicalFileName: file => file,
    getNewLine: () => '\n',
  }));
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(path.join(root, 'src/data/portfolio.json'), 'utf8'));
const current = data.experience.find(entry => entry.id === data.profile.currentExperienceId);
assert.ok(current?.roles.length, 'profile.currentExperienceId must reference an experience with a role');
assert.ok(data.education.length, 'At least one education record is needed for the About Me education fact');
assert.ok(data.expertise.featuredProject === '' || data.projects.some(project => project.id === data.expertise.featuredProject), 'expertise.featuredProject must reference a project ID');
for (const key of ['experience', 'projects', 'gear', 'process']) {
  const ids = data[key].map(item => item.id);
  assert.equal(new Set(ids).size, ids.length, `Duplicate ${key} IDs`);
  assert.ok(ids.every(Boolean), `Every ${key} entry needs an ID`);
}
for (const value of [data.profile.socials.github, data.profile.socials.linkedin, data.profile.socials.website]) {
  assert.match(new URL(value).protocol, /^https?:$/, 'Social URLs must use HTTP(S)');
}
assert.match(data.profile.socials.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid contact email');
const tokens = new Set(['name', 'title', 'location', 'interests', 'currentRole', 'currentOrganization', 'educationInstitution', 'query', 'category']);
const assets = new Set();
function inspect(value) {
  if (Array.isArray(value)) return value.forEach(inspect);
  if (value && typeof value === 'object') return Object.values(value).forEach(inspect);
  if (typeof value !== 'string') return;
  for (const match of value.matchAll(/\{(\w+)\}/g)) assert.ok(tokens.has(match[1]), `Unknown content placeholder: ${match[1]}`);
  if (value.startsWith('/') && /\.[a-z\d]+$/i.test(value)) assets.add(value);
}
inspect(data);
for (const asset of assets) assert.ok(fs.existsSync(path.join(root, 'public', asset.slice(1))), `Missing public asset: ${asset}`);
console.log(`Portfolio content valid: typed structure, references, unique IDs, placeholders, contact links, and ${assets.size} local assets.`);
