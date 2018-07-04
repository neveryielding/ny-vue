<!-- 搜索单选组件 -->
<template>
<div class="SearchBox" v-clickoutside="close">
  <div ref="inputLayout" :class="className">
    <template v-if="selectRow">
      <el-tag size="small" :disable-transitions="false" :closable="true" :close-transition="false" @close="handleClose">
        <template v-if="displayType === 0">
          {{selectRow.name.length * 12 + 40 >= currentWidth ? selectRow.name.substring(0, (currentWidth - 40) / 14) + '..' : selectRow.name}}
        </template>
        <template v-if="displayType === 1">
          {{selectRow.code.length * 12 + 40 >= currentWidth ? selectRow.code.substring(0, (currentWidth - 40) / 14) + '..' : selectRow.code}}
        </template>
      </el-tag>
    </template>

    <input
        class="input"
        @focus="handleFocus"
        @blur="handleBlur"
        v-model.trim="text"
        @keydown="handleKeydown"
        @compositionstart="isLock=true"
        @compositionend="isLock=false"
        @input="compositioninput"
        :placeholder="placeholder" />
    </div>

    <div v-show="tableVisiable" class="table-layout" @row-click="clickTableRow">
      <template v-if="titles">
        <el-table :data="tableDate" max-height="300">
          <el-table-column prop="code" :label="titles[0]"> </el-table-column>
          <el-table-column prop="name" :label="titles[1]"> </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-table :data="tableDate" max-height="300" @row-click="clickTableRow">
            <el-table-column prop="code" label="编码"> </el-table-column>
            <el-table-column prop="name" label="名称"> </el-table-column>
        </el-table>
      </template>

      <SearchPage
        v-if="!pageVisiable"
        @size-change="handleSizeChange"
        @current-change="getPageList"
        :pageSizes="[10,20,30,40]"
        :pageSize="pageSize"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :total="total">
      </SearchPage>

      <div class="loading-layout" v-show="loading">
        <div :style="{color:'#5d9cec','text-align':'center','margin-top':'30px'}">
          <i v-show="progress" class="el-icon-loading"></i>
          <span> {{loadingText}}</span>
          <div v-show="refresh" class="refresh"><em class="fa fa-refresh" @click="clickRefresh"></em></div>
        </div>
      </div>
    </div>
</div>
</template>

<script src='./js/index.js'></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.input-layout {
  position: relative;
  width: 100%;
  height: 36px;
  background-color: #fff;
  background-image: none;
  border: #c8c8c8 solid 1px;
  border-radius: 4px;
  box-sizing: border-box;
  color: #1f2d3d;
  font-size: inherit;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow: hidden;
  .input {
    padding-left: 1px;
    position: absolute;
    width: 100%;
    line-height: 33px;
    outline: none;
    border: none;
  }
}
.input-layout .focus-border {
  border-color: #409eff;
}
.table-layout {
  background-color: white;
  position: absolute;
  width: 340px;
  overflow: auto;
  z-index: 2003;
  margin-top: 5px;
  border: 1px solid #bfcbd9;
}
.loading-layout {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2004;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
}
.refresh {
  margin-top: 10px;
  width: 100%;
  .fa-refresh {
    cursor: pointer;
    font-size: 18px;
  }
}
.el-tag {
  margin-top: 5px;
  margin-left: 2px;
}
</style>
