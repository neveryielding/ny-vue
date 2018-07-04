<template>
  <div id="relation-dialog">
    <el-dialog :title="dialog.title" width="1000px" :visible.sync="dialog.visiable" @close="closeDialog">
      <div class="content-layout">
        <div class="left-layout">
          <el-input size="small" v-model="leftData.filterName" @keyup.enter.native="leftKeyUpCenter" placeholder="请输入内容"></el-input>
          <p><el-button size="mini" @click="clickRelation" :disabled="leftData.button.disabled" v-loading="leftData.button.loading" plain>{{leftData.button.text}}</el-button></p>
          <el-table ref="leftTable" :data="leftData.tableData" size="mini" style="width: 100%" height="400" @selection-change="handleLeftSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column :label="noRelationText" prop="name"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleLeftSizeChange"
            @current-change="handleLeftCurrentChange"
            :current-page="leftData.pagination.page"
            :page-sizes="leftData.pagination.pageSizes"
            :page-size="leftData.pagination.size"
            layout="total, sizes, prev, pager, next"
            :total="leftData.pagination.total">
          </el-pagination>
        </div>
        <div class="center-layout">
        </div>
        <div class="right-layout">
          <el-input size="small" v-model="rightData.filterName"  @keyup.enter.native="rightKeyUpCenter" placeholder="请输入内容"></el-input>
          <p><el-button size="mini" @click="clickCancelRelation" v-loading="rightData.button.loading" plain>{{rightData.button.text}}</el-button></p>
          <el-table ref="leftTable" :data="rightData.tableData" height="400" size="mini" style="width: 100%" @selection-change="handleRightSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column :label="relationText" prop="name"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleRightSizeChange"
            @current-change="handleRightCurrentChange"
            :current-page="rightData.pagination.page"
            :page-sizes="rightData.pagination.pageSizes"
            :page-size="rightData.pagination.size"
            layout="total, sizes, prev, pager, next"
            :total="rightData.pagination.total">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
.content-layout{
  width: 100%;
  height: 600px;
  .left-layout {
    padding: 5px;
    width: 450px;
    float: left;
    border: 1px solid #d9d9d9;
  }
  .center-layout {
    width: 60px;
    float: left;
    height: 100%;
    text-align: center;
    vertical-align: middle;
    button {
      margin: 0 auto;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  .right-layout {
    padding: 5px;
    border: 1px solid #d9d9d9;
    width: 450px;
    float: left;
  }
}
</style>

