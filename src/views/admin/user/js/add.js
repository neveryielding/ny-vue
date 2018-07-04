import addModel from '@/public/addModel.js'
import rules from '@/public/rules.js'
import { checkUserNameIsExist } from '@/api/user.js'
import { fetchList, curd, fetchInfo } from '@/api/index.js'
export default {
  mixins: [ addModel, rules ],
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: null,
        password: null,
        confirmPassword: null,
        name: null,
        groudId: null,
        state: 1
      },
      options: {
        userGroups: [],
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
          if (rule.data && value === rule.data.name) {
            return callback()
          }
          const params = { username: value }
          checkUserNameIsExist(params).then(({ data }) => {
            if (data) {
              callback(new Error('已存在,请勿重复添加'))
            } else {
              callback()
            }
          })
        },
        password:[
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const title = this.data.type === 'add' ? '新增' : '编辑'
    this.originalData = this.$copy(this.data.obj)
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    if (this.data.type === 'edit') {
      this.createDefaultMLoading('.el-dialog')
      this.loadInfo()
    }
    this.loadUserGroup()
  },
  methods: {
    loadInfo() {
      const { obj } = this.data
      this.mloading.show()
      fetchInfo('/admin/api/sysUser/edit', obj.id).then(({ data }) => {
        this.form = {
          id: data.id,
          name: data.name,
          username: data.username,
          groupId: data.groupId,
          groupName: data.groupName,
          state: data.state
        }
        this.$setKeyValue(this.originalData, { groupId: data.groupId, groupName: data.groupName })
        this.mloading.close()
      }).catch(error => this.mloading.error(error, () => this.loadInfo()))
    },
    loadUserGroup() {
      fetchList('/admin/api/sysUserGroup', { page: 1, size: 100 }).then(({ data }) => {
        this.options.userGroups = data.data
      }).catch(error => { console.log(error) })
    },
    closeDialog() {
      this.$emit('input', false)
    },
    clickSaveOrUpdate() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.data.type === 'edit' && this.$compareObjValue(this.originalData, this.form)) {
            this.$message({ type: 'warning', message: '数据并未改变' })
            return
          }
          this.$setKeyValue(this.button, { loading: true, text: '提交中..' })
          const requestForm = this.$copy(this.form)
          delete requestForm.confirmPassword
          const url = '/admin/api/sysUser'
          if (this.data.type === 'add') {
            delete requestForm.id
            curd(url, 'post', requestForm).then(() => this.success()).catch(() => this.error())
          } else {
            curd(url, 'put', requestForm).then(() => this.success()).catch(() => this.error())
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
  }
}
