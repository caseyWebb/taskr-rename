import fs from 'fs'
import path from 'path'
import test from 'ava'
import Taskr from 'taskr'

const foo = path.resolve(__dirname, 'fixtures/foo.js')

test('gh-3 / old extname should be replaced', async (t) => {
  const tmp = path.resolve(__dirname, '.tmp/issues/3')

  t.plan(1)

  const taskr = new Taskr({
    plugins: [
      require('../')
    ],
    tasks: {
      * rename(f) {
        yield f.source(foo)
          .rename({
            extname: '.es6'
          })
          .target(tmp)

        t.true(fs.existsSync(path.resolve(__dirname, '.tmp/issues/3/foo.es6')))
      }
    }
  })

  await taskr.start('rename')
})