<template>
  <div id="brand-add">
    <el-dialog :title="dialog.title" width="370px" :visible.sync="dialog.visiable" @close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" id="form" class="demo-ruleForm" :inline="true">
        <el-form-item label="登录账号" prop="username" :rules="data.type==='edit' ? null : [{validator: rules.existName, trigger:'blur', required: true}]">
          <el-input size="small" class="w180" :disabled="data.type==='edit'" placeholder="请输入" v-model="form.username"></el-input>
        </el-form-item>
        <template v-if="data.type === 'add'">
          <el-form-item label="登录密码" prop="password">
            <el-input size="small" type="password" class="w180" placeholder="请输入" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input size="small" type="password" class="w180" placeholder="请输入" :disabled="!form.password" v-model="form.confirmPassword"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="用户昵称" prop="name" :rules="rules.input">
          <el-input size="small" class="w180" placeholder="请输入" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="groupId" :rules="rules.select">
          <el-select v-model="form.groupId" filterable placeholder="请选择" size="small">
            <el-option
              v-for="item in options.userGroups"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
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
<script src="./js/add.js"></script>