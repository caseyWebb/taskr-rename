'use strict'

const fs = require('fs')
const path = require('path')
const Taskr = require('taskr')

const foo = path.resolve(__dirname, 'fixtures/foo.js')

test('taskr-rename w/ object', async () => {
  const tmp = path.resolve(__dirname, '.tmp/object/1')

  expect.assertions(1)

  const taskr = new Taskr({
    plugins: [require('../')],
    tasks: {
      *rename(f) {
        yield f
          .source(foo)
          .rename({
            dirname: 'dir/name',
            basename: 'basename',
            prefix: 'prefix-',
            suffix: '-suffix',
            extname: '.ext'
          })
          .target(tmp)

        expect(
          fs.existsSync(
            path.resolve(
              __dirname,
              '.tmp/object/1/dir/name/prefix-basename-suffix.ext'
            )
          )
        ).toBeTruthy()
      }
    }
  })

  await taskr.start('rename')
})

test('taskr-rename w/ object preserves dirname, basename, extname when not supplied', async () => {
  const tmp = path.resolve(__dirname, '.tmp/object/2')

  expect.assertions(1)

  const taskr = new Taskr({
    plugins: [require('../')],
    tasks: {
      *rename(f) {
        yield f
          .source(foo)
          .rename({
            prefix: 'prefix-',
            suffix: '-suffix'
          })
          .target(tmp)

        expect(
          fs.existsSync(
            path.resolve(__dirname, '.tmp/object/2/prefix-foo-suffix.js')
          )
        ).toBeTruthy()
      }
    }
  })

  await taskr.start('rename')
})

test('taskr-rename w/ object works without prefix, suffix', async () => {
  const tmp = path.resolve(__dirname, '.tmp/object/3')

  expect.assertions(1)

  const taskr = new Taskr({
    plugins: [require('../')],
    tasks: {
      *rename(f) {
        yield f
          .source(foo)
          .rename({
            basename: 'bar'
          })
          .target(tmp)

        expect(
          fs.existsSync(path.resolve(__dirname, '.tmp/object/3/bar.js'))
        ).toBeTruthy()
      }
    }
  })

  await taskr.start('rename')
})
