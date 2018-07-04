export default {
  props: {
    value: {
      required: true
    },
    data: Object, // 要绑定的查询条件 url 类型等
    isUpLevel: false, // 是否是根据关联Id去获取数据
    upLevelId: String, // 关联的数据Id
    getKeys: String, // 动态返回要获取的某些字段
    pageVisiable: true, // 是否显示分页组件，默认显示
    displayType: { // 显示类型默认 0.名称 1.编码
      type: Number,
      default: 0
    },
    titles: null,
    width: 0 // 组件宽
  }
}
