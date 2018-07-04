
import component from './src/index'
component.install = function(Vue) {
  Vue.component(component.name.component)
}
export default component
