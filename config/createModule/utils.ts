const fs = require('fs')
const path = require('path')
const colors = require('colors-console')

export function copyFolder(from: string, to: string): void {
  const fromPath = path.resolve(from)
  const toPath = path.resolve(to)
  fs.access(toPath, function (err) {
    if (err) {
      fs.mkdirSync(toPath)
    }
  })
  fs.readdir(fromPath, function (err, paths) {
    if (err) {
      console.log(err)
      return
    }
    paths.forEach(function (item) {
      const newFromPath = fromPath + '/' + item
      const newToPath = path.resolve(toPath + '/' + item)

      fs.stat(newFromPath, function (err, stat) {
        if (err) return
        if (stat.isFile()) {
          copyFile(newFromPath, newToPath)
        }
        if (stat.isDirectory()) {
          copyFolder(newFromPath, newToPath)
        }
      })
    })
  })
}

export function copyFile(from, to): void {
  fs.copyFileSync(from, to)
}

export const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr)
}

export const log = {
  error: (txt) => console.error(colors('red', txt)),
  warning: (txt) => console.error(colors('yellow', txt)),
  info: (txt) => console.error(colors('cyan', txt)),
  default: (txt) => console.error(colors('bright', txt)),
  success: (txt) => console.error(colors('green', txt))
}

export const templatePath = pathResolve('../template')
export const disPath = (moduleName) => pathResolve('../../src/' + moduleName)

export function deleteFolder(url: string): void {
  let files = []
  if (fs.existsSync(url)) {
    files = fs.readdirSync(url)
    files.forEach(function (file, index) {
      const curPath = path.join(url, file)
      log.error(curPath)
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(url)
  } else {
    log.error('Sai đường dẫn!')
  }
}

export const firstLetterUpperCase = (str) => {
  str = str.toString()
  return str.replace(str[0], str[0].toUpperCase())
}

export function modifyIndexVue(type, moduleName): void {
  const filePath = disPath(type + '/' + moduleName + '/index.vue')
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) throw err
    data = data.replace(/\${class}/g, firstLetterUpperCase(moduleName))
    fs.writeFileSync(filePath, data, 'utf8', (err) => {
      if (err) throw err
      console.log('success done')
    })
  })
}
