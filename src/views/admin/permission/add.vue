<template>
  <div id="brand-add">
    <el-dialog :title="dialog.title" width="370px" :visible.sync="dialog.visiable" @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" id="form" class="demo-ruleForm" :inline="true">
        <el-form-item label="权限名称" prop="name" :rules="data.type==='edit' ? null : [{validator: rules.existName, trigger:'blur', required: true}]">
          <el-input size="small" class="w180" :disabled="data.type==='edit'" placeholder="请输入" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input type="textarea" class="w180" :rows="2" placeholder="请输入内容" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select size="small" class="w180" v-model="form.state" placeholder="请选择">
            <el-option v-for="item in options.states" :label="item.label" :key="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="button.loading" size="small" type="primary" @click="clickSaveOrUpdate('form')">{{button.text}}</el-button>
        <el-button size="small" @click="dialog.visiable = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import addModel from '@/public/addModel.js'
import { curd, fetchInfo, checkIsExist } from '@/api/index.js'
export default {
  mixins: [addModel],
  data() {
    return {
      form: {
        id: null,
        name: null,
        description: null,
        state: 1
      },
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
          if (rule.data && value === rule.data.name) {
            return callback()
          }
          checkIsExist('/admin/api/sysPermission/noPermission/exist', { name: value }).then(({ data }) => {
            if (data) {
              callback(new Error('已存在,请勿重复添加'))
            } else {
              callback()
            }
          })
        }
      }
    }
  },
  created() {
    const title = this.data.type === 'add' ? '新增' : '编辑'
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
  },
  mounted() {
    if (this.data.type === 'edit') {
      this.createDefaultMLoading('.el-dialog')
      this.loadInfo()
    }
  },
  methods: {
    loadInfo() {
      const { obj } = this.data
      this.mloading.show()
      fetchInfo('/admin/api/sysPermission', obj.id).then(({ data }) => {
        this.form = data
        this.mloading.close()
      }).catch(error => this.mloading.error(error, () => this.loadInfo()))
    },
    closeDialog() {
      this.$emit('input', false)
    },
    clickSaveOrUpdate() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.data.type === 'edit' && this.$compareObjValue(this.data.obj, this.form)) {
            this.$message({ type: 'warning', message: '数据并未改变' })
            return
          }
          this.$setKeyValue(this.button, { loading: true, text: '提交中..' })
          const url = '/admin/api/sysPermission'
          if (this.data.type === 'add') {
            const requestForm = this.$copy(this.form)
            delete requestForm.id
            curd(url, 'post', requestForm).then(() => this.success()).catch(() => this.error())
          } else {
            curd(url, 'put', this.form).then(() => this.success()).catch(() => this.error())
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
</script>