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
            <el-table-column prop="id" label="编号"/>
            <el-table-column prop="responsibleLeaderId" label="分管领导编号"/>
            <el-table-column prop="studentId" label="学生编号"/>
            <el-table-column prop="requestTime" label="申请时间"/>
            <el-table-column prop="requestType" label="申请类型" >
            <template #default="scope">
              <div>{{types[scope.row.requestType]}}</div>
            </template>
            </el-table-column>
            <el-table-column prop="requestReason" label="申请原因"/>
            <el-table-column prop="reviewTime" label="审核时间"/>
            <el-table-column prop="reviewState" label="审核状态">
                <template #default="scope">
                    <div>{{scope.row.reviewState?'驳回':'通过'}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="reviewReason" label="审核原因"/>
        </el-table>
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                layout="total, prev, pager, next"
                :total="totals">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  getAccommodationLog
} from '@api/accommodation'
export default {
  name: 'accommodationLog',
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      totals: 0,
      logs: [],
      types: [
        '普通入住申请', '普通调宿申请', '表示互换申请', '个人退宿申请', '校外住宿申请'
      ]
    }
  },
  methods: {
    getLog () {
      getAccommodationLog(this.pageNo, this.pageSize).then(res => {
        this.logs = res.data.data
        this.totals = res.data.total
      })
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getLog()
    }
  },
  created () {
    this.getLog()
  }
}
</script>
