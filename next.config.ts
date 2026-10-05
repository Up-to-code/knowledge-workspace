import type { NextConfig } from 'next';
import { withEve } from 'eve/next';
const config: NextConfig = { devIndicators: false, distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next', serverExternalPackages: ['pg','playwright'], turbopack: {root:process.cwd()} };
export default withEve(config);
