const builder = require('electron-builder')
const packageFile = require('./../package.json')
const version = packageFile.version
const Platform = builder.Platform
const Arch = builder.Arch

require('./createPackage.js')('linux', {arch: Arch.x64}).then(function (path) {
  const options = {
    linux: {
      target: ['AppImage'],
      icon: 'icons/icon256.png',
      category: 'Network',
      packageCategory: 'Network',
      mimeTypes: ['x-scheme-handler/http', 'x-scheme-handler/https', 'text/html'],
      synopsis: 'Darkfang is a quick, minimal ad and tracking-blocking browser with your privacy in mind.',
      description: 'A web browser with smarter search, improved tab management, and built-in ad blocking. Includes full-text history search, built-in Neeva search, the ability to split tabs into groups, and more.',
      maintainer: 'rav3ndust <rav3ndust@tutanota.com',
    },
    directories: {
      output: 'dist/app/'
    },
  }

  builder.build({
    prepackaged: path,
    targets: Platform.LINUX.createTarget(['AppImage'], Arch.x64),
    config: options
  })
})
