// 全局组件 服务 对象等
import Vue from 'vue'
import MLoading from './MLoading/index'
import SelectBox from './SelectBox/index'
import SearchBox from './SearchBox/index'
import SearchPage from './SearchPage/index'
import PermissionButton from './PermissionButton/index'
const components = [
  SelectBox,
  SearchBox,
  SearchPage,
  PermissionButton
]
const install = (Vue, opts) => {
  components.map(component => {
    Vue.component(component.name, component)
  })
  Vue.prototype.$mloading = MLoading.service
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

Vue.use(install)
