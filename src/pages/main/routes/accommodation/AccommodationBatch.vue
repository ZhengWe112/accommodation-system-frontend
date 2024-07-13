<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/accommodation/batch' }">批量排退宿</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-button type="success" @click="batch">一键排宿</el-button>
      <el-button type="primary" @click="unBatch">一键退宿</el-button>
      <el-divider content-position="left">住宿学生信息</el-divider>
      <el-table :data="student" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection"/>
        <el-table-column prop="fullname" label="姓名"/>
        <el-table-column prop="bedId" label="床位">
          <template #default="scope">
            <div v-if="scope.row.bedId === null">暂未分配</div>
            <div v-else>{{scope.row.bedId}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="studentId" label="学号"/>
        <el-table-column prop="collageName" label="学院"/>
        <el-table-column prop="major" label="专业"/>
        <el-table-column prop="classname" label="班级"/>
        <el-table-column prop="grade" label="年级"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue'
import {getUnbookedStudent, batchStudent, unBatchStudent} from '@api/accommodation'

export default {
  name: 'accommodationBatch',
  components: {PaginationComponent},
  data () {
    return {
      student: [],
      multipleSelection: []
    }
  },
  methods: {
    async init () {
      await getUnbookedStudent().then(res => {
        if (res.status) {
          this.student = res.data
        }
      })
    },
    batch () {
      batchStudent(this.multipleSelection).then(res => {
        if (res.status) {
          this.$message.success('排宿成功')
          this.init()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    unBatch () {
      unBatchStudent(this.multipleSelection).then(res => {
        if (res.status) {
          this.$message.success('退宿成功')
          this.init()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
