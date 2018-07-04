/**
 * @author super
 * @description 引入并声明所有新增页面的公共变量及组件
 */
import parent from './parent.js'
export default {
  mixins: [parent],
  props: {
    data: { // 用于给外部的数据传递
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: {
        visiable: false, // 显示弹出框
        title: null // 弹出框标题
      },
      button: {
        loading: false, // 确定按钮状态
        text: '确定' // 按钮默认文字
      },
      originalData: null // 原始数据
    }
  }
}
