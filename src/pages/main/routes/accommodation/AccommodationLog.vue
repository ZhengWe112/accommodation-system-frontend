<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/accommodation/log' }">住退宿日志</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="logs" style="width: 100%">
        <el-table-column prop="responsibleLeaderName" label="审核人"/>
        <el-table-column prop="studentName" label="学生"/>
        <el-table-column prop="requestTime" label="申请时间" width="200px"/>
        <el-table-column prop="requestReason" label="申请理由" width="300px"/>
        <el-table-column prop="requestType" label="类型">
          <template #default="scope">
            <div v-if="scope.row.requestType === 0">普通入住申请</div>
            <div v-if="scope.row.requestType === 1">普通调宿申请</div>
            <div v-if="scope.row.requestType === 2">互换申请</div>
            <div v-if="scope.row.requestType === 3">个人退宿申请</div>
            <div v-if="scope.row.requestType === 4">校外住宿申请</div>
          </template>
        </el-table-column>
        <el-table-column prop="reviewTime" label="审核时间" width="200px"/>
        <el-table-column prop="reviewState" label="状态">
          <template #default="scope">
            <div v-if="scope.row.reviewState === false">通过</div>
            <div v-if="scope.row.reviewState === true">驳回</div>
          </template>
        </el-table-column>
        <el-table-column prop="reviewReason" label="描述"/>
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
import PaginationComponent from '@/components/PaginationComponent.vue'
import {mapGetters} from 'vuex'
import {getAccommodationLogLst} from '@api/accommodation'

export default {
  name: 'accommodationLog',
  components: {PaginationComponent},
  data () {
    return {
      logs: [],
      total: 400,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    async init () {
      if (this.userType === 4 || this.userType === 1 || this.userType === 5 || this.userType === 3) {
        await getAccommodationLogLst({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
          if (res.status) {
            this.logs = res.data.data
            this.total = res.data.total
          }
        })
      } else if (this.userType === 6) {
        await getAccommodationLogLst({pageNo: this.currentPage, pageSize: this.pageSize, studentId: this.userId}).then(res => {
          if (res.status) {
            this.logs = res.data.data
            this.total = res.data.total
          }
        })
      }
    },
    handlePageChange (data) {
      this.currentPage = data.currentPage
      this.pageSize = data.pageSize
      console.log(this.currentPage, this.pageSize)
      this.init()
    }
  },
  computed: {
    ...mapGetters({
      userType: 'user/getUserType',
      userId: 'user/getUserId'
    })
  },
  created () {
    this.init()
  }
}
</script>
