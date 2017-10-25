# taskr-rename
> Rename plugin for [Taskr][]

*NOTE:* This repository has been renamed from fly-rename to taskr-rename. If you haven't yet migrated to [Taskr][], now is the time to do so.

[![NPM][npm-shield]][npm]
[![License][license-shield]][license]
[![Build Status][travis-ci-shield]][travis-ci]
[![Coverage Status][codecov-shield]][codecov]
[![Dependency Status][david-dm-shield]][david-dm]

## Install

```yarn
$ yarn add -D taskr taskr-rename
```
*or*
```bash
$ npm install --save-dev taskr taskr-rename
```

## Usage

### Object
```js
export default function* (task) {
  yield task.source('./src/foo.js')
    .rename({
      dirname: 'dir/name',
      basename: 'bar',
      prefix: 'prefix-',
      suffix: '-suffix',
      extname: '.html'
    })
    .target('./dist')

    // .dist/dir/name/prefix-bar-suffix.html
}
```

### Function
```js
export default function* (task) {
  yield task.source('./src/foo.js')
    .rename((file) => {
      file.dirname = 'dir/name'
      file.basename = 'bar'
      file.extname = '.html'
    })
    .target('./dist')

    // .dist/dir/name/bar.html
}
```

[Taskr]: https://github.com/lukeed/taskr

[npm]: https://npmjs.com/package/taskr-rollup
[npm-shield]: https://img.shields.io/npm/v/taskr-rollup.svg

[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/taskr-rollup.svg

[travis-ci]: https://travis-ci.org/caseyWebb/taskr-rollup/
[travis-ci-shield]: https://img.shields.io/travis/caseyWebb/taskr-rollup/master.svg

[codecov]: https://codecov.io/gh/caseyWebb/taskr-rollup
[codecov-shield]: https://img.shields.io/codecov/c/github/caseyWebb/taskr-rollup.svg

[david-dm]: https://david-dm.org/caseyWebb/taskr-rollup#type=peer
[david-dm-shield]: https://img.shields.io/david/peer/caseyWebb/taskr-rollup.svg
