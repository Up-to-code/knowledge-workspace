import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, chmodSync } from 'node:fs';

const path = new URL('../.env.local', import.meta.url);
let content = existsSync(path) ? readFileSync(path, 'utf8') : readFileSync(new URL('../.env.example', import.meta.url), 'utf8');
for (const key of ['NEON_AUTH_COOKIE_SECRET', 'AGENT_TOKEN_SECRET']) {
  const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
  if (match && match[1].trim()) continue;
  const line = `${key}=${randomBytes(32).toString('hex')}`;
  content = match ? content.replace(new RegExp(`^${key}=.*$`, 'm'), line) : `${content}\n${line}\n`;
}
writeFileSync(path, content, { mode: 0o600 });
chmodSync(path, 0o600);
console.log('Local secrets are ready in .env.local. Add your Neon connection and model credentials there.');
