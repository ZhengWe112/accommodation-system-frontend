<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/violation/review' }">违规审核</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="record" height="250" style="width: 100%">
        <el-table-column prop="violationTime" label="违规时间"/>
        <el-table-column prop="studentName" label="学生名"/>
        <el-table-column prop="violationItem" label="违规事项"/>
        <el-table-column prop="reason" label="违规理由"/>
        <el-table-column prop="violationDegree" label="违规程度">
          <template #default="scope">
            <div v-if="scope.row.violationDegree === 0">记过</div>
            <div v-if="scope.row.violationDegree === 1">严重警告</div>
            <div v-if="scope.row.violationDegree === 2">警告</div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">未送审</div>
            <div v-if="scope.row.state === 1">审核中</div>
            <div v-if="scope.row.state === 2">已完成</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button v-if="scope.row.state === 1" size="small" type="warning" @click="send(scope.row)">
              发送警告通知
            </el-button>
            <el-button v-if="scope.row.state > 1" size="small" type="warning" disabled>
              发送警告通知
            </el-button>
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
  getViolationByState,
  sendWarningMsg
} from '@api/violation'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  name: 'violationReview',
  components: {PaginationComponent},
  data () {
    return {
      record: [],
      total: 400,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    async init () {
      await getViolationByState({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
        if (res.status) {
          this.record = res.data.data
          this.total = res.data.total
        }
      })
    },
    send (row) {
      this.$confirm('发送警告通知 系统将为您自动生成?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        sendWarningMsg({id: row.id}).then(res => {
          if (res.status) {
            this.$message.success('发送成功')
            this.init()
          } else {
            this.$message.error('出错了 请联系系统管理员')
          }
        })
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
