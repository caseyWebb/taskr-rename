'use strict'

const fs = require('fs')
const path = require('path')
const Taskr = require('taskr')

const foo = path.resolve(__dirname, 'fixtures/foo.js')
const tmp = path.resolve(__dirname, '.tmp/function')

test('taskr-rename w/ function', async () => {
  expect.assertions(4)

  const taskr = new Taskr({
    plugins: [require('../')],
    tasks: {
      *rename(f) {
        yield f
          .source(foo)
          .rename((file) => {
            expect(file.dirname).toBe(path.resolve(__dirname, 'fixtures/'))
            expect(file.basename).toBe('foo')
            expect(file.extname).toBe('.js')

            file.dirname = 'dir/name'
            file.basename = 'bar'
            file.extname = '.html'
          })
          .target(tmp)

        expect(
          fs.existsSync(
            path.resolve(__dirname, '.tmp/function/dir/name/bar.html')
          )
        ).toBeTruthy()
      }
    }
  })

  await taskr.start('rename')
})
