import fs from 'fs'
import path from 'path'
import test from 'ava'
import Fly from 'fly'

const foo = path.resolve(__dirname, 'fixtures/foo.js')

test('fly-rename w/ object', async (t) => {
  const tmp = path.resolve(__dirname, '.tmp/object/1')

  t.plan(1)

  const fly = new Fly({
    plugins: [
      require('../')
    ],
    tasks: {
      * rename(f) {
        yield f.source(foo)
          .rename({
            dirname: 'dir/name',
            basename: 'basename',
            prefix: 'prefix-',
            suffix: '-suffix',
            extname: '.ext'
          })
          .target(tmp)

        t.true(fs.existsSync(path.resolve(__dirname, '.tmp/object/1/dir/name/prefix-basename-suffix.ext')))
      }
    }
  })

  await fly.start('rename')
})

test('fly-rename w/ object preserves dirname, basename, extname when not supplied', async (t) => {
  const tmp = path.resolve(__dirname, '.tmp/object/2')

  t.plan(1)

  const fly = new Fly({
    plugins: [
      require('../')
    ],
    tasks: {
      * rename(f) {
        yield f.source(foo)
          .rename({
            prefix: 'prefix-',
            suffix: '-suffix'
          })
          .target(tmp)

        t.true(fs.existsSync(path.resolve(__dirname, '.tmp/object/2/prefix-foo-suffix.js')))
      }
    }
  })

  await fly.start('rename')
})
