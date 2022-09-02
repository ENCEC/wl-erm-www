/*
 * @Author: Hongzf
 * @Date: 2022-07-26 11:00:24
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-02 10:48:49
 * @Description: 表格公用方法
 */
import filterPanel from '@/components/FilterPanel'
import tableComponent from '@/components/TableComponent'

const mixin = {
  data() {
    return {
      params: {
        totalRecord: 0, // 总条数
        pageSize: 10, // 每页条数
        currentPage: 1 // 当前页数
      }
    }
  },
  components: {
    filterPanel,
    tableComponent
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {
    // 表格查询
    handleQuery() {
      // console.log('【 mix-handleQuery 】-28');
      this.params.currentPage = 1
      this.getTableData()
    },
    // 重置表格查询条件
    resetQueryForm(filterForm, excludeKeys = []) {
      // console.log('【 mix-resetQueryForm-filterForm 】-33', filterForm);
      // this.$refs[filterForm].resetFields();
      Object.keys(filterForm).forEach(key => {
        // 排除不需要清空的字段
        if (!excludeKeys.includes(key)) {
          filterForm[key] = ''
        }
      })
      this.getTableData()
    },
    // 分页触发
    handleCurrentChange(curPage) {
      this.params.currentPage = curPage
      this.getTableData()
    },
    // 页数切换
    handleSizeChange(curSize) {
      // console.log('【 mix-currentSize 】-56', curSize);
      this.params.currentPage = 1
      this.params.pageSize = curSize
      this.getTableData()
    }
  }
}
export default mixin
