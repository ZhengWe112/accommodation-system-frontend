<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/objection/review' }">卫生异议审核</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="objectionData" height="250" style="width: 100%">
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="sanitaryInspectionId" label="卫生检查编号"/>
        <el-table-column prop="objectionReason" label="发起的理由" width="400px"/>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">未提交</div>
            <div v-if="scope.row.state === 1">已提交</div>
            <div v-if="scope.row.state === 2">已送审</div>
            <div v-if="scope.row.state === 3">已同意</div>
            <div v-if="scope.row.state === 4">被拒绝</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button v-if="scope.row.state === 2" size="small" type="primary" @click="agree(scope.row, 'a')">
              同意
            </el-button>
            <el-button v-if="scope.row.state > 2" size="small" type="primary" disabled>
              同意
            </el-button>
            <el-button v-if="scope.row.state === 2" size="small" type="danger" @click="agree(scope.row, 'd')">
              拒绝
            </el-button>
            <el-button v-if="scope.row.state > 2" size="small" type="success" disabled>
              拒绝
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  agreeSanitaryObjection,
  getSanitaryObjection
} from '@api/sanitary'
export default {
  name: 'sanitaryObjectionReview',
  data () {
    return {
      objectionData: []
    }
  },
  methods: {
    async init () {
      await getSanitaryObjection({state: 2}).then(res => {
        if (res.status) {
          this.objectionData = res.data
        }
      })
    },
    agree (row, st) {
      if (st === 'a') {
        this.$confirm('确定同意此次卫生异议?', '提示', {
          'confirmButtonText': '确定',
          'cancelButtonText': '取消',
          'type': 'warning'
        }).then(() => {
          agreeSanitaryObjection({id: row.id, isAgree: 0}).then(res => {
            if (res.status) {
              this.$message.success('操作成功')
              this.init()
            }
          })
        })
      } else {
        this.$confirm('确定拒绝此次卫生异议?', '提示', {
          'confirmButtonText': '确定',
          'cancelButtonText': '取消',
          'type': 'warning'
        }).then(() => {
          agreeSanitaryObjection({id: row.id, isAgree: 1}).then(res => {
            if (res.status) {
              this.$message.success('操作成功')
              this.init()
            }
          })
        })
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
