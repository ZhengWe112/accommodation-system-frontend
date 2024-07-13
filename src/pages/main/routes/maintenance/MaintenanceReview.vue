<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/maintenance/review' }">维修审核</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="processingRecord" height="250" style="width: 100%">
        <el-table-column prop="requestTime" label="创建时间"/>
        <el-table-column prop="studentId" label="学生姓名"/>
        <el-table-column prop="requestItem" label="维修物品"/>
        <el-table-column prop="reason" label="描述" width="400px"/>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">申请中</div>
            <div v-if="scope.row.state === 1">已维修</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.state === 0" size="small" type="primary" @click="dialogFormVisible = true">处理</el-button>
            <el-button v-else size="small" type="primary" disabled>处理</el-button>
            <el-dialog title="处理维修申请" :visible.sync="dialogFormVisible" width="400px">
              <el-form :model="form">
                <el-form-item label="维修人员名称" label-width=120px>
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="process(scope.row)">确 定</el-button>
              </div>
            </el-dialog>
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
  processingMaintenanceRecord,
  processMaintenanceApply
} from '@api/maintenance'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  name: 'maintenanceReview',
  components: {PaginationComponent},
  data () {
    return {
      processingRecord: [],
      total: 400,
      pageSize: 10,
      currentPage: 1,
      dialogFormVisible: false,
      form: { name: '' }
    }
  },
  methods: {
    async init () {
      await processingMaintenanceRecord({pageNo: this.currentPage, pageSize: this.pageSize}).then(res => {
        if (res.status) {
          this.processingRecord = res.data.data
          this.total = res.data.total
        }
      })
      this.dialogFormVisible = false
    },
    process (row) {
      processMaintenanceApply({id: row.id, maintainerName: this.form.name}).then(res => {
        if (res.status) {
          this.$message.success('操作成功')
          this.init()
        } else {
          this.$message.error('出错了 请联系系统管理员')
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
