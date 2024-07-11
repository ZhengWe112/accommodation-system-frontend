<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/log' }">寝室卫生日志</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="logs" height="250" style="width: 100%">
        <el-table-column type="expand">
          <template #default="scope">
            <el-table :data="scope.row.sanitaryInspectionDetail" style="margin-left: 80px; width: 100%">
              <el-table-column prop="item" label="项" width="100px"/>
              <el-table-column prop="score" label="分数" width="100px"/>
              <el-table-column prop="description" label="描述"/>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="roomId" label="房间号"/>
        <el-table-column prop="sanitaryInspectionId" label="卫生检查号"/>
        <el-table-column prop="score" label="成绩"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getDormSanitaryLst} from '@api/dormitary'
import {mapGetters} from 'vuex'

export default {
  name: 'sanitaryLog',
  data () {
    return {
      logs: []
    }
  },
  methods: {
    async init () {
      if (this.userType === 4 || this.userType === 1) {
        await getDormSanitaryLst({}).then(res => {
          if (res.status) {
            this.logs = res.data
            console.log(res.data)
          }
        })
      } else if (this.userType === 3) {
        await getDormSanitaryLst({dormAdminId: this.userId}).then(res => {
          if (res.status) {
            this.logs = res.data
          }
        })
      } else if (this.userType === 6) {
        await getDormSanitaryLst({studentId: this.userId}).then(res => {
          if (res.status) {
            this.logs = res.data
          }
        })
      }
    },
    getDetail (row) {
      this.$router.push({path: '/main/sanitary/mgmt/detail', query: {id: row.id}})
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
