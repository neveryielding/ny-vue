export default {
  data() {
    return {
      rules: {
        input: [{
          required: true,
          message: '请输入',
          trigger: 'change'
        }],
        select: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }]
      }
    }
  }
}
