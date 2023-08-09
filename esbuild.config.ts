import * as esbuild from 'esbuild'
import minimist from 'minimist'
import { dtsPlugin } from 'esbuild-plugin-d.ts'

const argv = minimist(process.argv.slice(2))
const context = await esbuild.context({
    bundle: true,
    entryPoints: [`src/index.ts`],
    minify: true,
    outdir: argv.outdir,
    plugins: [dtsPlugin()],
    sourcemap: true,
    target: [`chrome60`, `firefox60`, `safari11`, `edge18`, `node10`],
})

if (argv.watch) {
    await context.watch()
    console.log(`Watching...`)
} else {
    await context.rebuild()
    await context.dispose()
}
