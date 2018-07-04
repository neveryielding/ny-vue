export default {
  watch: {
    value(val) {
      if (val === null || val === '') {
        this.selectRow = null
        this.text = null
        this.firstLoading = false
      } else {
        this.selectRow = val
      }
    },
    selectRow: {
      handler(val) {
        if (!val) {
          this.placeholder = this.data.placeholder
        } else {
          this.placeholder = null
        }
      }
    },
    upLevelId: {
      handler(val) {
        if (val) {
          this.firstLoading = false
        }
      }
    }
  }
}
