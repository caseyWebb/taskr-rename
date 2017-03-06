import fs from 'fs'
import path from 'path'
import test from 'ava'
import Fly from 'fly'

const foo = path.resolve(__dirname, 'fixtures/foo.js')
const tmp = path.resolve(__dirname, '.tmp/object')

test('fly-rename w/ object', async (t) => {
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

        t.true(fs.existsSync(path.resolve(__dirname, '.tmp/object/dir/name/prefix-basename-suffix.ext')))
      }
    }
  })

  await fly.start('rename')
})
