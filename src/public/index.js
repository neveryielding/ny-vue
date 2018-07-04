
import Vue from 'vue'
/**
 * @author super
 * @param {*} object 字符串 对象 数组
 * @description 判断字符串，数组，对象是否为空 对象 = {} 数据长度为 0 都返回为空的判断
 */
Vue.prototype.$empty = (obj) => {
  if (obj === undefined || obj === null || obj === '' || obj.length === 0) return true
  if (typeof obj === 'string') {
    if (obj.trim().length === 0) {
      return true
    }
  } else if (typeof obj === 'object') {
    if (JSON.stringify(obj) === '{}') {
      return true
    }
  }
  return false
}

/**
 * @author super
 * @param {*} object
 * @description 复制一个全新的对象并返回
 */
Vue.prototype.$copy = (obj) => {
  if (obj === undefined) {
    return null
  }
  const newObj = {}
  for (const key in obj) {
    newObj[key] = obj[key]
  }
  return newObj
}

/**
 * @author super
 * @param {original} object 原始对象
 * @param {obj} object 包含原始对象需要赋值的key value集合
 * @description 给对象指定的key设置新的值，用于重置功能或大量字段初始化设值得功能，避免过多使用this.的这种方式
 */
Vue.prototype.$setKeyValue = (original, obj) => {
  for (const key in obj) {
    original[key] = obj[key]
  }
}

/**
 * @author super
 * @param {original} object 原始对象
 * @param {obj} object 新对象
 * @description 给原始对象指定的key设置成新对象的值，避免大量赋值工作
 */
Vue.prototype.$setOriginalKV = (original, newObj) => {
  for (const key in original) {
    original[key] = newObj[key]
  }
}

/**
 * @author super
 * @param {original} object 原始对象
 * @param {obj} object 包含原始对象需要判断的key value集合
 * @description 判断原始是否包含 新对象的 key 包括 key 的值是否和原始对象一致
 */
Vue.prototype.$compareObjValue = (original, obj) => {
  for (const key in obj) {
    if (!original.hasOwnProperty(key) || obj[key] !== original[key]) {
      return false
    }
  }
  return true
}
