import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const cert = fileURLToPath(new URL('../certificates/localhost.pem', import.meta.url));
const key = fileURLToPath(new URL('../certificates/localhost-key.pem', import.meta.url));
if (!existsSync(cert) || !existsSync(key)) {
 console.error('Local HTTPS certificates are missing. Follow the HTTPS setup in README.md.');
 process.exit(1);
}
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '-H', '127.0.0.1', '-p', '5174', '--experimental-https', '--experimental-https-cert', cert, '--experimental-https-key', key, '--experimental-https-ca', cert], {
 stdio: 'inherit', env: { ...process.env, APP_ORIGIN: 'https://localhost:5174', NODE_EXTRA_CA_CERTS: cert },
});
// Keep existing local bookmarks working; all app traffic goes to HTTPS.
const redirect = createServer((request, response) => {
 const path = new URL(request.url || '/', 'http://localhost').pathname;
 const search = new URL(request.url || '/', 'http://localhost').search;
 response.writeHead(307, { Location: `https://localhost:5174${path}${search}`, 'Cache-Control': 'no-store' });
 response.end();
});
redirect.listen(5173, '127.0.0.1');
redirect.on('error', error => { console.error(error.message); child.kill(); });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { redirect.close(); child.kill(signal); });
child.on('exit', code => { redirect.close(); process.exitCode = code || 0; });
