 
<template>
<div class="SearchPage page-layout">
  <div class="tool">
    <template v-if="pageSizes">
      <select class="m-b" v-model="currentPageSize" @change="pageSizeChange">
        <option v-for="(item,index) in pageSizes" :key="index">{{item}}</option>
      </select>
    </template>
    <i class="el-icon-d-arrow-left" @click="toFirstPageAction"></i>
    <i class="el-icon-arrow-left" @click="toPreviousPageAction"></i>
    第 <input :style="{'width':'50px', 'height':'28px'}" type="number" @compositionstart="compositionstart" @compositionend="compositionend" @input="compositioninput" v-model="pageIndex"/> 页
    共{{totalPages}}页
    <i class="el-icon-arrow-right" @click="toNextPageAction"></i>
    <i class="el-icon-d-arrow-right" @click="toLastPageAction"></i>
    <i class="el-icon-refresh" @click="refreshAction"></i>
    <span class="text" v-if="type===1">共{{total}}条记录</span>
  </div>
</div>
</template>

<script>
export default {
  props: [
    'currentPage',
    'pageSize',
    'total',
    'pageSizes',
    'type'
  ],
  name: 'SearchPage',
  data() {
    return {
      totalPages: 0,
      pageIndex: 0,
      isLock: false,
      currentPageSize: 10
    }
  },
  created() {
    this.pageIndex = this.currentPage
    this.currentPageSize = this.pageSize
  },
  methods: {
    toFirstPageAction() {
      if (this.currentPage > 1) {
        this.$emit('current-change', 1)
      }
    },
    toNextPageAction() {
      if (this.currentPage < this.totalPages) {
        this.$emit('current-change', this.currentPage + 1)
      }
    },
    toPreviousPageAction() {
      if (this.currentPage > 1) {
        this.$emit('current-change', this.currentPage - 1)
      }
    },
    toLastPageAction() {
      if (this.totalPages > this.currentPage) {
        this.$emit('current-change', this.totalPages)
      }
    },
    refreshAction() {
      this.$emit('current-change', this.currentPage)
    },
    currentPageChange(event) {
      if (event < 0) {
        event = this.currentPage
      } else {
        this.$emit('current-change', event)
      }
    },
    pageSizeChange() {
      if (this.currentPageSize !== this.pageSize) {
        this.$emit('size-change', this.currentPageSize)
      }
    },
    compositionstart(event) {
      this.isLock = true
    },
    compositionend(event) {
      this.isLock = false
    },
    compositioninput(event) {
      const val = parseInt(this.pageIndex)
      if (
        !this.isLock &&
        typeof val === 'number' &&
        !isNaN(val) &&
        val > 0 &&
        val <= this.totalPages
      ) {
        this.$emit('current-change', val)
      }
    }
  },
  watch: {
    currentPage() {
      this.pageIndex = this.currentPage
    },
    total() {
      if (this.total > 0) {
        if (this.total < this.pageSize) {
          this.totalPages = 1
        } else {
          const maxPages = this.total / this.pageSize
          this.totalPages = this.total % this.pageSize === 0 ? maxPages : maxPages + 1
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page-layout {
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 13px;
  clear: both;
  .tool {
    height: 40px;
    i {
      cursor: pointer;
      margin-left: 3px;
      vertical-align: middle;
      color:gray;
      font-size: 17px;
    }
    i:hover, i:active {
      color: #40a9ff;
    }
    select {
      width: 75px;
      height: 30px;
      text-align: center;
      padding: 6px 16px;
      font-size: 14px;
      line-height: 1.52857143;
      color: #3a3f51;
      vertical-align: middle;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dde6e9;
      border-radius: 4px;
    }
    input {
      text-align: center;
      vertical-align: middle;
    }
  }
  .text {
    height: 40px;
    line-height: 50px;
  }
}
</style>
