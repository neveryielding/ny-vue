/**
 * @author wuchao@cloudolp.com
 * 工具类，各种工具方法
 */

export default class Util {
  constructor() {
    this.token = ''
  }

  /**
     * 通用判断，判断字符串是否为null undefined 空格
     * @param obj
     * @returns {*}
     */
  isEmpty(str) {
    if (str === null || str === undefined || str === '') return true
    if (str.replace(' ', '').length === 0) return true
    return false
  }

  isEmptyArray(array) {
    if (array && Array.isArray(array) && array.length > 0) { return false }
    return true
  }

  /**
     * 判断一个数组的某个属性是否包含和这个字符串相等的内容
     * @param array 数组
     * @param attr 数组属性
     * @param str 字符串
     */
  arrayIndexOf(array, attr, str) {
    const subStr = []
    for (const obj in array) {
      subStr.push(array[obj][attr])
    }
    if (subStr.indexOf(str) >= 0) { return true }
    return false
  }

  /**
     * 找到数组的某一个属性是和这个传递属性相等并删除
     * @param array 数组
     * @param attr 数组属性
     * @param str 字符串
     */
  arrayRemove(array, attr, str) {
    for (const obj in array) {
      if (array[obj][attr] === str) {
        return array.splice(obj, 1)
      }
    }
    return []
  }

  /**
     * 获取数组某个对象包含字段值的下标
     * @param  {[type]} array [数组]
     * @param  {[type]} attr  [字段名]
     * @param  {[type]} str   [值]
     * @return {[type]}       [下标]
     */
  arrayAttrToIndex(array, attr, str) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][attr] === str) { return i }
    }
    return -1
  }

  /**
     * 获取数组某个对象包包含某个字符串的对象
     * @param  {[type]} array [description]
     * @param  {[type]} attr  [description]
     * @param  {[type]} str   [description]
     * @return {[type]}       [description]
     */
  arrayAttrToObj(array, attr, str) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][attr] === str) { return array[i] }
    }
    return null
  }

  arrayIsAttr(array, attr) {
    for (let i = 0; i < array.length; i++) {
      const obj = array[i]
      if (obj[attr] || obj[attr] === null) {
        return array[i]
      }
    }
    return null
  }

  /**
     * 判断对象2的字段是否和对象1的字段相等
     * @param obj1
     * @param obj2
     * @returns {boolean}
     */
  containObjVal(obj1, obj2) {
    for (const key in obj2) {
      if (obj2[key] !== obj1[key]) {
        return false
      }
    }
    return true
  }

  /**
     * 把一维数组按整除的方式拆分成二维数组
     * @param array 需要拆分的数组
     * @param index 整除数
     * @returns {array}
     */
  arraySplit2(array, index) {
    const result = []
    if (array != null && array.length > 0) {
      const length = array.length
      if (length <= index) {
        result.push(array)
      } else {
        let obj = []
        for (let i = 0; i < length; i++) {
          obj.push(array[i])
          if ((i + 1) % index === 0) {
            result.push(obj)
            obj = []
          }
        }
        if (obj != null && obj.length > 0) { result.push(obj) }
      }
    }
    return result
  }

  /**
     * 在添加的时候比较现对象是否原有对象一直
     * @param  {[type]} obj1 [对象1]
     * @param  {[type]} obj2 [对象2]
     * @return {[type]}      [boolean]
     */
  compareObj2(obj1, obj2) {
    if (obj1 === obj2 && JSON.stringify(obj1) === JSON.stringify(obj2)) { return true }
    return false
  }

  /**
     * 获取数组某个对象包包含某个字符串的总条数
     * @param  {[type]} array [description]
     * @param  {[type]} attr  [description]
     * @param  {[type]} str   [description]
     * @return {[type]}       [description]
     */
  arrayAttrToLength(array, attr, str, length) {
    let count = 0
    const attrs = attr.split('.')
    if (attrs.length > 1) {
      for (let i = 0; i < array.length; i++) {
        if (array[i][attrs[0]][attrs[1]] === str) {
          ++count
          if (count > 0 && count === length) {
            return length
          }
        }
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        if (array[i][attr] === str) {
          ++count
          if (count > 0 && count === length) {
            return length
          }
        }
      }
    }
    return count
  }

  getNowFormatDate() {
    const date = new Date()
    const seperator1 = '-'
    const seperator2 = ':'
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            ' ' + date.getHours() + seperator2 + date.getMinutes() +
            seperator2 + date.getSeconds()
    return currentdate
  }

  isIp(ip) {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip)
  }

  /**
     * 获取请求头 加上token
     * @author dubangrong@cloudolp.com
     * @date   2017-06-17
     * @return {[type]}   [description]
     */
  getRequestHeader() {
    return {
      'Authorization': this.token
    }
  }

  /**
     * 选择导出
     * @param {*} href
     * @param {*} name
     */
  downloadFile(href, name) {
    const a = document.createElement('a')

    a.href = href
    a.download = name
    a.style.display = 'none'

    document.body.appendChild(a)

    a.click()
    document.body.removeChild(a)
  }

  setToken(token) {
    this.token = token
  }

  getRandomKeys(data) {
    const key = Math.random().toString(36).substring(3, 10)
    data.randomKey = data.randomKey || key
    return key
  }
}
