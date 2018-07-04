export default {
  data() {
    return {
      leftData: {
        filterName: null,
        tableData: null,
        multipleSelection: null,
        button: {
          text: '关联',
          loading: false
        },
        pagination: {
          pageSizes: [10, 20, 50, 100],
          size: 20,
          page: 1,
          total: 0
        }
      },
      rightData: {
        filterName: null,
        tableData: null,
        multipleSelection: null,
        button: {
          text: '取消关联',
          loading: false
        },
        pagination: {
          pageSizes: [10, 20, 50, 100],
          size: 20,
          page: 1,
          total: 0
        }
      },
      urls: {
        noRelation: null,
        relation: null,
        batchSave: null,
        batchDelete: null
      },
      relationText: null,
      noRelationText: null,
      idKey: null,
      idVal: null,
      relationIdKey: null,
      multipleIdKey: null
    }
  }
}
