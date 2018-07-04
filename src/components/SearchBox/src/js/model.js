export default {
  data() {
    return {
      url: null, // 请求地址
      placeholder: null,
      text: null, // 输入框文本
      tableVisiable: false, // 是否显示表格
      tableDate: [], // 当前下拉数据
      selectRow: null, // 当前选中行
      pageSize: 10,
      currentPage: 1,
      totalPages: 0,
      total: 0,
      loading: false,
      loadingText: null,
      refresh: false,
      progress: true,
      requestCount: 0,
      firstLoading: false,
      className: 'input-layout'
    }
  }
}
