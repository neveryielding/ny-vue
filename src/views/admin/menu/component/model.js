import { checkIsExist } from '@/api/menu.js'
export default {
  data() {
    return {
      filterText: '',
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      OperationTypes: {
        Find: 0,
        Add: 1,
        Edit: 2,
        Delete: 3
      },
      currentOperationTypes: 0,
      originalData: null,
      originalForm: {
        id: null,
        title: null,
        icon: null,
        sort: null,
        level: null,
        parentId: null,
        parentName: null,
        name: null,
        path: null,
        component: null,
        description: null,
        state: null
      },
      form: null,
      options: {
        states: [
          { value: 0, label: '禁用' },
          { value: 1, label: '启用' }
        ]
      },
      rules: {
        existName: (rule, value, callback) => {
          if (this.$empty(value)) {
            return callback(new Error('请输入'))
          }
          // 下面这个判断在编辑中用到，判断刚输入的名称是否和原始数据名称一致，注意rule.data对象在编辑的时候才会被设置，新增则不会去设置
          if (rule.data && value === rule.data.title) {
            return callback()
          }
          checkIsExist({ title: value }).then(({ data }) => {
            if (data) {
              callback(new Error('已存在,请勿重复添加'))
            } else {
              callback()
            }
          })
        }
      },
      isClickOperationBtn: false
    }
  }
}
