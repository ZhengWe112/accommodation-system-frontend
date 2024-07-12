<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/violation/warn' }">警告通知</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="record" height="250" style="width: 100%">
        <el-table-column prop="violationTime" label="违规时间"/>
        <el-table-column prop="description" label="描述" width="800px"/>
        <el-table-column prop="degree" label="违规程度">
          <template #default="scope">
            <div v-if="scope.row.degree === 0">记过</div>
            <div v-if="scope.row.degree === 1">严重警告</div>
            <div v-if="scope.row.degree === 2">警告</div>
          </template>
        </el-table-column>
      </el-table>
      <PaginationComponent
          :total="total"
          :currentPage="currentPage"
          :pageSize="pageSize"
          @pagination="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script>
import {
  getWarningMsg
} from '@api/violation'
import {mapGetters} from 'vuex'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  name: 'violationWarn',
  components: {PaginationComponent},
  data () {
    return {
      record: [],
      total: 400,
      pageSize: 10,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/getUserId'
    })
  },
  methods: {
    async init () {
      getWarningMsg({pageNo: this.currentPage, pageSize: this.pageSize, id: this.userId}).then(res => {
        if (res.status) {
          this.record = res.data.data
          this.total = res.data.total
        }
      })
    },
    handlePageChange (data) {
      this.currentPage = data.currentPage
      this.pageSize = data.pageSize
      console.log(this.currentPage, this.pageSize)
      this.init()
    }
  },
  created () {
    this.init()
  }
}
</script>
