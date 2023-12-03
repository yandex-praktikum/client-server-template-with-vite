//eslint-disable-next-line
const fs = require('fs');

fs.copyFileSync('.env.sample', '.env');

fs.mkdirSync('tmp/pgdata', { recursive: true });
