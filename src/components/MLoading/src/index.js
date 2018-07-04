import Vue from 'vue'
import loadingVue from './MLoading.vue'
import { addClass, removeClass, getStyle } from 'element-ui/src/utils/dom'
import { PopupManager } from 'element-ui/src/utils/popup'
import afterLeave from 'element-ui/src/utils/after-leave'
import merge from 'element-ui/src/utils/merge'

const LoadingConstructor = Vue.extend(loadingVue)

const defaults = {
  text: null,
  fullscreen: true,
  body: false,
  lock: false,
  customClass: '',
  isError: false
}

let fullscreenLoading

LoadingConstructor.prototype.originalPosition = ''
LoadingConstructor.prototype.originalOverflow = ''

LoadingConstructor.prototype.close = function() {
  if (this.fullscreen) {
    fullscreenLoading = undefined
  }
  afterLeave(this, _ => {
    const target = this.fullscreen || this.body
      ? document.body
      : this.target
    removeClass(target, 'el-loading-parent--relative')
    removeClass(target, 'el-loading-parent--hidden')
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
  }, 300)
  this.visible = false
}

/**
 * 显示错误的家在信息
 * @param {*} text 错误文本信息
 * @param {*} fn 刷新回调函数
 */
LoadingConstructor.prototype.error = function(text, fn) {
  this.spinner = false
  this.text = text
  this.textColor = 'red'
  this.refresh = true
  if (!this.isError) {
    this.isError = true
    afterLeave(this, _ => {
      this.$on('refresh', () => {
        if (fn) fn()
      })
    })
  }
}

LoadingConstructor.prototype.reset = function() {
  afterLeave(this, _ => {
    this.$on('reset', null)
  })
}

LoadingConstructor.prototype.hide = function() {
  this.isError = false
  this.visible = false
}

/**
 * 显示加载
 */
LoadingConstructor.prototype.show = function() {
  this.visible = true
}

const addStyle = (options, parent, instance) => {
  const maskStyle = {}
  if (options.fullscreen) {
    instance.originalPosition = getStyle(document.body, 'position')
    instance.originalOverflow = getStyle(document.body, 'overflow')
    maskStyle.zIndex = PopupManager.nextZIndex()
  } else if (options.body) {
    instance.originalPosition = getStyle(document.body, 'position')
  } else {
    instance.originalPosition = getStyle(parent, 'position')
  }
  Object.keys(maskStyle).forEach(property => {
    instance.$el.style[property] = maskStyle[property]
  })
}

const Loading = (options = {}) => {
  if (Vue.prototype.$isServer) return
  options = merge({}, defaults, options)
  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body
  if (options.target !== document.body) {
    options.fullscreen = false
  } else {
    options.body = true
  }
  if (options.fullscreen && fullscreenLoading) {
    return fullscreenLoading
  }

  const parent = options.body ? document.body : options.target
  const instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })

  addStyle(options, parent, instance)
  if (instance.originalPosition !== 'absolute' && instance.originalPosition !== 'fixed') {
    addClass(parent, 'el-loading-parent--relative')
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, 'el-loading-parent--hidden')
  }
  parent.appendChild(instance.$el)
  if (options.hasOwnProperty('visible')) {
    Vue.nextTick(() => {
      instance.visible = options.visible
    })
  }
  if (options.fullscreen) {
    fullscreenLoading = instance
  }
  return instance
}

export default Loading
