import fs from 'fs'
import path from 'path'
import test from 'ava'
import Fly from 'fly'

const foo = path.resolve(__dirname, 'fixtures/foo.js')
const tmp = path.resolve(__dirname, '.tmp/function')

test('fly-rename w/ function', async (t) => {
  t.plan(2)

  const fly = new Fly({
    plugins: [
      require('../')
    ],
    tasks: {
      * rename(f) {
        yield f.source(foo)
          .rename((path) => {
            t.is(path, foo, 'renamer function recieves correct path')
            return 'dir/name/prefix-basename-suffix.ext'
          })
          .target(tmp)

        t.true(fs.existsSync(path.resolve(__dirname, '.tmp/function/dir/name/prefix-basename-suffix.ext')))
      }
    }
  })

  await fly.start('rename')
})
