<template>
  <div id="menu-relation">
    <el-dialog :title="dialog.title" width="1000px" :visible.sync="dialog.visiable" @close="closeDialog">
      <div class="content-layout">
        <div class="left-layout">
          <el-input size="small" v-model="leftData.filterName" placeholder="请输入内容"></el-input>
          <p>
            <el-button size="mini" @click="clickRelation" :disabled="leftData.button.disabled" v-loading="leftData.button.loading" plain>{{leftData.button.text}}</el-button>
            未关联菜单
          </p>
          <el-tree :expand-on-click-node="false" 
            :data="leftData.treeList" 
            highlight-current 
            show-checkbox
            :props="defaultProps"
            ref="leftTree">
          </el-tree>
        </div>
        <div class="center-layout">
        </div>
        <div class="right-layout">
          <el-input size="small" v-model="rightData.filename" placeholder="请输入内容"></el-input>
          <p>
            <el-button size="mini" @click="clickCancelRelation" v-loading="rightData.button.loading" plain>{{rightData.button.text}}</el-button>
            已关联菜单
          </p>
          <el-tree :expand-on-click-node="false" 
            :data="rightData.treeList" 
            highlight-current 
            show-checkbox
            :props="defaultProps"
            ref="rightTree">
          </el-tree>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
.content-layout {
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


