import { LangFile, I18nMsg } from './types'
import { firstLetterIsUpperCase } from './util'

export function genLangs(
  module: Record<string, any>,
  include: Array<string> | null,
  exclude?: string
) {
  const obj = {}
  Object.keys(module).forEach((item) => {
    const content: LangFile = module[item].default
    if (!content) {
      throw new Error('Please export default in ' + item)
    }
    let path
    if (include?.length) {
      path = item.replace(/^\/src\//, '')
      include?.forEach((e) => {
        path = path.replace(`${e}/`, '')
      })
    } else {
      path = item
        .replace(/^\.\.\//, '')
        .replace(/^\.\//, '')
        .replace(`${exclude}/`, '')
    }
    path = path.replace(/\/lang/, '').split('.')[0]
    const names = path.split('/')
    names.pop() as string
    reduceArr(obj, names, replaceDot(content))
  })
  return obj
}

function reduceArr(o, arr, cb) {
  arr.reduce((total, val, index) => {
    if (firstLetterIsUpperCase(val)) {
      val = val.replace(val[0], val[0].toLowerCase())
    }
    if (index === arr.length - 1) {
      try {
        total[val] = cb
      } catch (error) {
        const all = arr.join('.')
        arr.pop()
        console.error(arr.join('.') + all)
      }
      return total[val]
    }
    return total[val] || (total[val] = {})
  }, o)
}

function replaceDot(c: LangFile) {
  const o: I18nMsg = {}
  for (const k in c) {
    if (k.includes('.')) {
      const arr = k.split('.')
      reduceArr(o, arr, c[k])
    } else {
      o[k] = c[k]
    }
  }
  return o
}

export const getRoutePages = () => {
  const pages = import.meta.glob('/src/views/**/*.vue')
  const files = {}
  for (const p in pages) {
    const name = getFileName(p)
    if (name) {
      files[name] = pages[p]
    }
  }
  return files
}

const getFileName = (path: string) => {
  if (path.indexOf('components') > 0) {
    return false
  }
  const pattern = /\/(\w*)\.vue/
  const matched = path.match(pattern)
  if (!matched) {
    throw new Error('path is not right:' + path)
  }
  if (matched[1] === 'index') {
    const fileArr = path.split('/')
    const len = fileArr.length
    const routeName = fileArr[len - 2]
    return routeName
  }
  return matched[1]
}
