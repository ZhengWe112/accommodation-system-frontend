<template>
  <div>
    <el-card class="crumbs-card">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main/sanitary/objection/notification' }">卫生异议反馈</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <el-card class="container">
      <el-table :data="notification" height="250" style="width: 100%">
        <el-table-column prop="id" label="编号"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="description" label="描述" width="400px"/>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <div v-if="scope.row.state === 0">同意，等待处理</div>
            <div v-if="scope.row.state === 1">拒绝，无需处理</div>
            <div v-if="scope.row.state === 2">同意，已处理</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button v-if="scope.row.state === 0" size="small" type="primary" @click="handle(scope.row)">
              已处理
            </el-button>
            <el-button v-if="scope.row.state > 0" size="small" type="primary" disabled>
              已处理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {
  getSanitaryObjectionNotification,
  processSanitaryObjection
} from '@api/sanitary'
import {mapGetters} from 'vuex'

export default {
  name: 'sanitaryObjectionNotification',
  data () {
    return {
      notification: []
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/getUserId'
    })
  },
  methods: {
    async init () {
      await getSanitaryObjectionNotification(this.userId).then(res => {
        if (res.status) {
          this.notification = res.data
        }
      })
    },
    handle (row) {
      processSanitaryObjection({id: row.id}).then(res => {
        if (res.status) {
          this.$message.success('处理成功')
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
