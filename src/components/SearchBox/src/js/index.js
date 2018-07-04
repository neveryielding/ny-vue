import { Clickoutside } from '@/components/components.js'
import { fetchList } from '@/api/index.js'
import props from './props.js'
import model from './model.js'
import watch from './watch.js'
export default {
  name: 'SearchBox',
  mixins: [props, model, watch],
  directives: {
    Clickoutside
  },
  created() {
    this.placeholder = this.data.placeholder
  },
  methods: {
    compositioninput(event) {
      if (!this.isLock) {
        this.getPageList(1)
      }
    },
    handleKeydown(e) {
      if (e.key === 'Backspace') {
        if (this.$util.isEmpty(this.text)) {
          this.selectRow = null
          this.emitParentData()
        }
      }
    },
    getPageList() {
      if (!this.loading) {
        this.refresh = false
        this.loading = true
        this.progress = true
        this.loadingText = '加载中'
        const data = this.data
        const params = {
          itemType: data.type,
          codeOrName: !this.text || this.text == null ? '' : this.text
        }
        if (data.isUpLevel) {
          if (this.upLevelId) {
            params.upLevelId = this.upLevelId
          }
        }

        fetchList(params).then(response => {
          this.progress = false
          this.loading = false

          this.tableDate = response.data.items

          if (this.requestCount > 0) {
            this.requestCount = 0
            this.getPageList(1)
          }
        })
      }
    },
    handleFocus() {
      this.className = 'input-layout focus-border'
      this.$emit('foucs')
      if (!this.firstLoading) {
        if (this.data.isUpLevel && this.upLevelId == null) return
        this.getPageList(1)
        this.firstLoading = true
      }
      this.tableVisiable = true
    },
    handleBlur() {
      this.className = 'input-layout'
    },
    handleClose() {
      this.selectRow = null
      this.emitParentData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getPageList(1)
    },
    clickTableRow(item) {
      this.text = null
      this.selectRow = item
      this.emitParentData()
    },
    emitParentData() {
      this.$emit('input', this.selectRow)
    },
    close() {
      this.tableVisiable = false
    },
    clickRefresh() {
      this.getPageList(this.currentPage)
    }
  },
  computed: {
    'currentWidth': function() {
      return this.width ? this.width : this.$refs.inputLayout.offsetWidth
    }
  }
}
