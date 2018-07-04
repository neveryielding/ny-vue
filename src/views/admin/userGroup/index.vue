<!-- 基础信息 - 品牌 -->
<template>
<div id="group">
  <search-bar :data="searchBarData" @search="searchAction" @add="showAdd()" @command="clickMoreCommand"></search-bar>
  <table-contain :height.sync="table.maxHeight">
    <el-table :data="table.data" slot="table" :size="table.size" :max-height="table.maxHeight" style="width: 100%;">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="code" label="用户组编码" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.id !== 1">
            <el-button type="primary" size="mini" @click="clickShowUserRelationDialog(scope.$index, scope.row)">关联用户</el-button>
            <el-button type="primary" size="mini" @click="clickShowRoleRelationDialog(scope.$index, scope.row)">关联角色</el-button>
            <el-button type="primary" size="mini" @click="clickEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="clickDelete(scope.$index, scope.row)">删除</el-button>
          </template>
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
  <relation-dialog v-if="userRelationDialog.visiable" v-model="userRelationDialog.visiable" :data="userRelationDialog.data"></relation-dialog>
  <relation-dialog v-if="roleRelationDialog.visiable" v-model="roleRelationDialog.visiable" :data="roleRelationDialog.data"></relation-dialog>
</div>
</template>
<script>
import { fetchList, deleteId } from '@/api'
import model from '@/public/indexModel.js'
import Add from './add.vue'
import RelationDialog from '../component/RelationDialog/index.vue'
export default {
  mixins: [model],
  name: 'group',
  components: { Add, RelationDialog },
  data() {
    return {
      searchBarData: [
        [
          { type: 'input', value: null, key: 'name', placeholder: '编码或名称模糊检索', class: 'w130' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
        ]
      ],
      userRelationDialog: {
        visiable: false,
        data: {
          type: 'userGroupPk',
          title: '用户组',
          relation: '用户',
          idKey: 'groupId',
          relationIdKey: 'userId',
          multipleIdKey: 'userIds',
          urls: {
            noRelation: '/admin/api/sysUserGroup/groupNoRelationUserList',
            relation: '/admin/api/sysUserGroup/groupUserList',
            batchSave: '/admin/api/sysUserGroup/batchUserAdd',
            batchDelete: '/admin/api/sysUserGroup/batchUserDelete'
          }
        }
      },
      roleRelationDialog: {
        visiable: false,
        data: {
          type: 'userGroupRole',
          title: '用户组',
          relation: '角色',
          idKey: 'groupId',
          relationIdKey: 'roleId',
          multipleIdKey: 'roleIds',
          urls: {
            noRelation: '/admin/api/sysUserGroup/groupNoRelationRoleList',
            relation: '/admin/api/sysUserGroup/groupRoleList',
            batchSave: '/admin/api/sysUserGroup/batchRoleAdd',
            batchDelete: '/admin/api/sysUserGroup/batchRoleDelete'
          }
        }
      }
    }
  },
  mounted() {
    this.createDefaultMLoading('#group')
    this.fetchData()
  },
  methods: {
    fetchData(params = {}) {
      this.mloading.show()
      const { page, size } = this.pagination
      params.page = page
      params.size = size
      fetchList('/admin/api/sysUserGroup', params).then(({ data }) => {
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
        deleteId('/admin/api/sysUserGroup', row.id).then(() => {
          this.$message({ type: 'success', message: '删除成功!' })
          this.fetchData()
        }).catch(() => {
          this.$message({ type: 'error', message: '删除失败!' })
        })
      })
    },
    clickShowUserRelationDialog(index, row) {
      this.userRelationDialog.data.obj = row
      this.userRelationDialog.visiable = true
    },
    clickShowRoleRelationDialog(index, row) {
      this.roleRelationDialog.data.obj = row
      this.roleRelationDialog.visiable = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>