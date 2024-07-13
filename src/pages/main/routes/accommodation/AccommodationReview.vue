<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/accommodation/review' }">住退宿审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="apply" style="width: 100%">
        <el-table-column prop="requestTime" label="申请时间" width="200px"/>
        <el-table-column prop="studentName" label="学生姓名"/>
        <el-table-column prop="requestReason" label="申请理由" width="400px"/>
        <el-table-column prop="requestType" label="申请类型">
          <template #default="scope">
            <div v-if="scope.row.requestType === 0">普通入住申请</div>
            <div v-if="scope.row.requestType === 1">普通调宿申请</div>
            <div v-if="scope.row.requestType === 2">互换申请</div>
            <div v-if="scope.row.requestType === 3">个人退宿申请</div>
            <div v-if="scope.row.requestType === 4">校外住宿申请</div>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">等待审核</div>
            <div v-if="scope.row.state === 1">审核通过</div>
            <div v-if="scope.row.state === 2">驳回</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button v-if="scope.row.state === 0" size="small" type="primary" @click="agree(scope.row, 'a')">
              同意
            </el-button>
            <el-button v-if="scope.row.state > 0" size="small" type="primary" disabled>
              同意
            </el-button>
            <el-button v-if="scope.row.state === 0" size="small" type="danger" @click="agree(scope.row, 'd')">
              拒绝
            </el-button>
            <el-button v-if="scope.row.state > 0" size="small" type="success" disabled>
              拒绝
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
  getAccommodationApply,
  agreeAccommodationApply
} from '@api/accommodation'
import PaginationComponent from '@/components/PaginationComponent.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'accommodationReview',
  components: {PaginationComponent},
  data () {
    return {
      apply: [],
      total: 400,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    async init () {
      await getAccommodationApply({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
        if (res.status) {
          this.apply = res.data.data
          this.total = res.data.total
        }
      })
    },
    agree (row, st) {
      if (st === 'a') {
        this.$confirm('确定同意此次申请?', '提示', {
          'confirmButtonText': '确定',
          'cancelButtonText': '取消',
          'type': 'warning'
        }).then(() => {
          agreeAccommodationApply({
            id: row.id,
            isAgree: 0,
            responsibleLeaderId: this.userId,
            reason: null
          }).then(res => {
            if (res.status) {
              this.$message.success('操作成功')
              this.init()
            }
          })
        })
      } else {
        this.$confirm('确定拒绝此次申请?', '提示', {
          'confirmButtonText': '确定',
          'cancelButtonText': '取消',
          'type': 'warning'
        }).then(() => {
          agreeAccommodationApply({
            id: row.id,
            isAgree: 1,
            responsibleLeaderId: this.userId,
            reason: null
          }).then(res => {
            if (res.status) {
              this.$message.success('操作成功')
              this.init()
            }
          })
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
      userId: 'user/getUserId'
    })
  },
  created () {
    this.init()
  }
}
</script>
