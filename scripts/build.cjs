const { spawnSync } = require('node:child_process');

// Preserve the former production override without shell-specific environment syntax.
const result = spawnSync(process.execPath, [
  require.resolve('next/dist/bin/next'),
  'build',
  ...process.argv.slice(2),
], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' },
});

if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
