import { $ } from 'bun';

async function build() {
  await $`mkdir -p ./dist`;

  // Build ESM
  await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'node',
    format: 'esm',
    naming: '[dir]/[name].mjs',
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development' ? 'external' : 'none',
  });

  // Build CJS
  await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'node',
    format: 'cjs',
    naming: '[dir]/[name].js',
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development' ? 'external' : 'none',
  });
}

build().catch(console.error);
