import fs from 'fs'
import path from 'path'
import test from 'ava'
import Taskr from 'taskr'

const foo = path.resolve(__dirname, 'fixtures/foo.js')

test('taskr-rename w/ object', async (t) => {
  const tmp = path.resolve(__dirname, '.tmp/object/1')

  t.plan(1)

  const taskr = new Taskr({
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

  await taskr.start('rename')
})

test('taskr-rename w/ object preserves dirname, basename, extname when not supplied', async (t) => {
  const tmp = path.resolve(__dirname, '.tmp/object/2')

  t.plan(1)

  const taskr = new Taskr({
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

  await taskr.start('rename')
})

test('taskr-rename w/ object works without prefix, suffix', async (t) => {
  const tmp = path.resolve(__dirname, '.tmp/object/3')

  t.plan(1)

  const taskr = new Taskr({
    plugins: [
      require('../')
    ],
    tasks: {
      * rename(f) {
        yield f.source(foo)
          .rename({
            basename: 'bar'
          })
          .target(tmp)

        t.true(fs.existsSync(path.resolve(__dirname, '.tmp/object/3/bar.js')))
      }
    }
  })

  await taskr.start('rename')
})
