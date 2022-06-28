const packageFile = require('./../package.json')
const version = packageFile.version
const platform = process.argv.find(arg => arg.match('platform')).split('=')[1]
const builder = require('electron-builder')
const Platform = builder.Platform
const Arch = builder.Arch

function toArch (platform) {
  switch (platform) {
    case 'amd64':
      return Arch.x64
    case 'armhf':
      return Arch.armv7l
    case 'arm64':
      return Arch.arm64
    default:
      return Arch.universal
  }
}

require('./createPackage.js')('linux', { arch: toArch(platform) }).then(function (path) {
  var installerOptions = {
    artifactName: 'darkfang-${version}-${arch}.deb',
    packageName: 'darkfang',
    icon: 'icons/icon256.png',
    category: 'Network;WebBrowser',
    packageCategory: 'Network',
    mimeTypes: ['x-scheme-handler/http', 'x-scheme-handler/https', 'text/html'],
    maintainer: 'rav3ndust <rav3ndust@tutanota.com',
    description: 'Darkfang is a quick and minimal ad and tracker-blocking web browser built with you in mind.',
    synopsis: 'A web browser with smarter search, improved tab management, and built-in ad blocking. Includes full-text history search, built-in Neeva search, the ability to split tabs into groups, and more.',
    depends: [
      'libsecret-1-dev',
      'gconf2',
      'gconf-service',
      'libasound2',
      'libc6',
      'libcap2',
      'libgtk2.0-0',
      'libudev0 | libudev1',
      'libgcrypt11 | libgcrypt20',
      'libnotify4',
      'libnss3',
      'libxss1',
      'libxtst6',
      'python | python3',
      'xdg-utils'
    ],
    afterInstall: 'resources/postinst_script',
    afterRemove: 'resources/prerm_script'
  }

  console.log('Creating package (this may take a while)')

  const options = {
    linux: {
      target: ['deb']
    },
    directories: {
      buildResources: 'resources',
      output: 'dist/app/'
    },
    deb: installerOptions
  }

  builder.build({
    prepackaged: path,
    targets: Platform.LINUX.createTarget(['deb'], toArch(platform)),
    config: options
  })
    .then(() => console.log('Successfully created package.'))
    .catch(err => {
      console.error(err, err.stack)
      process.exit(1)
    })
})
