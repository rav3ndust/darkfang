var regedit = require('regedit')

var installPath = process.execPath

var keysToCreate = [
  'HKCU\\Software\\Classes\\Darkfang',
  'HKCU\\Software\\Classes\\Darkfang\\Application',
  'HKCU\\Software\\Classes\\Darkfang\\DefaulIcon',
  'HKCU\\Software\\Classes\\Darkfang\\shell\\open\\command',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\Capabilities\\FileAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\Capabilities\\StartMenu',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\Capabilities\\URLAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\DefaultIcon',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\InstallInfo',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\shell\\open\\command'
]

var registryConfig = {
  'HKCU\\Software\\RegisteredApplications': {
    Darkfang: {
      value: 'Software\\Clients\\StartMenuInternet\\Darkfang\\Capabilities',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\Darkfang': {
    default: {
      value: 'Darkfang Browser Document',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Classes\\Darkfang\\Application': {
    ApplicationIcon: {
      value: installPath + ',0',
      type: 'REG_SZ'
    },
    ApplicationName: {
      value: 'Darkfang',
      type: 'REG_SZ'
    },
    AppUserModelId: {
      value: 'Darkfang',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\Darkfang\\DefaulIcon': {
    ApplicationIcon: {
      value: installPath + ',0',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\Darkfang\\shell\\open\\command': {
    default: {
      value: '"' + installPath + '" "%1"',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Classes\\.htm\\OpenWithProgIds': {
    Darkfang: {
      value: 'Empty',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Classes\\.html\\OpenWithProgIds': {
    Darkfang: {
      value: 'Empty',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\Capabilities\\FileAssociations': {
    '.htm': {
      value: 'Darkfang',
      type: 'REG_SZ'
    },
    '.html': {
      value: 'Darkfang',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\Capabilities\\StartMenu': {
    StartMenuInternet: {
      value: 'Darkfang',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\Capabilities\\URLAssociations': {
    http: {
      value: 'Darkfang',
      type: 'REG_SZ'
    },
    https: {
      value: 'Darkfang',
      type: 'REG_SZ'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\DefaultIcon': {
    default: {
      value: installPath + ',0',
      type: 'REG_DEFAULT'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\InstallInfo': {
    IconsVisible: {
      value: 1,
      type: 'REG_DWORD'
    }
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Darkfang\\shell\\open\\command': {
    default: {
      value: installPath,
      type: 'REG_DEFAULT'
    }
  }
}

var registryInstaller = {
  install: function () {
    return new Promise(function (resolve, reject) {
      regedit.createKey(keysToCreate, function (err) {
        regedit.putValue(registryConfig, function (err) {
          if (err) {
            reject()
          } else {
            resolve()
          }
        })
      })
    })
  },
  uninstall: function () {
    return new Promise(function (resolve, reject) {
      regedit.deleteKey(keysToCreate, function (err) {
        if (err) {
          reject()
        } else {
          resolve()
        }
      })
    })
  }
}
