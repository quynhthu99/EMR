// TODO:使用ts重写
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
class EasyDB {
  constructor(options) {
    const { dbName = 'EasyDB', version = 1 } = options || {}
    const DBOpenRequest = {}
    this.inited = false
    this.dbName = dbName
    this.version = version
    this.db = {}
    this.DBOpenRequest = indexedDB.open(dbName, version)
    this.inited = this.initDB()
  }

  initDB = () => {
    if (!this.inited) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self: never = this
      this.DBOpenRequest.onsuccess = () => {
        self.db = self.DBOpenRequest.result
      }

      this.DBOpenRequest.onupgradeneeded = (event) => {
        const db = event.target.result

        db.onerror = () => {
          throw new Error(`[EasyDB]: Open DB Error`)
        }

        const objectStore = db.createObjectStore(this.dbName, {
          keyPath: 'key',
          autoIncrement: false
        })
        objectStore.createIndex('key', 'key')
        objectStore.createIndex('value', 'value')
      }
      return true
    }
  }

  transaction = () => {
    if (this.db && this.db.transaction && typeof this.db.transaction === 'function') {
      return this.db.transaction(this.dbName, 'readwrite').objectStore(this.dbName)
    }
  }

  set = async (key, value) => {
    const val = await this.get(key)
    if (!val) {
      return await this._add(key, value)
    } else {
      return await this.put(key, value)
    }
  }

  get = (key) => {
    return this.operateDataBase('get', key)
  }

  put = (key, value) => {
    return this.operateDataBase('put', key, value)
  }

  _add = (key, value) => {
    return this.operateDataBase('add', key, value)
  }

  delete = (key) => {
    return this.operateDataBase('delete', key)
  }

  clear = () => {
    return this.operateDataBase('clear')
  }

  readAll = () => {
    return new Promise((resolve, reject) => {
      const transaction = this.transaction()
      const data = []
      transaction.openCursor().onsuccess = function (event) {
        const cursor = event.target.result
        if (cursor) {
          data.push(cursor.value)
          cursor.continue()
        } else {
          resolve(data)
        }
      }
    })
  }

  dbCallback = (transaction, cb, type) => {
    transaction.onsuccess = (event) => {
      ;['clear', 'delete'].includes(type) ? cb(true) : cb(event.target.result)
    }
    transaction.onerror = (event) => {
      throw new Error(`${this.dbName} Error:${event.target.error}`)
    }
  }

  operateDataBase = (type, key, value) => {
    const data = key && value !== undefined ? { key, value } : key
    return new Promise((resolve, reject) => {
      const transaction: any = this.transaction()
      const transaction_data = transaction[type](data)
      if (transaction_data) {
        this.dbCallback(
          transaction_data,
          (res) => {
            resolve(res)
          },
          type
        )
      }
    })
  }
}

let DB = null
if (true) {
  DB = window.indexedDB ? new EasyDB() : {}
}
export default DB
