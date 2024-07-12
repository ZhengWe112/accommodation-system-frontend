<template>
  <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="getCurrentPage"
      :page-size="getPageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total">
  </el-pagination>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 40]
      }
    },
    total: {
      type: Number,
      required: true
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  computed: {
    getCurrentPage: {
      get () {
        return this.currentPage
      },
      set (val) {
        this.$emit('update:currentPage', val)
      }
    },
    getPageSize: {
      get () {
        return this.pageSize
      },
      set (val) {
        this.$emit('update:pageSize', val)
      }
    }
  },

  methods: {
    handleSizeChange (val) {
      this.$emit('pagination', { currentPage: this.currentPage, pageSize: val })
    },
    handleCurrentChange (val) {
      this.$emit('pagination', { currentPage: val, pageSize: this.pageSize })
    }
  }
}
</script>
