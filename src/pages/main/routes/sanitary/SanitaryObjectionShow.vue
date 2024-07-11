<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/objection/show' }">寝室卫生异议</el-breadcrumb-item>
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
            <el-button v-if="scope.row.state === 1" size="small" type="success" @click="submit(scope.row)">
              送审
            </el-button>
            <el-button v-if="scope.row.state > 1" size="small" type="success" disabled>
              送审
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  submitSanitaryObjection,
  getSanitaryObjection
} from '@api/sanitary'
export default {
  name: 'sanitaryObjectionShow',
  data () {
    return {
      objectionData: []
    }
  },
  methods: {
    async init () {
      await getSanitaryObjection({state: 1}).then(res => {
        if (res.status) {
          this.objectionData = res.data
        }
      })
    },
    submit (row) {
      this.$confirm('确认送审此次卫生异议?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        submitSanitaryObjection({id: row.id}).then(res => {
          if (res.status) {
            this.$message.success('送审成功')
            this.init()
          }
        })
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
