<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/violation/sk' }">违规查询</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="logs" style="width: 100%">
        <el-table-column prop="studentNumber" label="学号"/>
        <el-table-column prop="studentName" label="学生名"/>
        <el-table-column prop="violationTime" label="违规时间" width="200px"/>
        <el-table-column prop="violationItem" label="违规内容" width="300px"/>
        <el-table-column prop="violationDegree" label="严重程度">
          <template #default="scope">
            <div v-if="scope.row.violationDegree === 0">记过</div>
            <div v-if="scope.row.violationDegree === 1">严重警告</div>
            <div v-if="scope.row.violationDegree === 2">警告</div>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="描述" width="200px"/>
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
import {getViolationRecord} from '@api/violation'

export default {
  name: 'violationSk',
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
        await getViolationRecord({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
          if (res.status) {
            this.logs = res.data.data
            this.total = res.data.total
          }
        })
      } else if (this.userType === 6) {
        await getViolationRecord({pageNo: this.currentPage, pageSize: this.pageSize, studentId: this.userId}).then(res => {
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
