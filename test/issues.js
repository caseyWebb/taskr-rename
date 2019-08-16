'use strict'

const fs = require('fs')
const path = require('path')
const Taskr = require('taskr')

const foo = path.resolve(__dirname, 'fixtures/foo.js')

test('gh-3 / old extname should be replaced', async () => {
  const tmp = path.resolve(__dirname, '.tmp/issues/3')

  expect.assertions(1)

  const taskr = new Taskr({
    plugins: [require('../')],
    tasks: {
      *rename(f) {
        yield f
          .source(foo)
          .rename({
            extname: '.es6'
          })
          .target(tmp)

        expect(
          fs.existsSync(path.resolve(__dirname, '.tmp/issues/3/foo.es6'))
        ).toBeTruthy()
      }
    }
  })

  await taskr.start('rename')
})
