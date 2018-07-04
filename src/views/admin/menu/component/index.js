import parent from '@/public/parent.js'
import rules from '@/public/rules.js'
import { fetchMenuTree, curdMenu } from '@/api/menu.js'
import addModel from '@/public/addModel.js'
import model from './model'
import tree from './tree'

export default {
  name: 'menu-tree',
  mixins: [parent, addModel, model, tree, rules],
  created() {
    this.form = this.$copy(this.originalForm)
    this.$setKeyValue(this.dialog, { title: '菜单树', visiable: true })
  },
  mounted() {
    this.createDefaultMLoading('#menu-tree')
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchMenuTree(null).then(({ data }) => {
        this.mloading.hide()
        this.treeList = data
      }).catch((error) => {
        this.mloading.error(error.message, () => {
          this.fetchData()
        })
      })
    },
    closeDialog() {
      this.$emit('input', false)
    },
    clickSaveOrUpdate() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.currentOperationTypes === this.OperationTypes.Edit && this.$compareObjValue(this.originalData, this.form)) {
            this.$message({ type: 'warning', message: '数据并未改变' })
            return
          }
          this.$setKeyValue(this.button, { loading: true, text: '提交中..' })
          const requestForm = this.$copy(this.form)
          delete requestForm.confirmPassword
          const url = '/admin/api/sysUser'
          if (this.currentOperationTypes === this.OperationTypes.Add) {
            delete requestForm.id
            curdMenu('post', this.form).then(() => this.success()).catch(() => this.error())
          } else {
            curdMenu('put', this.form).then(() => this.success()).catch(() => this.error())
          }
        }
      })
    },
    success() {
      this.$message({ type: 'success', message: this.dialog.title + '成功' })
      this.closeDialog()
      if (this.data.type === 'add') {
        this.$emit('add')
      } else {
        this.$emit('edit')
      }
    },
    error() {
      this.$message({ type: 'error', message: this.dialog.title + '失败' })
      this.$setKeyValue(this.button, { loading: false, text: '确定' })
    }
  },
  computed: {
    placeholder: () => {
      console.log(this.OperationTypes)
      // if (this.currentOperationTypes === this.OperationTypes.Find) {
      //   return null
      // } else {
      //   return '请输入'
      // }
    }
  }
}
