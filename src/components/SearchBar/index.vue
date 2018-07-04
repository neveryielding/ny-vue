<template>
  <div id="SearchBar" class="search-bar">
    <slot></slot>
    <template v-if="data && data.length > 0">
      <div class="left" v-for="(item, index) in data[0]" :key="index">
        <template v-if="item.type === 'date'">
          <el-date-picker :style="{width:'134px'}" size="small" v-model="item.value" value-format="yyyy-MM-dd" type="date" :placeholder="item.placeholder"></el-date-picker>
        </template>
        <template v-else-if="item.type === 'select'">
          <el-select :class="item.class?item.class:'w90'" size="small" v-model="item.value" clearable filterable :placeholder="item.placeholder">
            <el-option v-for="sub in item.options" :key="sub.value" :label="sub.label" :value="sub.value" :class="item.class"></el-option>
          </el-select>
        </template>
        <template v-else-if="item.type === 'input'">
          <el-input :class="item.class" v-model.trim="item.value" size="small" @keyup.enter.native="sendSearchParams" :placeholder="item.placeholder"></el-input>
        </template>
        <template v-if="item.type === 'multiple-date'">
          <el-date-picker v-model="item.value" value-format="yyyy-MM-dd" type="daterange" size="small" range-separator="至" :start-placeholder="item.placeholder1" :end-placeholder="item.placeholder2"></el-date-picker>
        </template>
        <template v-else-if="item.type === 'search'">
          <el-button type="primary" size="small" @click="sendSearchParams">{{item.name}}</el-button>
        </template>
        <template v-else-if="item.type === 'reset'">
          <el-button size="small" @click="clickReset">{{item.name}}</el-button>
        </template>
      </div>
      <template v-esle-if="data.length > 1">
        <div class="right" v-show="rightVisible">
          <slot ref="rightFirst" name="rightFirst"></slot>
          <div class="left" v-for="(item, index) in data[1]" :key="index">
            <template v-if="item.type === 'add'">
              <el-button size="small" @click="clickAdd">{{item.name}}</el-button>
            </template>
            <template v-else-if="item.type === 'more'">
              <el-dropdown trigger="click" @command="clickCommand">
                <el-button size="small">更多菜单<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="label in item.labels" :key="label" :command="label">{{label}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    data: {
      type: Array,
      default: []
    },
    rightVisible: { // 是否需要显示右边区域按钮 默认显示
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickReset() {
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item['type'] === 'search') {
            break
          } else {
            item['value'] = null
          }
        }
      }
      this.$emit('reset')
    },
    sendSearchParams() {
      const params = {}
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        const commonlyTypes = ['input', 'select', 'option', 'date']
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (commonlyTypes.indexOf(item['type']) !== -1) {
            params[item['key']] = item.value
          } else if (item['type'] === 'multiple-date') {
            if (item.value != null) {
              params[item['key1']] = item.value[0]
              params[item['key2']] = item.value[1]
            } else {
              params[item['key1']] = null
              params[item['key2']] = null
            }
          } else if (item['type'] === 'search') {
            break
          }
        }
      }
      this.$emit('search', params)
    },
    clickAdd() {
      this.$emit('add')
    },
    clickCommand(command) {
      this.$emit('command', command)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
div.left {
  margin-left: 5px;
}
</style>