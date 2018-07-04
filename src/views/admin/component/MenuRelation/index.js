import parent from '@/public/parent.js'
import addModel from '@/public/addModel.js'
import { noRelation, relation, batchSave, batchDelete } from '@/api/permissionMenu'
export default {
  name: 'menu-relation',
  mixins: [parent, addModel],
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      leftData: {
        filterName: null,
        treeList: null,
        selectList: [],
        button: {
          text: '关联',
          loading: false
        }
      },
      rightData: {
        filterName: null,
        treeList: null,
        selectList: [],
        button: {
          text: '取消关联',
          loading: false
        }
      },
      roleId: null
    }
  },
  created() {
    this.$setKeyValue(this.dialog, { title: '权限关联菜单', visiable: true })
    this.permissionId = this.data.obj.id
  },
  mounted() {
    this.createDefaultMLoading('.el-dialog')
    this.loadNoRelation()
    this.loadRelation()
  },
  methods: {
    loadNoRelation(params = {}) {
      this.mloading.show()
      params.permissionId = this.permissionId
      noRelation(params).then(({ data }) => {
        this.mloading.hide()
        this.leftData.treeList = data && data != null ? data : []
      }).catch(error => {
        console.log(error)
      })
    },
    loadRelation(params = {}) {
      params.permissionId = this.permissionId
      relation(params).then(({ data }) => {
        this.rightData.treeList = data && data != null ? data : []
      }).catch(error => {
        console.log(error)
      })
    },
    closeDialog() {
      this.$emit('input', false)
    },
    clickRelation() {
      const selectList = this.$refs.leftTree.getCheckedNodes()
      if (!this.$empty(selectList)) {
        this.$setKeyValue(this.leftData.button, { text: '关联中..', loading: true })
        const params = []
        selectList.forEach(item => {
          params.push({ menuId: item.id, permissionId: this.permissionId })
        })
        batchSave(params).then(({ data }) => {
          this.$setKeyValue(this.leftData.button, { text: '关联', loading: false })
          this.loadNoRelation()
          this.loadRelation()
        }).catch(() => {
          this.$setKeyValue(this.leftData.button, { text: '关联', loading: false })
          this.$message({ type: 'error', message: '关联失败' })
        })
      }
    },
    clickCancelRelation() {
      const selectList = this.$refs.rightTree.getCheckedNodes()
      if (!this.$empty(selectList)) {
        this.$setKeyValue(this.rightData.button, { text: '取消关联中..', loading: true })
        const menuIds = []
        selectList.forEach(item => {
          menuIds.push(item.id)
        })
        const params = { permissionId: this.permissionId, menuIds: menuIds }
        batchDelete(params).then(() => {
          this.$setKeyValue(this.rightData.button, { text: '取消关联', loading: false })
          this.loadNoRelation()
          this.loadRelation()
        }).catch(() => {
          this.$setKeyValue(this.rightData.button, { text: '取消关联', loading: false })
          this.$message({ type: 'error', message: '取消关联失败' })
        })
      }
    }
  }
}
