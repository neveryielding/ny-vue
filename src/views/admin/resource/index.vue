<!-- 基础信息 - 品牌 -->
<template>
<div id="resource">
  <search-bar :data="searchBarData" @search="searchAction" @add="showAdd()" @command="clickMoreCommand"></search-bar>
  <table-contain :height.sync="table.maxHeight">
    <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="接口名称" align="center"></el-table-column>
      <el-table-column prop="pageElements" label="页面元素" align="center"></el-table-column>
      <el-table-column prop="code" label="编码" align="center"></el-table-column>
      <el-table-column prop="url" label="接口URL" align="center"></el-table-column>
      <el-table-column prop="urlRequestType" label="URL请求类型" align="center"></el-table-column>
      <el-table-column prop="description" label="接口描述" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.state == 0">
            <el-tag size="mini" type="info">禁用</el-tag>
          </template>
          <template v-else>
            <el-tag size="mini">启用</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
         <el-button type="primary" size="mini" @click="clickEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="clickDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      slot="footer"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.page"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next"
      :total="pagination.total">
    </el-pagination>
  </table-contain> 
  <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="handleCurrentChange(1)" @edit="fetchData"></add>
</div>
</template>
<script>
import { fetchList, deleteId } from '@/api'
import model from '@/public/indexModel.js'
import Add from './add.vue'
export default {
  mixins: [model],
  name: 'resource',
  components: { Add },
  data() {
    return {
      searchBarData: [
        [
          { type: 'select', value: null, key: 'type', placeholder: '资源类型', class: 'w130', options:
            [
              { label: '组', value: 1 },
              { label: '权限', value: 2 },
              { label: '无权限', value: 3 }
            ]
          },
          { type: 'input', value: null, key: 'name', placeholder: '编码或名称模糊检索', class: 'w130' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
        ]
      ]
    }
  },
  mounted() {
    this.createDefaultMLoading('#resource')
    this.fetchData()
  },
  methods: {
    fetchData(params = {}) {
      this.mloading.show()
      const { page, size } = this.pagination
      params.page = page
      params.size = size
      fetchList('/admin/api/sysResource', params).then(({ data }) => {
        this.mloading.hide()
        this.table.data = data.data
        this.pagination.total = data.total
      }).catch((error) => {
        this.mloading.error(error.message, () => {
          this.fetchData()
        })
      })
    },
    searchAction(params) {
      this.fetchData(params)
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.fetchData()
    },
    clickMoreCommand(command) {
      this.$message({ message: command, type: 'success' })
    },
    clickEdit(index, row) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'edit', obj: row }})
    },
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add' }})
    },
    clickDelete(index, row) {
      this.$confirm('是否需要删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteId('/admin/api/sysResource', row.id).then(() => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.fetchData()
        }).catch(() => {
          this.$message({ type: 'error', message: '删除失败!' })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>