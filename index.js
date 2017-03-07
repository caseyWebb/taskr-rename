'use strict'

const path = require('path')

module.exports = function(fly) {
  fly.plugin('rename', { every: true }, function * (file, opts) { // eslint-disable-line require-yield
    if (typeof opts === 'function') {
      const dirname = file.dir
      const extname = path.extname(file.base)
      const basename = path.basename(file.base, extname)

      // values should be modified by reference
      const f = { dirname, extname, basename }
      opts(f)

      file.dir = path.join(dirname, f.dirname)
      file.base = f.basename + f.extname
    } else {
      const prefix = opts.prefix || ''
      const suffix = opts.suffix || ''
      const dirname = opts.dirname
      let basename = opts.basename
      let extname = opts.extname

      if (dirname) {
        file.dir = path.join(file.dir, dirname)
      }
      if (!extname) {
        extname = path.extname(file.base)
      }
      if (!basename) {
        basename = path.basename(file.base, extname)
      }

      file.base = prefix + basename + suffix + extname
    }
  })
}
