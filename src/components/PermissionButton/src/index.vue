<template>
  <div id="permission-button">
    <el-button :disabled="disabled" @click="clickAction" :loading="loading" size="small">{{text}}</el-button>
  </div>
</template>
<script>
import { fetch } from '@/api/index'
export default {
  name: 'PermissionButton',
  props: {
    permission: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      disabled: true,
      loading: false,
      text: '授权中',
      state: 0
    }
  },
  mounted() {
    this.loadPermission()
  },
  methods: {
    loadPermission() {
      this.loading = true
      fetch('/auth/user/check_resource_codes', { codes: this.permission.code }).then(data => {
        let disabled = true
        if (data && data.length > 0) {
          disabled = false
        }
        this.setState(false, disabled, this.permission.text, 1)
      }).catch(() => {
        this.setState(false, false, '刷新权限', -1)
      })
    },
    setState(loading, disabled, text, state) {
      this.loading = loading
      this.disabled = disabled
      this.text = text
      this.state = state
    },
    clickAction() {
      const { state } = this
      if (state === 1) {
        this.$emit('click')
      } else if (state === -1) {
        this.loadPermission()
      }
    }
  }
}
</script>

