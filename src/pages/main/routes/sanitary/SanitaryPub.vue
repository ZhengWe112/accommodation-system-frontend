<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/pub' }">检查结果发布</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="sanitaryData" height="250" style="width: 100%">
        <el-table-column prop="id" label="编号"/>
        <el-table-column prop="dormitoryAdministratorName" label="创建人"/>
        <el-table-column prop="inspectionTime" label="创建时间"/>
        <el-table-column prop="overallSituation" label="整体情况">
          <template #default="scope">
            <div v-if="scope.row.overallSituation === 0">优</div>
            <div v-if="scope.row.overallSituation === 1">良</div>
            <div v-if="scope.row.overallSituation === 2">中</div>
            <div v-if="scope.row.overallSituation === 3">差</div>
          </template>
        </el-table-column>
        <el-table-column prop="averageScore" label="平均得分" />
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 1">未发布</div>
            <div v-if="scope.row.state === 2">已发布</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button size="small" type="primary" @click="getDetail(scope.row)">
              查看详情
            </el-button>
            <el-button v-if="scope.row.state === 1" size="small" type="success" @click="submit(scope.row)">
              发布
            </el-button>
            <el-button v-if="scope.row.state === 2" size="small" type="success" disabled>
              发布
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  getSanitaryChkSubmitted,
  pubSanitaryChk
} from '@api/sanitary'

export default {
  name: 'sanitaryPub',
  data () {
    return {
      sanitaryData: []
    }
  },
  methods: {
    async init () {
      await getSanitaryChkSubmitted().then(res => {
        if (res.status) {
          this.sanitaryData = res.data
        }
      })
    },
    submit (row) {
      this.$confirm('确认发布此次卫生检查?', '提示', {
        'confirmButtonText': '确定',
        'cancelButtonText': '取消',
        'type': 'warning'
      }).then(() => {
        pubSanitaryChk({id: row.id}).then(res => {
          if (res.status) {
            this.$message.success('发布成功')
            this.init()
          }
        })
      })
    },
    getDetail (row) {
      this.$router.push({path: '/main/sanitary/mgmt/detail', query: {id: row.id}})
    }
  },
  created () {
    this.init()
  }
}
</script>
