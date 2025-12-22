import type { BunPlugin } from 'bun';
import { $ } from 'bun';
import { isolatedDeclaration } from 'oxc-transform';

function getDtsBunPlugin(): BunPlugin {
  const wroteTrack = new Set<string>();
  return {
    name: 'oxc-transform-dts',
    setup(builder) {
      if (builder.config.root && builder.config.outdir) {
        const rootPath = Bun.pathToFileURL(builder.config.root).pathname;
        const outPath = Bun.pathToFileURL(builder.config.outdir).pathname;
        builder.onStart(() => wroteTrack.clear());
        builder.onLoad({ filter: /\.ts$/ }, async (args) => {
          if (args.path.startsWith(rootPath) && !wroteTrack.has(args.path)) {
            wroteTrack.add(args.path);
            const code = await isolatedDeclaration(args.path, await Bun.file(args.path).text());

            await Bun.write(
              args.path.replace(new RegExp(`^${rootPath}`), outPath).replace(/\.ts$/, '.d.ts'),
              code.code
            );
          }
          return undefined;
        });
      }
    },
  };
}

async function build() {
  await $`mkdir -p ./dist`;

  // Build ESM
  await Bun.build({
    entrypoints: ['src/index.ts'],
    root: 'src',
    outdir: 'dist',
    target: 'node',
    format: 'esm',
    naming: '[dir]/[name].mjs',
    plugins: [getDtsBunPlugin()],
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development' ? 'external' : 'none',
  });

  // Build CJS
  await Bun.build({
    entrypoints: ['src/index.ts'],
    root: 'src',
    outdir: 'dist',
    target: 'node',
    format: 'cjs',
    naming: '[dir]/[name].js',
    plugins: [getDtsBunPlugin()],
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV === 'development' ? 'external' : 'none',
  });
}

await build();
