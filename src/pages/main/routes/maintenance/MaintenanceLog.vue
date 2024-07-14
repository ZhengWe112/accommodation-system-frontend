<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/maintenance/log' }">维修日志</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="logs" style="width: 100%">
        <el-table-column prop="maintenanceItem" label="维修物品"/>
        <el-table-column prop="maintenanceTime" label="维修时间"/>
        <el-table-column prop="damageReason" label="损坏原因" width="200px"/>
        <el-table-column prop="maintainerName" label="维修人员" width="300px"/>
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
import {getMaintenanceRecord} from '@api/maintenance'

export default {
  name: 'maintenanceLog',
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
        await getMaintenanceRecord({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
          if (res.status) {
            this.logs = res.data.data
            this.total = res.data.total
          }
        })
      } else if (this.userType === 6) {
        await getMaintenanceRecord({pageNo: this.currentPage, pageSize: this.pageSize, studentId: this.userId}).then(res => {
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
