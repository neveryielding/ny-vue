<template>
  <div id="menu-tree">
    <el-dialog :title="dialog.title" width="1000px" :visible.sync="dialog.visiable" @close="closeDialog">
      <div class="content-layout">
        <div class="tree-layout">
          <el-input size="small" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          <el-tree 
            :expand-on-click-node="false"
            :render-content="renderContent"
            @node-click="treeNodeClick"
            :data="treeList"
            highlight-current
            :props="defaultProps" 
            :filter-node-method="filterNode"
            ref="tree">
          </el-tree>
        </div>
        <div class="info-layout">
          <el-form :model="form" :rules="rules" ref="form" label-width="110px" id="form" class="demo-ruleForm" :inline="true">
            <el-form-item label="名称" prop="title" :rules="[{validator: rules.existName, trigger:'blur', data: originalData, required: true}]">
              <el-input size="small" class="w180"  :placeholder="placeholder" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="icon" prop="icon">
              <el-input size="small" class="w180"  :placeholder="placeholder" v-model="form.icon"></el-input>
            </el-form-item>
            <el-form-item label="父级" prop="parentName">
              <el-input size="small" class="w180" disabled  v-model="form.parentName"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input size="small" class="w180" v-model="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="等级" prop="level">
              <el-input size="small" class="w180" disabled v-model="form.level"></el-input>
            </el-form-item>
            <el-form-item label="前端国际化" prop="name" :rules="rules.input">
              <el-input size="small" class="w180" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="前端资源路径" prop="path" :rules="rules.input">
              <el-input size="small" class="w180" v-model="form.path"></el-input>
            </el-form-item>
            <el-form-item label="前端组件路径" prop="component">
              <el-input size="small" class="w180" v-model="form.component"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select size="small" class="w180" v-model="form.state" placeholder="请选择">
                <el-option v-for="item in options.states" :label="item.label" :key="item.value" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" class="w180" :rows="2" placeholder="请输入内容" v-model="form.description"></el-input>
            </el-form-item>
          </el-form>
          <div v-if="currentOperationTypes != OperationTypes.Find" class="form-footer">
            <el-button :loading="button.loading" size="small" type="primary" @click="clickSaveOrUpdate('form')">{{button.text}}</el-button>
            <el-button size="small" @click="dialog.visiable = false">取 消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
.content-layout {
  width: 100%;
  height: 650px;
}
.tree-layout {
  float: left;
  width: 50%;
  height: 630px;
  border: 1px solid #d9d9d9;
}
.info-layout {
  float: left;
  position: relative;
  width: 50%;
}
.form-footer {
  margin-top: 10px;
  text-align: center;
}
.el-form-item {
  margin-bottom: 15px;
}
</style>

