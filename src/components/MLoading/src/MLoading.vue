<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="el-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <svg v-if="spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <i v-else :class="spinner"></i>
        <p v-if="text" class="el-loading-text" :style="{color: textColor}">{{ text }}</p>
        <el-button v-if="refresh" type="text" @click="clickRefresh" icon="el-icon-refresh"></el-button>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
        spinner: true,
        background: null,
        fullscreen: true,
        visible: false,
        customClass: '',
        textColor: '#409EFF',
        refresh: false
      }
    },
    methods: {
      handleAfterLeave() {
        this.$emit('after-leave')
      },
      setText(text) {
        this.text = text
      },
      reset() {
        this.text = '加载中..'
        this.textColor = '#409EFF'
        this.refresh = false
        this.spinner = true
      },
      clickRefresh() {
        this.reset()
        this.$emit('refresh')
      }
    }
  }
</script>

<style scope="scope" type="text/css">
  a{
    position: relative;
  }
  .el-loading-spinner .circular {
    width: 30px;
    height: 30px;
  }
  .el-icon-refresh {
    font-size: 26px;
    cursor: pointer;
  }
  .el-icon-refresh:active {
    color: red;
  }
</style>
