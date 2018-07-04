import parent from '@/public/parent.js'
import addModel from '@/public/addModel.js'
import model from './model'
import { noRelation, relation, batchSave, batchDelete } from '@/api/adminRelationDialog'
export default {
  name: 'RelationDialog',
  mixins: [parent, addModel, model],
  created() {
    this.noRelationText = '未关联' + this.data.relation
    this.relationText = '已关联' + this.data.relation
    const title = this.data.title + '关联' + this.data.relation
    this.$setKeyValue(this.dialog, { title: title, visiable: true })
    this.idKey = this.data.idKey
    this.idVal = this.data.obj.id
    this.relationIdKey = this.data.relationIdKey
    this.multipleIdKey = this.data.multipleIdKey
    this.$setKeyValue(this.urls, this.data.urls)
  },
  mounted() {
    this.createDefaultMLoading('.el-dialog')
    this.loadNoRelation()
    this.loadRelation()
  },
  methods: {
    loadNoRelation(params = {}) {
      this.mloading.show()
      const { page, size } = this.leftData.pagination
      params.page = page
      params.size = size
      params.name = this.leftData.filterName
      params[[this.idKey]] = this.idVal
      noRelation(this.urls.noRelation, params).then(({ data }) => {
        this.mloading.hide()
        this.leftData.tableData = data.data
        this.leftData.pagination.total = data.total
      }).catch(error => {
        console.log(error)
      })
    },
    loadRelation(params = {}) {
      const { page, size } = this.rightData.pagination
      params.page = page
      params.size = size
      params.name = this.rightData.filterName
      params[[this.idKey]] = this.idVal
      relation(this.urls.relation, params).then(({ data }) => {
        this.rightData.tableData = data.data
        this.rightData.pagination.total = data.total
      }).catch(error => {
        console.log(error)
      })
    },
    closeDialog() {
      this.$emit('input', false)
    },
    handleLeftSizeChange(val) {
      this.leftData.pagination.size = val
      this.loadNoRelation()
    },
    handleLeftCurrentChange(val) {
      this.leftData.pagination.page = val
      this.loadNoRelation()
    },
    handleLeftSelectionChange(val) {
      this.leftData.multipleSelection = val
    },
    handleRightSizeChange(val) {
      this.rightData.pagination.size = val
      this.loadRelation()
    },
    handleRightCurrentChange(val) {
      this.rightData.pagination.page = val
      this.loadRelation()
    },
    handleRightSelectionChange(val) {
      this.rightData.multipleSelection = val
    },
    clickRelation() {
      if (!this.$empty(this.leftData.multipleSelection)) {
        this.$setKeyValue(this.leftData.button, { text: '关联中..', loading: true })
        const params = []
        this.leftData.multipleSelection.forEach(element => {
          params.push({ [this.relationIdKey]: element.id, [this.idKey]: this.idVal })
        })
        batchSave(this.urls.batchSave, params).then(({ data }) => {
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
      if (!this.$empty(this.rightData.multipleSelection)) {
        this.$setKeyValue(this.rightData.button, { text: '取消关联中..', loading: true })
        const params = { [this.idKey]: this.idVal, [this.multipleIdKey]: [] }
        this.rightData.multipleSelection.forEach(element => {
          params[this.multipleIdKey].push(element.id)
        })
        batchDelete(this.urls.batchDelete, params).then(({ data }) => {
          this.$setKeyValue(this.rightData.button, { text: '取消关联', loading: false })
          this.loadNoRelation()
          this.loadRelation()
        }).catch(() => {
          this.$setKeyValue(this.rightData.button, { text: '关联', loading: false })
          this.$message({ type: 'error', message: '取消关联失败' })
        })
      }
    },
    leftKeyUpCenter() {
      this.loadNoRelation()
    },
    rightKeyUpCenter() {
      this.loadRelation()
    }
  }
}
