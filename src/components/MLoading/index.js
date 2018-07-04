import service from './src/index'
export default {
  install(Vue) {
    Vue.prototype.$mloading = service
  },
  service
}
