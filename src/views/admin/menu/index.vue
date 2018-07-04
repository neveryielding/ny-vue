<template>
<div id="menu">
  <search-bar :data="searchBarData" @search="searchAction">
      <div class="left" slot="rightFirst">
        <el-button size="small" @click="menuTree.visiable=true">显示菜单树</el-button>
      </div>
  </search-bar>
  <table-contain :height.sync="table.maxHeight">
    <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" align="center"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center"></el-table-column>
      <el-table-column prop="parentName" label="父级" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column prop="level" label="等级" align="center"></el-table-column>
      <el-table-column prop="name" label="前端国际化" align="center"></el-table-column>
      <el-table-column prop="path" label="前端资源路径" align="center"></el-table-column>
      <el-table-column prop="component" label="前端组件路径" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center"></el-table-column>
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
  <menu-tree v-if="menuTree.visiable" v-model="menuTree.visiable"></menu-tree>
</div>
</template>
<script>
import { fetchList } from '@/api'
import model from '@/public/indexModel.js'
import MenuTree from './component/MenuTree.vue'
export default {
  mixins: [model],
  name: 'user',
  components: { MenuTree },
  data() {
    return {
      searchBarData: [
        [
          { type: 'input', value: null, key: 'name', placeholder: '编码或名称模糊检索', class: 'w130' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ]
      ],
      menuTree: {
        visiable: false
      }
    }
  },
  mounted() {
    this.createDefaultMLoading('#menu')
    this.fetchData()
  },
  methods: {
    fetchData(params = {}) {
      this.mloading.show()
      const { page, size } = this.pagination
      params.page = page
      params.size = size
      fetchList('/admin/api/sysMenu', params).then(({ data }) => {
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>