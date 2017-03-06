<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>
</div>

# fly-rename

> [Rename](https://github.com/caseyWebb/fly-rename) plugin for _[Fly][fly]_.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][travis-badge]][travis-link]
[![][mit-badge]][mit]

## Install

```a
npm install --save-dev fly-rename
```

## Usage

### Object
```js
export default function* (fly) {
  yield fly.source('./src/**/*.js')
    .rename({
      dirname: 'dir/name',
      basename: 'basename',
      prefix: 'prefix-',
      suffix: '-suffix',
      extname: '.ext'
    })
    .target('./dist')

    // .dist/dir/name/prefix-basename-suffix.ext
}
```

### Function
```js
export default function* (fly) {
  yield fly.source('./src/**/*.js')
    .rename((path) => {
      // path === ./src/foo/bar.js
      return 'dir/name/prefix-basename-suffix.ext'
    })
    .target('./dist')

    // .dist/dir/name/prefix-basename-suffix.ext
}
```

## License

[MIT][mit] © [Casey Webb][author]


[mit]:          http://opensource.org/licenses/MIT
[author]:       http://github.com/caseyWebb
[releases]:     https://github.com/caseyWebb/fly-rename/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[mit-badge]:    https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-rename
[npm-ver-link]: https://img.shields.io/npm/v/fly-rename.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-rename.svg?style=flat-square
[travis-link]:  https://travis-ci.org/caseyWebb/fly-rename
[travis-badge]: http://img.shields.io/travis/caseyWebb/fly-rename.svg?style=flat-square
