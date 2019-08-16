/* eslint-disable require-yield */

'use strict'

const path = require('path')

module.exports = function(task) {
  task.plugin('rename', { every: true }, function*(file, opts) {
    if (typeof opts === 'function') {
      const dirname = file.dir
      const extname = path.extname(file.base)
      const basename = path.basename(file.base, extname)

      // values should be modified by reference
      const f = { dirname, extname, basename }
      opts(f)

      file.dir = path.resolve(dirname, f.dirname)
      file.base = f.basename + f.extname
    } else {
      const oldextname = path.extname(file.base)
      const oldbasename = path.basename(file.base, oldextname)

      const dir = opts.dirname || ''
      const prefix = opts.prefix || ''
      const suffix = opts.suffix || ''
      const extname = opts.extname || oldextname
      const basename = opts.basename || oldbasename

      file.dir = path.join(file.dir, dir)
      file.base = prefix + basename + suffix + extname
    }
  })
}
