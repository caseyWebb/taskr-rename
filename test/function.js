import fs from 'fs'
import path from 'path'
import test from 'ava'
import Taskr from 'taskr'

const foo = path.resolve(__dirname, 'fixtures/foo.js')
const tmp = path.resolve(__dirname, '.tmp/function')

test('taskr-rename w/ function', async (t) => {
  t.plan(4)

  const taskr = new Taskr({
    plugins: [
      require('../')
    ],
    tasks: {
      * rename(f) {
        yield f.source(foo)
          .rename((file) => {
            t.is(file.dirname, path.resolve(__dirname, 'fixtures/'), 'renamer function recieves correct dirname')
            t.is(file.basename, 'foo', 'renamer function recieves correct basename')
            t.is(file.extname, '.js', 'renamer function recieves correct extname')

            file.dirname = 'dir/name'
            file.basename = 'bar'
            file.extname = '.html'
          })
          .target(tmp)

        t.true(fs.existsSync(path.resolve(__dirname, '.tmp/function/dir/name/bar.html')))
      }
    }
  })

  await taskr.start('rename')
})
