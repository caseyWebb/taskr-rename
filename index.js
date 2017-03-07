'use strict'

const path = require('path')

module.exports = function(fly) {
  fly.plugin('rename', { every: true }, function * (file, opts) { // eslint-disable-line require-yield
    if (typeof opts === 'function') {
      const ret = opts(path.join(file.dir, file.base))
      file.dir = path.join(file.dir, path.dirname(ret))
      file.base = path.basename(ret)
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
        extname = path.join(file.base)
      }
      if (!basename) {
        basename = path.join(file.base, extname)
      }

      file.base = prefix + basename + suffix + extname
    }
  })
}
