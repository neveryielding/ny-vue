/**
 * @author super
 * @description 大部分页面都需要用到的字段以及默认方法
 */
export default {
  data() {
    return {
      mloading: null, // 加载框对象
      loading: {
        state: false, // 是否显示加载状态
        text: '加载中...' // 加载状态文字
      }
    }
  },
  methods: {
    // 创建并返回一个全新的 MLoading 对象
    newMLoading(element, text = this.loading.text) {
      return this.$mloading({
        target: element,
        text: text
      })
    },
    // 创建默认的MLoading 对象 并赋值给 this.mloading
    createDefaultMLoading(element) {
      if (this.mloading === null) {
        this.mloading = this.newMLoading(element)
      }
    }
  }
}
