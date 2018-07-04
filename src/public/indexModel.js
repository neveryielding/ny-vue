/**
 * @author super
 * @description 引入并声明所有页表页面的公共变量及组件
 */
import { SearchBar, TableContain } from '@/components/indexComponents.js'
import parent from './parent.js'
export default {
  components: { SearchBar, TableContain }, // 引入两个在列表页面都会用的组件
  mixins: [parent],
  data() {
    return {
      pagination: {
        pageSizes: [10, 20, 50, 100], // 默认分页可选择的每页显示的页数
        size: 10, // 分页每页默认显示10条
        page: 1, // 当前默认第一页
        total: 0 // 总条数
      },
      table: {
        data: null, // 列表表格数据
        size: 'mini', // 列表表格大小
        maxHeight: 0 // 列表表格最大高度
      },
      add: {
        visiable: false, // 是否显示新增组件
        data: null // 新增组件绑定的数据
      }
    }
  }
}
