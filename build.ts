import { build, emptyDir } from 'https://deno.land/x/dnt@0.38.1/mod.ts'

await emptyDir('./npm')

await build({
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  typeCheck: false,
  package: {
    // package.json properties
    name: '@bjorkhaug/sdi',
    version: Deno.args[0],
    description: 'Simple Service Dependency Injection for Deno and Node.js',
    license: 'MIT',
    publishConfig: {
      access: 'public',
      registry: 'https://registry.npmjs.org/',
      scope: '@bjorkhaug',
    },
    dependencies: {
      '@bjorkhaug/sreflect': '^0.0.1',
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/simenbjorkhaug/sdi.git',
    },
    bugs: {
      url: 'https://github.com/simenbjorkhaug/sdi/issues',
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync('README.md', 'npm/README.md')
  },
})
